import cron from "node-cron";
import { syncQueue } from "./worker.js";
import Sentry from "@sentry/node";

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
