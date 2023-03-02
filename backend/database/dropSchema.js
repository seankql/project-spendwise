import { pool } from "./database.js";

async function dropTables() {
  try {
    await pool.query("DROP SCHEMA IF EXISTS public CASCADE");
    console.log("Schema Dropped");
  } catch (error) {
    console.error(error.message);
  }
}
dropTables();
