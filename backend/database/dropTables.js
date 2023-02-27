import { pool } from "./database.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

async function dropTables() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "./dropTables.sql");
    const sql = fs.readFileSync(filePath).toString();
    await pool.query(sql);
    console.log("Tables Dropped");
  } catch (error) {
    console.error(error.message);
  }
}
dropTables();
