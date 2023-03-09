import Router from "express";
import { Op } from "sequelize";
import Sentry from "@sentry/node";
import { TransactionsModel } from "../models/transactionsModel.js";
import { AccountsModel } from "../models/accountsModel.js";

// Base route: /api/reports
export const reportsController = Router();

const IncomeCategories = ["Income"];
// Get Report for user: GET /api/reports?userId=${}&startDate=${}&endDate=${}
reportsController.get("/", async (req, res) => {
  try {
    if (!req.query.userId || !req.query.startDate || !req.query.endDate) {
      return res
        .status(400)
        .send(
          "Missing required fields. Must contain [userId, startDate, endDate]"
        );
    }
    const { count, rows: resultReport } =
      await TransactionsModel.findAndCountAll({
        include: [
          {
            model: AccountsModel,
            where: { UserId: req.query.userId },
          },
        ],
        where: {
          transactionDate: {
            [Op.between]: [req.query.startDate, req.query.endDate],
          },
        },
        order: [["transactionDate", "DESC"]],
      });

    if (resultReport) {
      const filteredResultReport = resultReport.map((transaction) => ({
        id: transaction.id,
        transactionDate: transaction.transactionDate,
        descriptions: transaction.descriptions,
        amount: transaction.amount,
        category: transaction.category,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        AccountId: transaction.AccountId,
      }));

      const result = filteredResultReport.reduce(
        (acc, transaction) => {
          if (transaction.category && transaction.amount) {
            const category = transaction.category;
            const amount = parseInt(transaction.amount);

            if (IncomeCategories.includes(category)) {
              acc.income += amount;
            } else {
              acc.expense += amount;
            }
            return acc;
          }
        },
        { income: 0, expense: 0 }
      );

      return res.status(200).send({
        totalCount: count,
        transactions: filteredResultReport,
        income: result.income,
        expense: result.expense,
      });
    } else {
      return res.status(400).send("Error getting report");
    }
  } catch (err) {
    Sentry.captureException(err);
    return res.status(500).send("Internal Server error");
  }
});

// Get All Transactions for one accounts: GET /api/reports/accounts?accountId=${}&startDate=${}&endDate=${}
reportsController.get("/accounts", async (req, res) => {
  try {
    if (!req.query.accountId || !req.query.startDate || !req.query.endDate) {
      return res
        .status(400)
        .send(
          "Missing required fields. Must contain [accountId, startDate, endDate]"
        );
    }
    const { count, rows: resultReport } =
      await TransactionsModel.findAndCountAll({
        where: {
          AccountId: req.query.accountId,
          transactionDate: {
            [Op.between]: [req.query.startDate, req.query.endDate],
          },
        },
        order: [["transactionDate", "DESC"]],
      });

    if (resultReport) {
      const result = resultReport.reduce(
        (acc, transaction) => {
          if (transaction.category && transaction.amount) {
            const category = transaction.category;
            const amount = parseInt(transaction.amount);

            if (IncomeCategories.includes(category)) {
              acc.income += amount;
            } else {
              acc.expense += amount;
            }
            return acc;
          }
        },
        { income: 0, expense: 0 }
      );

      return res.status(200).send({
        totalCount: count,
        transactions: resultReport,
        income: result.income,
        expense: result.expense,
      });
    } else {
      return res.status(400).send("Error getting report");
    }
  } catch (err) {
    Sentry.captureException(err);
    return res.status(500).send("Internal Server error");
  }
});

// Get All Transactions for one user and enerate a report for each category: GET /api/reports/categories?userId=${}&startDate=${}&endDate=${}

reportsController.get("/categories", async (req, res) => {
  try {
    if (!req.query.userId || !req.query.startDate || !req.query.endDate) {
      return res
        .status(400)
        .send(
          "Missing required fields. Must contain [userId, startDate, endDate]"
        );
    }
    const { count, rows: resultReport } =
      await TransactionsModel.findAndCountAll({
        include: [
          {
            model: AccountsModel,
            where: { UserId: req.query.userId },
          },
        ],
        where: {
          transactionDate: {
            [Op.between]: [req.query.startDate, req.query.endDate],
          },
        },
        order: [["transactionDate", "DESC"]],
      });

    if (resultReport) {
      const filteredResultReport = resultReport.map((transaction) => ({
        id: transaction.id,
        transactionDate: transaction.transactionDate,
        descriptions: transaction.descriptions,
        amount: transaction.amount,
        category: transaction.category,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        AccountId: transaction.AccountId,
      }));
      const totalSpendingsByCategory = {};
      for (const transaction of filteredResultReport) {
        if (transaction.category && transaction.amount) {
          const category = transaction.category;
          const amount = parseFloat(transaction.amount);
          if (totalSpendingsByCategory[category]) {
            totalSpendingsByCategory[category].amount += amount;
            totalSpendingsByCategory[category].count += 1;
            totalSpendingsByCategory[category].transactions.push(transaction);
          } else {
            totalSpendingsByCategory[category] = {
              amount: amount,
              count: 1,
              transactions: [transaction],
            };
          }
        }
      }
      return res.status(200).send(totalSpendingsByCategory);
    } else {
      return res.status(400).send("Error getting report");
    }
  } catch (err) {
    Sentry.captureException(err);
    return res.status(500).send("Internal Server error");
  }
});

// Get All Transactions with filters:

reportsController.get("/filters/:userId/transactions", async (req, res) => {
  try {
    if (!req.params.userId || !req.query.limit || !req.query.offset) {
      return res
        .status(400)
        .send("Missing required fields. Must contain [userId, limit, offset]");
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

    const { rows: resultReport, count } =
      await TransactionsModel.findAndCountAll({
        include: [
          {
            model: AccountsModel,
            where: accountId ? { id: accountId } : { UserId: userId },
          },
        ],
        where: {
          descriptions: { [Op.like]: `%${transactionName}%` },
          transactionDate: { [Op.between]: [startDate, endDate] },
          amount: { [Op.between]: [minAmount, maxAmount] },
          category: categories.length > 0 ? { [Op.in]: categories } : undefined,
        },
        order: [["transactionDate", "DESC"]],
        limit,
        offset,
      });

    if (count > 0) {
      const filteredResultReport = resultReport.map((transaction) => ({
        id: transaction.id,
        transactionDate: transaction.transactionDate,
        descriptions: transaction.descriptions,
        amount: transaction.amount,
        category: transaction.category,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        AccountId: transaction.AccountId,
      }));
      return res.status(200).send({
        totalCount: count,
        transactions: filteredResultReport,
      });
    } else {
      return res.status(400).send("Error getting transactions");
    }
  } catch (err) {
    Sentry.captureException(err);
    return res.status(500).send("Internal Server error");
  }
});
