import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { UsersModel } from "./usersModel.js";

/*  ******* Data types *******
CREATE TABLE IF NOT EXISTS Accounts (
  id SERIAL PRIMARY KEY,
  UserId INTEGER NOT NULL REFERENCES Users(userId),
  accountName VARCHAR(255) NOT NULL,
  plaidAccountId VARCHAR(255)
);
*/

export const AccountsModel = sequelize.define("Accounts", {
  accountName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  plaidAccountId: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

UsersModel.hasMany(AccountsModel);
AccountsModel.belongsTo(UsersModel);
