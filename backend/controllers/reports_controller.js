import Router from "express";
import { Op } from "sequelize";
import Sentry from "@sentry/node";
import { TransactionsModel } from "../models/transactionsModel.js";
import { UsersModel } from "../models/usersModel.js";
import { AccountsModel } from "../models/accountsModel.js";
import { validateAccessToken, isAuthorizedUserId } from "../middleware/auth.js";
import jwt_decode from "jwt-decode";

// Base route: /api/reports
export const reportsController = Router();

// Get Report for user: GET /api/reports?userId=${}&startDate=${}&endDate=${}
reportsController.get(
  "/",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
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
              include: [
                {
                  model: UsersModel,
                  where: { id: req.query.userId },
                },
              ],
            },
          ],
          where: {
            transactionDate: {
              [Op.between]: [req.query.startDate, req.query.endDate],
            },
          },
          order: [["transactionDate", "DESC"]],
        });

      if (count === 0) {
        return res.status(200).send({
          totalCount: count,
          transactions: [],
          income: 0,
          expense: 0,
        });
      }
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
          plaidTransactionId: transaction.plaidTransactionId,
        }));

        const result = filteredResultReport.reduce(
          (acc, transaction) => {
            if (transaction.amount) {
              const amount = parseFloat(transaction.amount);

              if (amount < 0) {
                acc.income += Math.abs(amount);
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
      // Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);

// Get All Transactions for one accounts: GET /api/reports/accounts?accountId=${}&startDate=${}&endDate=${}
reportsController.get("/accounts", validateAccessToken, async (req, res) => {
  try {
    if (!req.query.accountId || !req.query.startDate || !req.query.endDate) {
      return res
        .status(400)
        .send(
          "Missing required fields. Must contain [accountId, startDate, endDate]"
        );
    }
    // check if authorized to get this report
    const account = await AccountsModel.findByPk(req.query.accountId);
    const accessToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(accessToken);
    const currentAuth0UserId = decoded.sub.split("|")[1];
    const currentUser = await UsersModel.findOne({
      where: { auth0UserId: currentAuth0UserId },
    });
    if (Number(currentUser.id) !== Number(account.UserId)) {
      return res.status(403).send("Unauthorized");
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
    if (count === 0) {
      return res.status(200).send({
        totalCount: count,
        transactions: [],
        income: 0,
        expense: 0,
      });
    }
    if (resultReport) {
      const result = resultReport.reduce(
        (acc, transaction) => {
          if (transaction.amount) {
            const amount = parseFloat(transaction.amount);

            if (amount < 0) {
              acc.income += Math.abs(amount);
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
    // Sentry.captureException(err);
    return res.status(500).send("Internal Server error " + err);
  }
});

// Get All Transactions for one user and enerate a report for each category: GET /api/reports/categories?userId=${}&startDate=${}&endDate=${}

reportsController.get(
  "/categories",
  validateAccessToken,
  isAuthorizedUserId,
  async (req, res) => {
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
              include: [
                {
                  model: UsersModel,
                  where: { id: req.query.userId },
                },
              ],
            },
          ],
          where: {
            transactionDate: {
              [Op.between]: [req.query.startDate, req.query.endDate],
            },
          },
          order: [["transactionDate", "DESC"]],
        });
      if (count === 0) {
        return res.status(200).send({
          totalCount: count,
          transactions: [],
          income: 0,
          expense: 0,
        });
      }
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
          plaidTransactionId: transaction.plaidTransactionId,
        }));
        const totalByCategory = {
          expense: {},
          income: {},
        };
        for (const transaction of filteredResultReport) {
          if (transaction.category && transaction.amount) {
            const category = transaction.category;
            const amount = parseFloat(transaction.amount);

            if (amount < 0) {
              // income
              if (totalByCategory.income[category]) {
                totalByCategory.income[category].amount += Math.abs(amount);
                totalByCategory.income[category].count += 1;
                totalByCategory.income[category].transactions.push(transaction);
              } else {
                totalByCategory.income[category] = {
                  amount: Math.abs(amount),
                  count: 1,
                  transactions: [transaction],
                };
              }
            } else {
              // expense
              if (totalByCategory.expense[category]) {
                totalByCategory.expense[category].amount += amount;
                totalByCategory.expense[category].count += 1;
                totalByCategory.expense[category].transactions.push(
                  transaction
                );
              } else {
                totalByCategory.expense[category] = {
                  amount: amount,
                  count: 1,
                  transactions: [transaction],
                };
              }
            }
          }
        }
        return res.status(200).send(totalByCategory);
      } else {
        return res.status(400).send("Error getting report");
      }
    } catch (err) {
      // Sentry.captureException(err);
      return res.status(500).send("Internal Server error " + err);
    }
  }
);
