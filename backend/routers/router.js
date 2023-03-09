import { Router } from "express";
import { accountsController } from "../controllers/accounts_controller.js";
import { transactionsController } from "../controllers/transactions_controller.js";
import { reportsController } from "../controllers/reports_controller.js";
export const router = Router();

router.use("/transactions", transactionsController);
router.use("/accounts", accountsController);
router.use("/reports", reportsController);
