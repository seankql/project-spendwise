import { pool } from "./database.js";

async function dropTables() {
  try {
    await pool.query("DROP SCHEMA IF EXISTS spendwise CASCADE");
    console.log("Tables Dropped");
  } catch (error) {
    console.error(error.message);
  }
}
dropTables();
