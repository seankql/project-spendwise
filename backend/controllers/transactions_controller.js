import Router from "express";
import { TransactionsModel } from "../models/transactionsModel.js";
import { AccountsModel } from "../models/accountsModel.js";
import { UsersModel } from "../models/usersModel.js";
import Sentry from "@sentry/node";
// Base route: /api/transactions
export const transactionsController = Router();

// Get the most recent transactions: GET /api/transactions?userId=${}&page={}&pageSize={}
transactionsController.get("/", async (req, res) => {
  try {
    const { userId, page, pageSize } = req.query;
    if (!userId || !page || !pageSize) {
      return res
        .status(400)
        .send("Missing required fields. Must contain [userId, page, pageSize]");
    }
    const offset = parseInt(page) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const { count, rows: resultTransactions } =
      await TransactionsModel.findAndCountAll({
        include: [
          {
            model: AccountsModel,
            where: { UserId: userId },
            include: [{ model: UsersModel }],
          },
        ],
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });

    if (resultTransactions) {
      const filteredTransactions = resultTransactions.map((transaction) => ({
        id: transaction.id,
        transactionDate: transaction.transactionDate,
        descriptions: transaction.descriptions,
        amount: transaction.amount,
        category: transaction.category,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        AccountId: transaction.AccountId,
      }));
      return res
        .status(200)
        .send({ totalCount: count, transactions: filteredTransactions });
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
    const data = {
      transactionDate: req.body.transactionDate,
      descriptions: req.body.descriptions,
      amount: req.body.amount,
      AccountId: req.body.accountId,
      category: req.body.category,
    };
    if (
      !data.transactionDate ||
      !data.descriptions ||
      !data.amount ||
      !data.AccountId ||
      !data.category
    ) {
      return res
        .status(400)
        .send(
          "Missing required fields. Must contain [transactionDate, descriptions, amount, accountId, category]"
        );
    }
    const createdTransaction = await TransactionsModel.create(data);
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
      AccountId: req.body.accountId,
      category: req.body.category,
    };
    if (
      !data.transactionDate ||
      !data.descriptions ||
      !data.amount ||
      !data.AccountId ||
      !data.category
    ) {
      return res
        .status(400)
        .send(
          "Missing required fields. Must contain [transactionDate, descriptions, amount, accountId, category]"
        );
    }
    const account = await AccountsModel.findOne({
      where: { id: data.AccountId },
    });
    if (!account) {
      return res
        .status(400)
        .send("Error finding account for accountid: " + data.AccountId);
    }

    const transaction = await TransactionsModel.findByPk(transactionId);
    if (!transaction) {
      return res
        .status(400)
        .send("Error finding transaction for transaction id: " + transactionId);
    }

    const updatedTransaction = await transaction.update(data);

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
    const selectedTransaction = await TransactionsModel.findByPk(transactionId);
    if (selectedTransaction) {
      await selectedTransaction.destroy();
      return res.status(200).send(selectedTransaction);
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
