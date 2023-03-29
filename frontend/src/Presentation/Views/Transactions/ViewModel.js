import { useState } from "react";
import { useNavigate } from "react-router-dom";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";
import TransactionsController from "../../../Controllers/transactionsController";
import AccountsController from "../../../Controllers/accountsController";
import UserController from "../../../Controllers/userController";

export default function TransactionsViewModel() {
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [transactionVisiblity, setTransactionVisiblity] = useState("hidden");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [page, setPage] = useState(0);
  const [name, setName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [categories, setCategories] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);

  const {
    createTransactionsUseCase,
    updateTransactionsUseCase,
    deleteTransactionsUseCase,
    getFilterTransactionsUseCase,
  } = TransactionsController();

  const { getAccountsUseCase } = AccountsController();

  const { postUserUseCase, getUserUseCase } = UserController();

  const navigate = useNavigate();

  function getCurrentDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function navigateToPage(page = "/") {
    navigate(page);
  }

  function toggleTransactionVisiblity() {
    if (transactionVisiblity === "hidden") {
      setTransactionVisiblity("");
    } else {
      setTransactionVisiblity("hidden");
    }
  }

  function getCreateTransactionVisibility() {
    if (!selectedAccount) {
      return "hidden";
    }
    return "";
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

  function setSelectedAccountFunction(account) {
    setSelectedAccount(account);
    setPage(0);
  }

  function navigateToPage(page = "/") {
    navigate(page);
  }

  function setFilters(filtersJSON) {
    const filters = JSON.parse(filtersJSON);
    setName(filters.name);
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
    setMinValue(filters.minValue);
    setMaxValue(filters.maxValue);
    setCategories(filters.categories);
  }

  async function getAccounts(uid = userId, token = bearerToken) {
    const result = await getAccountsUseCase(uid, token);
    setAccounts(result);
  }

  async function createTransaction(
    name,
    category,
    amount,
    token = bearerToken
  ) {
    await createTransactionsUseCase(
      name,
      category,
      amount,
      selectedAccount,
      getCurrentDate(),
      token
    );
    getFilterReports(userId, 9, page, token);
  }

  async function updateTransaction(
    name,
    category,
    amount,
    date,
    transactionId,
    accountId,
    token = bearerToken
  ) {
    await updateTransactionsUseCase(
      name,
      category,
      amount,
      accountId,
      date,
      transactionId,
      token
    );
    getFilterReports(userId, 9, page, token);
  }

  async function deleteTransaction(transactionId, token = bearerToken) {
    const result = await deleteTransactionsUseCase(transactionId, token);
    getFilterReports(userId, 9, page, token);
  }

  async function getFilterReports(
    uid = userId,
    limit,
    offset,
    token = bearerToken
  ) {
    const result = await getFilterTransactionsUseCase(
      uid,
      limit,
      offset,
      selectedAccount,
      name,
      startDate,
      endDate,
      minValue,
      maxValue,
      categories,
      token
    );
    if (result.transactions.length === 0 && page > 0) {
      getFilterReports(userId, limit, offset - 1, token);
      setPage(page - 1);
    } else {
      setTransactions(result);
    }
  }

  async function fetchData(user, token) {
    setBearerToken(token);
    const result = await getUserUseCase(user?.sub.split("|")[1], token);
    if (!result) return;
    const resultJson = await result.json();
    const userId = resultJson.id;

    getAccounts(userId, token);
    getFilterReports(userId, 9, page, token);
    setUserId(userId);
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
    navigateToPage,
    createTransaction,
    selectedAccount,
    setSelectedAccountFunction,
    getCreateTransactionVisibility,
    getFilterReports,
    setFilters,
    getArrow,
    updateTransaction,
    deleteTransaction,
    name,
    startDate,
    endDate,
    minValue,
    maxValue,
    categories,
    fetchData,
  };
}
