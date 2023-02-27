import Router from "express";
import { pool } from "../database/database.js";

// Base route: /api/accounts
export const accountsController = Router();

accountsController.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    res.send(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});
