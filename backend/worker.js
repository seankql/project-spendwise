import Queue from "bee-queue";
import redis from "redis";
import {
  updatePlaidTransactions,
  createPlaidTransactions,
  updatePlaidAccounts,
  deletePlaidTransactions,
  invalidateAccessToken,
  getTransactionsFromPlaid,
} from "./services/plaid_services.js";
import { UsersModel } from "./models/usersModel.js";
import { Op } from "sequelize";
import axios from "axios";

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

export const transactionQueue = new Queue("transactions", {
  redis: redisClient,
});
export const syncQueue = new Queue("sync", {
  redis: redisClient,
});

transactionQueue.process(async (job) => {
  try {
    const { user_access_token, userId } = job.data;

    // given the userId find the user in the database
    const user = await UsersModel.findOne({ where: { id: userId } });

    // Invalidate the access token to get a new one for periodic sync
    const new_access_token = await invalidateAccessToken(user_access_token);
    if (new_access_token) {
      const result_obj = await getTransactionsFromPlaid(
        new_access_token,
        user.cursor
      );

      const { added, modified, removed, cursor } = result_obj;
      user.access_token = new_access_token;
      user.cursor = cursor;
      await user.save();

      // add new accounts to our database if not already exists
      await updatePlaidAccounts(new_access_token, userId);
      // createPlaidTransactions based on added
      await createPlaidTransactions(added);
      // updatePlaidTransactions based on modified
      await updatePlaidTransactions(modified);
      // deletePlaidTransactions based on removed
      await deletePlaidTransactions(removed);
    }
  } catch (err) {
    console.log(err);
    // Sentry.captureException(err + " in cron job transactionQueue");
  }
});

syncQueue.process(async () => {
  try {
    const users = await UsersModel.findAll({
      where: { access_token: { [Op.ne]: null } },
    });
    for (let user of users) {
      await callSyncTransactions(user.id);
    }
  } catch (err) {
    console.log(err);
    // Sentry.captureException(err + " in cron job syncQueue");
  }
});

async function callSyncTransactions(userId) {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/plaid/transactions/sync?userId=" + userId
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
    // Sentry.captureException(err + " in cron job callSyncTransactions");
  }
}
