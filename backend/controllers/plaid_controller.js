import Router from "express";
import Sentry from "@sentry/node";
import { config } from "../config/config.js";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { UsersModel } from "../models/usersModel.js";
import { AccountsModel } from "../models/accountsModel.js";
import { TransactionsModel } from "../models/transactionsModel.js";
import Queue from "bee-queue";
import redis from "redis";

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});
const transactionQueue = new Queue("transactions", {
  redis: redisClient,
});

const configuration = new Configuration({
  basePath: PlaidEnvironments[config.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": config.PLAID_CLIENT_ID,
      "PLAID-SECRET": config.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const client = new PlaidApi(configuration);

// Base route: /api/plaid
export const plaidController = Router();

// Obtain a link_token: GET /api/plaid/link_token?userId=${}
plaidController.get("/link_token", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res
        .status(400)
        .send("Missing required fields. Must contain [userId]");
    }
    const createTokenResponse = await client.linkTokenCreate({
      user: {
        client_user_id: userId,
      },
      client_name: "SpendWise",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });
    return res.status(200).send({
      link_token: createTokenResponse.data.link_token,
    });
  } catch (err) {
    // Sentry.captureException(err);
    return res.status(500).send("Internal Server error " + err);
  }
});

// Exchange the public_token for an access_token and store it in the database: POST /api/plaid/token_exchange
plaidController.post("/token_exchange", async (req, res) => {
  try {
    const public_token = req.body.public_token;
    const userId = req.body.userId;

    if (!public_token || !userId) {
      return res
        .status(400)
        .send("Missing required fields. Must contain [publicToken, userId]");
    }
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: public_token,
    });

    let ACCESS_TOKEN = tokenResponse.data.access_token;
    if (!ACCESS_TOKEN) {
      return res.status(400).send("Error getting access token");
    }

    // given the userId, update the user's access_token in the database
    const user = await UsersModel.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(400).send("Error getting user");
    }
    const data = {
      access_token: ACCESS_TOKEN,
      email: user.email,
      cursor: null,
    };
    await user.update(data);
    await user.save();
    return res.status(200).send("Success");
  } catch (e) {
    return res.status(500).send("Internal Server error " + err);
  }
});

//Sync transactions given an userId that is linked to plaid: GET /api/plaid/transactions/sync?userId=${}
plaidController.get("/transactions/sync", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res
        .status(400)
        .send("Missing required fields. Must contain [userId]");
    }

    const user = await UsersModel.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(400).send("Error getting user");
    }
    const ACCESS_TOKEN = user.access_token;
    if (!ACCESS_TOKEN) {
      return res
        .status(400)
        .send("User not linked to Plaid for user " + userId);
    }

    let cursor = user.cursor ? user.cursor : null;
    let added = [];
    let modified = [];
    let removed = [];
    let hasMore = true;

    while (hasMore) {
      const response = await client.transactionsSync({
        access_token: ACCESS_TOKEN,
        cursor: cursor,
      });
      const data = response.data;
      // Add this page of results
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;
      // Update cursor to the next cursor
      cursor = data.next_cursor;
    }
    user.cursor = cursor;
    await user.save();

    transactionQueue
      .createJob({
        ACCESS_TOKEN,
        userId,
        added,
        modified,
        removed,
      })
      .on("succeeded", function () {
        console.log(`Job succeeded`);
      })
      .on("failed", function (errorMessage) {
        console.log(`Job failed with error message: ${errorMessage}`);
      })
      .on("retrying", function (err) {
        console.log(
          `Job failed with error message: ${err.message}.  It is being retried!`
        );
      })
      .save();

    return res.status(200).send("Job started successfully");
  } catch (err) {
    return res.status(500).send("Internal Server error " + err);
  }
});

// check if user has linked Plaid: GET /api/plaid/has_linked_plaid?userId=${}
plaidController.get("/has_linked_plaid", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res
        .status(400)
        .send("Missing required fields. Must contain [userId]");
    }
    const user = await UsersModel.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(400).send("Error getting user");
    }
    if (user.access_token) {
      return res.status(200).send("Success");
    } else {
      return res.status(400).send("No access token");
    }
  } catch (err) {
    // Sentry.captureException(err);
    return res.status(500).send("Internal Server error " + err);
  }
});
// check if job is done: GET /api/plaid/job_status?jobId=${}
plaidController.get("/job_status", async (req, res) => {
  try {
    const jobId = req.query.jobId;
    if (!jobId) {
      return res
        .status(400)
        .send("Missing required fields. Must contain [jobId]");
    }
    const job = await transactionQueue.getJob(jobId);
    if (!job) {
      return res.status(400).send("Error getting job");
    }
    if (job.isCompleted()) {
      return res.status(200).send("Success");
    } else {
      return res.status(400).send("Job not completed");
    }
  } catch (err) {
    // Sentry.captureException(err);
    return res.status(500).send("Internal Server error " + err);
  }
});
async function createPlaidTransactions(added) {
  for (let transaction of added) {
    const plaidAccountId = transaction.account_id;
    const account = await AccountsModel.findOne({
      where: { plaidAccountId: plaidAccountId },
    });
    const transactionExists = await TransactionsModel.findOne({
      where: { plaidTransactionId: transaction.transaction_id },
    });
    if (transactionExists) {
      continue;
    } else {
      await TransactionsModel.create({
        transactionDate: transaction.date,
        descriptions: transaction.name,
        amount: transaction.amount,
        AccountId: account.id,
        category: transaction.category[0],
        plaidTransactionId: transaction.transaction_id,
      });
    }
  }
}
async function updatePlaidTransactions(modified) {
  for (let transaction of modified) {
    const plaidAccountId = transaction.account_id;
    const account = await AccountsModel.findOne({
      where: { plaidAccountId: plaidAccountId },
    });

    // update the existing transaction for the existing account
    const existingTransaction = await TransactionsModel.findOne({
      where: { plaidTransactionId: transaction.transaction_id },
    });
    if (!existingTransaction) {
      // create a new transaction for the existing account
      const newTransaction = await TransactionsModel.create({
        transactionDate: transaction.date,
        descriptions: transaction.name,
        amount: transaction.amount,
        AccountId: account.id,
        category: transaction.category[0],
        plaidTransactionId: transaction.transaction_id,
      });
    } else {
      // update the existing transaction for the existing account
      existingTransaction.transactionDate = transaction.date;
      existingTransaction.descriptions = transaction.name;
      existingTransaction.amount = transaction.amount;
      existingTransaction.category = transaction.category[0];
      await existingTransaction.save();
    }
  }
}
async function deletePlaidTransactions(removed) {
  for (let transaction of removed) {
    const existingTransaction = await TransactionsModel.findOne({
      where: { plaidTransactionId: transaction.transaction_id },
    });
    if (existingTransaction) {
      await existingTransaction.destroy();
    }
  }
}
async function updatePlaidAccounts(ACCESS_TOKEN, userId) {
  const accountsResponse = await client.accountsGet({
    access_token: ACCESS_TOKEN,
  });
  if (accountsResponse.status === 200) {
    //find all accounts of this user and delete them all
    const userAccounts = await AccountsModel.findAll({
      where: { UserId: userId },
    });
    for (let userAccount of userAccounts) {
      // delete all transactions of this account
      const transactions = await TransactionsModel.findAll({
        where: { AccountId: userAccount.id },
      });
      for (let transaction of transactions) {
        await transaction.destroy();
      }
      await userAccount.destroy();
    }
    for (let account of accountsResponse.data.accounts) {
      // create new accounts for this user
      const createdAccount = await AccountsModel.create({
        accountName: account.name,
        plaidAccountId: account.account_id,
        UserId: userId,
      });
      await createdAccount.save();
    }
  }
}

transactionQueue.process(async (job) => {
  const { ACCESS_TOKEN, userId, added, modified, removed } = job.data;
  // add new accounts to our database if not already exists
  await updatePlaidAccounts(ACCESS_TOKEN, userId);
  // createPlaidTransactions based on added
  await createPlaidTransactions(added);
  // updatePlaidTransactions based on modified
  await updatePlaidTransactions(modified);
  // deletePlaidTransactions based on removed
  await deletePlaidTransactions(removed);
});
