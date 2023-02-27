import pg from "pg";
import { config } from "../config/config.js";

const { Pool } = pg;

export const pool = new Pool({
  user: config.dbUser,
  password: config.dbPass,
  host: config.dbHost,
  port: config.dbPort,
  database: config.dbName,
});
