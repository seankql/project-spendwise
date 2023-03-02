import BaseModel from "./baseModel";

class AccountsModel extends BaseModel {
    constructor(accountId, userId, accountNumber) {
        super("Accounts", "accountId");
        this.accountId = accountId;
        this.userId = userId;
        this.accountNumber = accountNumber;
    }
    async create() {
        const data = await super.create({
            userId: this.userId,
            accountName: this.accountName,
            accountType: this.accountType,
            balance: this.balance,
        });
        return data.length > 0 ? new AccountsModel(data) : null;
    }
    async findByPK(pk) {
        const data = await super.findByPK(pk);
        return data.length > 0 ? new AccountsModel(data) : null;
    }
    async findAll(condition) {
        const data = await super.findAll(condition);
        return data.length > 0 ? new AccountsModel(data) : null;
    }
    async deleteByPK(pk) {
        const data = await super.deleteByPK(pk);
        return data.length > 0 ? new AccountsModel(data) : null;
    }
}
export { AccountsModel };