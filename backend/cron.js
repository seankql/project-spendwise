import cron from "node-cron";
import Queue from "bee-queue";
import Sentry from "@sentry/node";
import { Op } from "sequelize";
import axios from "axios";
import { config } from "./config/config.js";

cron.schedule("0 0 * * *", async () => {
  console.log("Running cron job at midnight every day!");
  // get all users that have linked Plaid
  try {
    syncQueue.createJob().save();
  } catch (err) {
    console.log(err);
    Sentry.captureException(err + " in cron job");
  }
});

const syncQueue = new Queue("sync", {
  redis: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  },
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
    Sentry.captureException(err + " in cron job syncQueue");
  }
});

async function callSyncTransactions(userId) {
  try {
    const response = await axios.get(
      "https://api.swx.cscc09.rocks/api/plaid/transactions/sync?userId=" +
        userId
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
    Sentry.captureException(err + " in cron job callSyncTransactions");
  }
}
