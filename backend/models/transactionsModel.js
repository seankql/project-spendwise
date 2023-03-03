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
    const result = await client.query(
      "SELECT t.* FROM transactions t JOIN accounts a ON a.accountId = t.accountId JOIN users u ON u.userId = a.userId WHERE u.userId = $1 ORDER BY t.transactionDate DESC LIMIT $2 OFFSET $3",
      [userId, pageSize, page]
    );
    client.release();
    return result.rows;
  }
}
export { TransactionModel };
