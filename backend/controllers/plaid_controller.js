import Router from "express";
import Sentry from "@sentry/node";
import { client } from "../config/plaid.js";
import { UsersModel } from "../models/usersModel.js";
import { validateAccessToken, isAuthorizedUserId } from "../middleware/auth.js";
import { transactionQueue } from "../worker.js";

// Base route: /api/plaid
export const plaidController = Router();

// Obtain a link_token: GET /api/plaid/link_token?userId=${}
plaidController.get(
  "/link_token",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
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
  }
);

// Exchange the public_token for an access_token and store it in the database: POST /api/plaid/token_exchange
plaidController.post(
  "/token_exchange",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
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

      let res_access_token = tokenResponse.data.access_token;
      if (!res_access_token) {
        return res.status(400).send("Error getting access token");
      }

      // given the userId, update the user's access_token in the database
      const user = await UsersModel.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(400).send("Error getting user");
      }
      const data = {
        access_token: res_access_token,
        email: user.email,
        cursor: null,
      };
      await user.update(data);
      await user.save();
      return res.status(200).send("Success");
    } catch (err) {
      // Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);

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
    let user_access_token = user.access_token;
    if (!user_access_token) {
      return res
        .status(400)
        .send("User not linked to Plaid for user " + userId);
    }
    transactionQueue
      .createJob({
        user_access_token,
        userId,
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
plaidController.get(
  "/has_linked_plaid",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
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
  }
);
