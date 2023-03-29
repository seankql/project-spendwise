import { client } from "../config/plaid.js";
import { AccountsModel } from "../models/accountsModel.js";
import { TransactionsModel } from "../models/transactionsModel.js";
import Sentry from "@sentry/node";

export async function invalidateAccessToken(accessToken) {
  try {
    const invalidateAccessTokenresponse =
      await client.itemAccessTokenInvalidate({
        access_token: accessToken,
      });
    return invalidateAccessTokenresponse.data.new_access_token;
  } catch (err) {
    Sentry.captureException(err + " in invalidateAccessToken");
    console.log(err + " in invalidateAccessToken");
  }
}

export async function getTransactionsFromPlaid(new_access_token, user_cursor) {
  try {
    let cursor = user_cursor ? user_cursor : null;
    let added = [];
    let modified = [];
    let removed = [];
    let hasMore = true;
    // Sync transactions
    while (hasMore) {
      const response = await client.transactionsSync({
        access_token: new_access_token,
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

    return {
      added,
      modified,
      removed,
      cursor,
    };
  } catch (err) {
    console.log(err + " in getTransactionsFromPlaid");
    Sentry.captureException(err + " in getTransactionsFromPlaid");
  }
}

export async function createPlaidTransactions(added) {
  try {
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
  } catch (err) {
    Sentry.captureException(err + " in createPlaidTransactions");
    console.log(err + " in createPlaidTransactions");
  }
}
export async function updatePlaidTransactions(modified) {
  try {
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
  } catch (err) {
    Sentry.captureException(err + " in updatePlaidTransactions");
    console.log(err + " in updatePlaidTransactions");
  }
}
export async function deletePlaidTransactions(removed) {
  try {
    for (let transaction of removed) {
      const existingTransaction = await TransactionsModel.findOne({
        where: { plaidTransactionId: transaction.transaction_id },
      });
      if (existingTransaction) {
        await existingTransaction.destroy();
      }
    }
  } catch (err) {
    console.log(err);
    Sentry.captureException(err + " in deletePlaidTransactions");
  }
}
export async function updatePlaidAccounts(access_token, userId) {
  try {
    const accountsResponse = await client.accountsGet({
      access_token: access_token,
    });

    for (let account of accountsResponse.data.accounts) {
      const plaidAccountId = account.account_id;
      const accountFounded = await AccountsModel.findOne({
        where: { plaidAccountId: plaidAccountId },
      });
      if (accountFounded) {
        await accountFounded.update({
          accountName: account.name,
          plaidAccountId: account.account_id,
        });
        await accountFounded.save();
      } else {
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
  } catch (err) {
    console.log(err);
    Sentry.captureException(err + " in updatePlaidAccounts");
  }
}
