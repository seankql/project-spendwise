import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

/*  ******* Data types *******
CREATE TABLE IF NOT EXISTS Transactions (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE
  accessToken VARCHAR(255)
);
*/

export const UsersModel = sequelize.define("Users", {
  id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  accessToken: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});
