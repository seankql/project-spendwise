import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useController from "./Controller";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";

export default function TransactionsViewModel() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [transactionVisiblity, setTransactionVisiblity] = useState("hidden");

  const {
    getUsernameUseCase,
    getAccountsUseCase,
    getTransactionsUseCase,
    postTransactionUseCase,
  } = useController();
  const navigate = useNavigate();

  function getCurrentDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Would be an async function that calls controller
  function getUsername() {
    const { result, error } = getUsernameUseCase();
    setError(error);
    setUsername(result);
  }

  async function getAccounts(userId) {
    const result = await getAccountsUseCase(userId);
    setAccounts(result);
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

  async function getTransactions(userId, page, pageSize) {
    const result = await getTransactionsUseCase(userId, page, pageSize);
    setTransactions(result);
  }

  async function createTransaction(name, category, amount) {
    await postTransactionUseCase(name, category, amount, 1, getCurrentDate());
    const result = await getTransactionsUseCase(1, 0, 16);
    setTransactions(result);
  }

  function navigateToPage(page = "/") {
    navigate(page);
  }

  return {
    error,
    transactionVisiblity,
    toggleTransactionVisiblity,
    username,
    getUsername,
    accounts,
    getAccounts,
    transactions,
    getTransactions,
    navigateToPage,
    createTransaction,
    getArrow,
  };
}
