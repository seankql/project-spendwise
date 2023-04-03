import Queue from "bee-queue";
import {
  updatePlaidTransactions,
  createPlaidTransactions,
  updatePlaidAccounts,
  deletePlaidTransactions,
  invalidateAccessToken,
  getTransactionsFromPlaid,
} from "./services/plaid_services.js";
import { UsersModel } from "./models/usersModel.js";
import Sentry from "@sentry/node";
import { config } from "./config/config.js";

export const transactionQueue = new Queue("transactions", {
  redis: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  },
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
    Sentry.captureException(err + " transactionQueue");
  }
});
