import Router from "express";
import { TransactionModel } from "../models/transactionsModel.js";
import Sentry from "@sentry/node";

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
    const ids = {
      userId: req.query.userId,
    };
    const resultReport =
      await TransactionModel.getAllTransactionsByIdsAndDateRange(
        ids,
        req.query.startDate,
        req.query.endDate
      );
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
    const ids = {
      accountId: req.query.accountId,
    };
    const resultReport =
      await TransactionModel.getAllTransactionsByIdsAndDateRange(
        ids,
        req.query.startDate,
        req.query.endDate
      );
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
    const ids = {
      userId: req.query.userId,
    };
    const resultReport =
      await TransactionModel.getAllTransactionsByIdsAndDateRange(
        ids,
        req.query.startDate,
        req.query.endDate
      );
    if (resultReport) {
      const totalSpendingsByCategory = {};
      for (const transaction of resultReport) {
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
