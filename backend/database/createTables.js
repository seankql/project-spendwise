import { pool } from "./database.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

async function createTables() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "./createTables.sql");
    const sql = fs.readFileSync(filePath).toString();
    await pool.query(sql);
    console.log("Tables created");
  } catch (error) {
    console.error(error.message);
  }
}
createTables();
