import BaseModel from "./baseModel";

class TransactionModel extends BaseModel {
  constructor(
    transactionId,
    transactionDate,
    descriptions,
    amount,
    accountId,
    category
  ) {
    super("Transactions", "transactionId");
    this.transactionId = transactionId;
    this.transactionDate = transactionDate;
    this.descriptions = descriptions;
    this.amount = amount;
    this.accountId = accountId;
    this.category = category;
  }
  async create() {
    const data = await super.create({
      userId: this.userId,
      amount: this.amount,
      date: this.date,
      description: this.description,
      category: this.category,
      type: this.type,
    });
    return data.length > 0 ? new TransactionModel(data) : null;
  }
  async findByPK(pk) {
    const data = await super.findByPK(pk);
    return data.length > 0 ? new TransactionModel(data) : null;
  }
  async findAll(condition) {
    const data = await super.findAll(condition);
    return data.length > 0 ? new TransactionModel(data) : null;
  }
  async deleteByPK(pk) {
    const data = await super.deleteByPK(pk);
    return data.length > 0 ? new TransactionModel(data) : null;
  }
}
export { TransactionModel };
