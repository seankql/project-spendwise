import BaseModel from "./baseModel.js";

class UsersModel extends BaseModel {
  constructor(username, hashedPassword, email) {
    super("Users", "userId");
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.email = email;
  }
  async create() {
    return await super.create({
      username: this.username,
      hashedPassword: this.hashedPassword,
      email: this.email,
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
export { UsersModel };
