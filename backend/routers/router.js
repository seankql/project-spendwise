import { Router } from "express";
import { accountsController } from "./accounts_controller.js";
import { usersController } from "./users_controller.js";
import { transactionsController } from "./transactions_controller.js";

const router = Router();

router.use("/transactions", transactionsController);
router.use("/accounts", accountsController);
router.use("/users", usersController);

exports.router = router;
