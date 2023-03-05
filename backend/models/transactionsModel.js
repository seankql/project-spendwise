import BaseModel from "./baseModel.js";
import { pool } from "../database/database.js";
class TransactionModel extends BaseModel {
  constructor(transactionDate, descriptions, amount, accountId, category) {
    super("Transactions", "transactionId");
    this.transactionDate = transactionDate;
    this.descriptions = descriptions;
    this.amount = amount;
    this.accountId = accountId;
    this.category = category;
  }
  async create() {
    return await super.create({
      transactionDate: this.transactionDate,
      descriptions: this.descriptions,
      amount: this.amount,
      accountId: this.accountId,
      category: this.category,
    });
  }
  async findByPK(pk) {
    return await super.findByPK(pk);
  }
  async findAll(condition) {
    return await super.findAll(condition);
  }
  async deleteByPK(pk) {
    return await super.deleteByPK(pk);
  }
  async updateByPK(pk, data) {
    return await super.updateByPK(pk, data);
  }
  static async getMostRecentTransactionsByUserId(userId, page, pageSize) {
    const client = await pool.connect();
    const query = `SELECT t.* 
                  FROM transactions t 
                  JOIN accounts a ON a.accountId = t.accountId 
                  JOIN users u ON u.userId = a.userId 
                  WHERE u.userId = ${userId} 
                  ORDER BY t.transactionDate DESC 
                  LIMIT ${pageSize} 
                  OFFSET ${page}`;
    const countQuery = `SELECT COUNT(*) 
                        FROM transactions t 
                        JOIN accounts a ON a.accountId = t.accountId 
                        JOIN users u ON u.userId = a.userId 
                        WHERE u.userId = ${userId}`;
    const [result, countResult] = await Promise.all([
      client.query(query),
      client.query(countQuery),
    ]);
    client.release();
    return { rows: result.rows, totalCount: countResult.rows[0].count };
  }
  static async getAllTransactionsByIdsAndDateRange(ids, startDate, endDate) {
    if (ids.accountId || ids.userId) {
      const client = await pool.connect();
      let query = {
        text: `SELECT t.* FROM transactions t JOIN accounts a ON a.accountId = t.accountId JOIN users u ON u.userId = a.userId`,
      };
      if (ids.accountId) {
        query.text += ` WHERE a.accountId = $1`;
        query.values = [ids.accountId];
      } else if (ids.userId) {
        query.text += ` WHERE u.userId = $1`;
        query.values = [ids.userId];
      }
      query.text += ` AND t.transactionDate BETWEEN $2 AND $3 ORDER BY t.transactionDate DESC`;
      query.values.push(startDate, endDate);
      const result = await client.query(query);
      client.release();
      return result.rows;
    }
  }

  static async getTransactionsByAccountIdWithFilters(
    userId,
    accountId,
    descriptionName,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    categories,
    limit,
    offset
  ) {
    const client = await pool.connect();
    let accountCondition = "";
    if (accountId) {
      accountCondition = ` AND a.accountId = $1`;
    } else {
      // fetch all accounts under userId
      accountCondition = ` AND a.userId = ${userId}`;
    }

    let categoriesString = "";
    if (categories.length > 0) {
      categoriesString = categories.map((c) => `'${c}'`).join(",");
      categoriesString = `AND (t.category IN (${categoriesString}))`;
    }

    const query = `SELECT t.transactionId, t.transactionDate, t.descriptions, t.amount, t.category 
                 FROM Transactions t
                 INNER JOIN Accounts a ON t.accountId = a.accountId
                 INNER JOIN Users u ON a.userId = u.userId
                 WHERE 1=1
                   ${accountCondition}
                   AND (t.descriptions LIKE '%${descriptionName}%' OR '${descriptionName}' = '')
                   AND (t.transactionDate BETWEEN '${startDate}' AND '${endDate}')
                   AND (t.amount BETWEEN ${minAmount} AND ${maxAmount})
                   ${categoriesString}
                   AND u.userId = ${userId}
                  ORDER BY t.transactionDate DESC
                  LIMIT ${limit} OFFSET ${offset};`;

    const countQuery = `SELECT COUNT(*) FROM Transactions t
                  INNER JOIN Accounts a ON t.accountId = a.accountId
                  INNER JOIN Users u ON a.userId = u.userId
                  WHERE 1=1
                    ${accountCondition}
                    AND (t.descriptions LIKE '%${descriptionName}%' OR '${descriptionName}' = '')
                    AND (t.transactionDate BETWEEN '${startDate}' AND '${endDate}')
                    AND (t.amount BETWEEN ${minAmount} AND ${maxAmount})
                    ${categoriesString}
                    AND u.userId = ${userId};`;

    const [result, countResult] = await Promise.all([
      client.query(query),
      client.query(countQuery),
    ]);
    client.release();
    return { rows: result.rows, totalCount: countResult.rows[0].count };
  }
}
export { TransactionModel };
