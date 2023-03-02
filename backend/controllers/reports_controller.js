import Router from "express";

// Base route: /api/reports
export const reportsController = Router();

reportsController.get("/", (req, res) => {
  res.send("Hello from reports controller");
});
