import Router from "express";
// Base route: /api/transactions
const transactionsController = Router();

transactionsController.get("/", (req, res) => {
  res.send("Hello from transactions controller");
});

exports.transactionsController = transactionsController;
