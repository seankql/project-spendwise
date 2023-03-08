import Router from "express";
import Sentry from "@sentry/node";
import { AccountsModel } from "../models/accountsModel.js";

// Base route: /api/accounts
export const accountsController = Router();

// Create A new account: POST /api/accounts
accountsController.post("/", async (req, res) => {
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
    return res.status(500).send("Internal Server error");
  }
});

// Update an account: PUT /api/accounts/:accountId
accountsController.put("/:accountId", async (req, res) => {
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
      await account.reload();
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
    return res.status(500).send("Internal Server error");
  }
});

// Delete an account: DELETE /api/accounts/:accountId
accountsController.delete("/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await AccountsModel.findByPk(accountId);
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
    return res.status(500).send("Internal Server error");
  }
});

// Get all accounts for a user: GET /api/accounts/user/:userId
accountsController.get("/user/:userId", async (req, res) => {
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
    return res.status(500).send("Internal Server error");
  }
});
