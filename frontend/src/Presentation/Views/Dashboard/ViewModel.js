import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionsController from "../../../Controllers/transactionsController";
import AccountsController from "../../../Controllers/accountsController";
import ReportsController from "../../../Controllers/reportsController";

export default function DashboardViewModel() {
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState(null);

  const navigate = useNavigate();

  const {
    getTransactionsUseCase,
    createTransactionsUseCase,
    updateTransactionsUseCase,
    deleteAccountsUseCase,
  } = TransactionsController();

  const { getAccountsUseCase } = AccountsController();

  function navigateToPage(page = "/") {
    navigate(page);
  }

  async function getAccounts(userId) {
    const result = await getAccountsUseCase(userId);
    setAccounts(result);
  }

  async function getTransactions(userId, page, pageSize) {
    const result = await getTransactionsUseCase(userId, page, pageSize);
    setTransactions(result);
  }

  return {
    error,
    accounts,
    getAccounts,
    transactions,
    getTransactions,
    navigateToPage,
  };
}
