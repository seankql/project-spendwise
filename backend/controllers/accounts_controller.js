import Router from "express";
import Sentry from "@sentry/node";
import { AccountsModel } from "../models/accountsModel.js";
import { TransactionsModel } from "../models/transactionsModel.js";
import { UsersModel } from "../models/usersModel.js";
import { validateAccessToken, isAuthorizedUserId } from "../middleware/auth.js";
import jwt_decode from "jwt-decode";

// Base route: /api/accounts
export const accountsController = Router();

// Create A new account: POST /api/accounts
accountsController.post(
  "/",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
    try {
      if (!req.body.userId || !req.body.accountName) {
        return res.status(400).send("Missing required fields");
      }
      const createdAccount = await AccountsModel.create({
        UserId: req.body.userId,
        accountName: req.body.accountName,
      });
      if (createdAccount) {
        return res.status(201).send(createdAccount);
      } else {
        return res.status(400).send("Error creating account");
      }
    } catch (err) {
      Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);

// Update an account: PUT /api/accounts/:accountId
accountsController.put(
  "/:accountId",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
    try {
      const { accountId } = req.params;
      const data = {
        UserId: req.body.userId,
        accountName: req.body.accountName,
      };
      if (!data.UserId || !data.accountName) {
        return res.status(400).send("Missing required fields");
      }
      const account = await AccountsModel.findByPk(accountId);
      if (account) {
        const updatedAccount = await account.update(data);
        await account.save();
        if (updatedAccount) {
          return res.status(200).send(updatedAccount);
        } else {
          return res
            .status(400)
            .send("Error updating account for account id: " + accountId);
        }
      } else {
        return res
          .status(400)
          .send("Error finding account for account id: " + accountId);
      }
    } catch (err) {
      Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);

// Delete an account: DELETE /api/accounts/:accountId
accountsController.delete(
  "/:accountId",
  validateAccessToken,
  async (req, res) => {
    try {
      const { accountId } = req.params;
      const account = await AccountsModel.findByPk(accountId);
      // check if authorized to delete this account
      const accessToken = req.headers.authorization.split(" ")[1];
      const decoded = jwt_decode(accessToken);
      const currentAuth0UserId = decoded.sub.split("|")[1];
      const currentUser = await UsersModel.findOne({
        where: { auth0UserId: currentAuth0UserId },
      });
      if (Number(currentUser.id) !== Number(account.UserId)) {
        return res.status(403).send("Unauthorized");
      }
      // delete all transactions assoicated with this account
      const transactions = await TransactionsModel.findAll({
        where: { AccountId: accountId },
      });
      if (transactions) {
        for (let i = 0; i < transactions.length; i++) {
          await transactions[i].destroy();
        }
      }
      if (account) {
        const deletedAccount = await account.destroy();
        if (deletedAccount) {
          return res.status(200).send(deletedAccount);
        } else {
          return res
            .status(400)
            .send("Error deleting account for account id: " + accountId);
        }
      } else {
        return res
          .status(400)
          .send("Error finding account for account id: " + accountId);
      }
    } catch (err) {
      Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);

// Get all accounts for a user: GET /api/accounts/user/:userId
accountsController.get(
  "/user/:userId",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const accounts = await AccountsModel.findAll({
        where: { UserId: userId },
      });
      if (accounts) {
        return res.status(200).send(accounts);
      } else {
        return res
          .status(400)
          .send("Error fetching accounts for user id: " + userId);
      }
    } catch (err) {
      Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);
