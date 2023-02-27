import Router from "express";

// Base route: /api/transactions
export const transactionsController = Router();

transactionsController.get("/", (req, res) => {
  res.send("Hello from transactions controller");
});

