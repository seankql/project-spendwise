import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

/*  ******* Data types *******
CREATE TABLE IF NOT EXISTS Transactions (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE
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
});
