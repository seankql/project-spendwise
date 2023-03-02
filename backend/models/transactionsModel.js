import BaseModel from "./baseModel";

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
}
export { TransactionModel };