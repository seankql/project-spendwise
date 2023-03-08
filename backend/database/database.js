import { Sequelize } from "sequelize";
import { config } from "../config/config.js";

export const sequelize = new Sequelize(
  `postgres://${config.dbName}:${config.dbPass}@${config.dbHost}:${config.dbPort}/${config.dbName}`
);
