import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

/*  ******* Data types *******
CREATE TABLE IF NOT EXISTS Transactions (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE
  access_token VARCHAR(255)
  cursor VARCHAR(255)
);
*/

export const UsersModel = sequelize.define("Users", {
  auth0UserId: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  access_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  cursor: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});
