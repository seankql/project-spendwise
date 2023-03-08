import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { AccountsModel } from "./accountsModel.js";
/*  ******* Data types *******
CREATE TABLE IF NOT EXISTS Transactions (
  id SERIAL PRIMARY KEY,
  transactionDate DATE NOT NULL,
  descriptions VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  accountId INTEGER NOT NULL REFERENCES Accounts(accountId),
  category VARCHAR(255) NOT NULL
);
*/

export const TransactionsModel = sequelize.define("Transactions", {
  transactionDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  descriptions: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});
AccountsModel.hasMany(TransactionsModel);
TransactionsModel.belongsTo(AccountsModel);
