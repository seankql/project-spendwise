import BaseModel from "./baseModel.js";

class AccountsModel extends BaseModel {
  constructor(userId, accountName) {
    super("Accounts", "accountId");
    this.userId = userId;
    this.accountName = accountName;
    this.dateCreated = new Date();
  }
  async create() {
    return await super.create({
      userId: this.userId,
      accountName: this.accountName,
      dateCreated: this.dateCreated,
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
export { AccountsModel };
