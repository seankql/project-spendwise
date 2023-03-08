import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

/*  ******* Data types *******
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
*/

export const UsersModel = sequelize.define("Users", {
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  hashedPassword: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});
