import BaseModel from "./baseModel";

class UsersModel extends BaseModel {
  constructor(userId, username, hashedPassword, email) {
    super("Users", "userId");
    this.userId = userId;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.email = email;
  }
  async create() {
    const data = await super.create({
      username: this.username,
      hashedPassword: this.hashedPassword,
      email: this.email,
    });
    return data.length > 0 ? new UsersModel(data) : null;
  }
  async findByPK(pk) {
    const data = await super.findByPK(pk);
    return data.length > 0 ? new UsersModel(data) : null;
  }
  async findAll(condition) {
    const data = await super.findAll(condition);
    return data.length > 0 ? new UsersModel(data) : null;
  }
  async deleteByPK(pk) {
    const data = await super.deleteByPK(pk);
    return data.length > 0 ? new UsersModel(data) : null;
  }
}
export { UsersModel };