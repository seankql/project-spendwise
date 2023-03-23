import cron from "node-cron";
import { syncQueue } from "./worker.js";
import { UsersModel } from "./models/usersModel.js";
import { Op } from "sequelize";
import Sentry from "@sentry/node";

cron.schedule("0 0 * * *", async () => {
  console.log("Running cron job at midnight every day!");

  // get all users that have linked Plaid
  try {
    const users = await UsersModel.findAll({
      where: { access_token: { [Op.ne]: null } },
    });

    for (const user of users) {
      // create a job to sync transactions for each user
      syncQueue.createJob({ userId: user.id }).save();
    }
  } catch (err) {
    console.log(err);
    // Sentry.captureException(err + " in cron job"");
  }
});
