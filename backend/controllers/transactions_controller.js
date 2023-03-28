import Router from "express";
import { TransactionsModel } from "../models/transactionsModel.js";
import { AccountsModel } from "../models/accountsModel.js";
import { UsersModel } from "../models/usersModel.js";
import { Op } from "sequelize";
import Sentry from "@sentry/node";
import { validateAccessToken, isAuthorizedUserId } from "../middleware/auth.js";
import jwt_decode from "jwt-decode";
// Base route: /api/transactions
export const transactionsController = Router();

// Get the most recent transactions: GET /api/transactions?userId=${}&page={}&pageSize={}
transactionsController.get(
  "/",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
    try {
      const { userId, page, pageSize } = req.query;
      if (!userId || !page || !pageSize) {
        return res
          .status(400)
          .send(
            "Missing required fields. Must contain [userId, page, pageSize]"
          );
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
          order: [["transactionDate", "DESC"]],
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
          plaidTransactionId: transaction.plaidTransactionId,
        }));
        return res
          .status(200)
          .send({ totalCount: count, transactions: filteredTransactions });
      } else {
        return res.status(400).send("Error getting transactions");
      }
    } catch (err) {
      // Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);

// Create a new transaction: POST /api/transactions
transactionsController.post("/", validateAccessToken, async (req, res) => {
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
    // check if authorized to create this transaction
    const account = await AccountsModel.findByPk(data.AccountId);
    const accessToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(accessToken);
    const currentAuth0UserId = decoded.sub.split("|")[1];
    const currentUser = await UsersModel.findOne({
      where: { auth0UserId: currentAuth0UserId },
    });
    if (Number(currentUser.id) !== Number(account.UserId)) {
      return res.status(403).send("Unauthorized");
    }

    const createdTransaction = await TransactionsModel.create(data);
    if (createdTransaction) {
      return res.status(201).send(createdTransaction);
    } else {
      return res.status(400).send("Error creating transaction");
    }
  } catch (err) {
    // Sentry.captureException(err);
    return res.status(500).send("Internal Server error " + err);
  }
});
// Update a transaction: PUT /api/transactions/:transactionId
transactionsController.put(
  "/:transactionId",
  validateAccessToken,
  async (req, res) => {
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

      // check if authorized to update this transaction
      const accessToken = req.headers.authorization.split(" ")[1];
      const decoded = jwt_decode(accessToken);
      const currentAuth0UserId = decoded.sub.split("|")[1];
      const currentUser = await UsersModel.findOne({
        where: { auth0UserId: currentAuth0UserId },
      });
      if (Number(currentUser.id) !== Number(account.UserId)) {
        return res.status(403).send("Unauthorized");
      }

      const transaction = await TransactionsModel.findByPk(transactionId);
      if (!transaction) {
        return res
          .status(400)
          .send(
            "Error finding transaction for transaction id: " + transactionId
          );
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
      // Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);
// Delete a transaction: DELETE /api/transactions/:transactionId
transactionsController.delete(
  "/:transactionId",
  validateAccessToken,
  async (req, res) => {
    try {
      const { transactionId } = req.params;
      if (!transactionId) {
        return res
          .status(400)
          .send("Missing required fields. Must contain [transactionId]");
      }
      const selectedTransaction = await TransactionsModel.findByPk(
        transactionId
      );
      // check if authorized to delete this transaction
      const account = await AccountsModel.findOne({
        where: { id: selectedTransaction.AccountId },
      });
      const accessToken = req.headers.authorization.split(" ")[1];
      const decoded = jwt_decode(accessToken);
      const currentAuth0UserId = decoded.sub.split("|")[1];
      const currentUser = await UsersModel.findOne({
        where: { auth0UserId: currentAuth0UserId },
      });
      if (Number(currentUser.id) !== Number(account.UserId)) {
        return res.status(403).send("Unauthorized");
      }

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
      // Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);

// Get All Transactions with filters:
// GET: /api/transactions/filters/:userId/transactions?accountId=1&transactionName=Groceries&startDate=2021-01-01&endDate=2021-01-31&minAmount=0&maxAmount=100&categories=Food,Groceries&limit=10&offset=0

transactionsController.get(
  "/filters/:userId/transactions",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
    try {
      if (!req.params.userId || !req.query.limit || !req.query.offset) {
        return res
          .status(400)
          .send(
            "Missing required fields. Must contain [userId, limit, offset]"
          );
      }
      const userId = req.params.userId;
      const accountId = req.query.accountId || null;
      const transactionName = req.query.transactionName || "";
      const startDate = req.query.startDate || "1900-01-01";
      const endDate = req.query.endDate || "2999-12-31";
      const minAmount = req.query.minAmount || Number.MIN_SAFE_INTEGER;
      const maxAmount = req.query.maxAmount || Number.MAX_SAFE_INTEGER;
      const categories = req.query.categories
        ? req.query.categories.split(",")
        : [];
      const limit = parseInt(req.query.limit);
      const offset = parseInt(req.query.offset) * limit;

      const { rows: resultTrans, count } =
        await TransactionsModel.findAndCountAll({
          include: [
            {
              model: AccountsModel,
              where: accountId ? { id: accountId } : { UserId: userId },
              include: [
                {
                  model: UsersModel,
                  where: { id: userId },
                },
              ],
            },
          ],
          where: {
            descriptions: { [Op.like]: `%${transactionName}%` },
            transactionDate: { [Op.between]: [startDate, endDate] },
            amount: { [Op.between]: [minAmount, maxAmount] },
            ...(categories.length > 0 && { category: { [Op.in]: categories } }),
          },
          order: [["transactionDate", "DESC"]],
          limit,
          offset,
        });

      if (count > 0) {
        const filteredResultTrans = resultTrans.map((transaction) => ({
          id: transaction.id,
          transactionDate: transaction.transactionDate,
          descriptions: transaction.descriptions,
          amount: transaction.amount,
          category: transaction.category,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
          AccountId: transaction.AccountId,
          plaidTransactionId: transaction.plaidTransactionId,
        }));
        return res.status(200).send({
          totalCount: count,
          transactions: filteredResultTrans,
        });
      } else {
        return res.status(400).send("Error getting transactions");
      }
    } catch (err) {
      //   Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);
