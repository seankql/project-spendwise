import { useState } from "react";
import { useNavigate } from "react-router-dom";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";
import TransactionsController from "../../../Controllers/transactionsController";
import AccountsController from "../../../Controllers/accountsController";

export default function TransactionsViewModel() {
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [transactionVisiblity, setTransactionVisiblity] = useState("hidden");
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const {
    getTransactionsUseCase,
    createTransactionsUseCase,
    updateTransactionsUseCase,
    deleteAccountsUseCase,
  } = TransactionsController();

  const { getAccountsUseCase } = AccountsController();

  function getCurrentDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function toggleTransactionVisiblity() {
    if (transactionVisiblity === "hidden") {
      setTransactionVisiblity("");
    } else {
      setTransactionVisiblity("hidden");
    }
  }

  function getArrow() {
    if (transactionVisiblity === "hidden") {
      return downArrow;
    } else {
      return upArrow;
    }
  }

  function incrementPage() {
    setPage(page + 1);
  }

  function decrementPage() {
    setPage(page - 1);
  }

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

  async function createTransaction(name, category, amount) {
    await createTransactionsUseCase(
      name,
      category,
      amount,
      5,
      getCurrentDate()
    );
    const result = await getTransactionsUseCase(1, page, 9);
    setTransactions(result);
  }

  return {
    error,
    page,
    setPage,
    incrementPage,
    decrementPage,
    transactionVisiblity,
    toggleTransactionVisiblity,
    accounts,
    getAccounts,
    transactions,
    getTransactions,
    navigateToPage,
    createTransaction,
    getArrow,
  };
}
