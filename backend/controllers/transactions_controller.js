import Router from "express";
import { TransactionModel } from "../models/transactionsModel.js";
import Sentry from "@sentry/node";
// Base route: /api/transactions
export const transactionsController = Router();

// Get the most recent transactions: GET /api/transactions?userId=${}&page={}&pageSize={}
transactionsController.get("/", async (req, res) => {
  try {
    if (!req.query.userId || !req.query.page || !req.query.pageSize) {
      return res
        .status(400)
        .send("Missing required fields. Must contain [userId, page, pageSize]");
    }
    const page = parseInt(req.query.page) * parseInt(req.query.pageSize);
    const resultTransactions =
      await TransactionModel.getMostRecentTransactionsByUserId(
        req.query.userId,
        page,
        req.query.pageSize
      );
    if (resultTransactions) {
      return res.status(200).send(resultTransactions);
    } else {
      return res.status(400).send("Error getting transactions");
    }
  } catch (err) {
    Sentry.captureException(err);
    return res.status(500).send("Internal Server error");
  }
});

// Create a new transaction: POST /api/transactions
transactionsController.post("/", async (req, res) => {
  try {
    if (
      !req.body.transactionDate ||
      !req.body.descriptions ||
      !req.body.amount ||
      !req.body.accountId ||
      !req.body.category
    ) {
      return res
        .status(400)
        .send(
          "Missing required fields. Must contain [transactionDate, descriptions, amount, accountId, category]"
        );
    }
    const newTransaction = new TransactionModel(
      req.body.transactionDate,
      req.body.descriptions,
      req.body.amount,
      req.body.accountId,
      req.body.category
    );
    const createdTransaction = await newTransaction.create();
    if (createdTransaction) {
      return res.status(201).send(createdTransaction);
    } else {
      return res.status(400).send("Error creating transaction");
    }
  } catch (err) {
    Sentry.captureException(err);
    return res.status(500).send("Internal Server error");
  }
});
// Update a transaction: PUT /api/transactions/:transactionId
transactionsController.put("/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;
    const data = {
      transactionDate: req.body.transactionDate,
      descriptions: req.body.descriptions,
      amount: req.body.amount,
      accountId: req.body.accountId,
      category: req.body.category,
    };
    if (
      !data.transactionDate ||
      !data.descriptions ||
      !data.amount ||
      !data.accountId ||
      !data.category
    ) {
      return res
        .status(400)
        .send(
          "Missing required fields. Must contain [transactionDate, descriptions, amount, accountId, category]"
        );
    }
    const transaction = new TransactionModel(
      req.body.transactionDate,
      req.body.descriptions,
      req.body.amount,
      req.body.accountId,
      req.body.category
    );
    const updatedTransaction = await transaction.updateByPK(
      transactionId,
      data
    );
    if (updatedTransaction) {
      return res.status(200).send(updatedTransaction);
    } else {
      return res
        .status(400)
        .send(
          "Error updating transaction for transaction id: " + transactionId
        );
    }
  } catch (err) {
    Sentry.captureException(err);
    return res.status(500).send("Internal Server error");
  }
});
// Delete a transaction: DELETE /api/transactions/:transactionId
transactionsController.delete("/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;
    if (!transactionId) {
      return res
        .status(400)
        .send("Missing required fields. Must contain [transactionId]");
    }
    const transaction = new TransactionModel();
    const deletedTransaction = await transaction.deleteByPK(transactionId);
    if (deletedTransaction) {
      return res.status(200).send(deletedTransaction);
    } else {
      return res
        .status(400)
        .send(
          "Error deleting transaction for transaction id: " + transactionId
        );
    }
  } catch (err) {
    Sentry.captureException(err);
    return res.status(500).send("Internal Server error");
  }
});
