import Router from "express";
// Base route: /api/accounts
const accountsController = Router();

accountsController.get("/", (req, res) => {
  res.send("Hello from accounts controller");
});

exports.accountsController = accountsController;
