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

  async function getAccounts(uid = userId) {
    const result = await getAccountsUseCase(uid);
    setAccounts(result);
  }

  async function createTransaction(name, category, amount) {
    await createTransactionsUseCase(
      name,
      category,
      amount,
      selectedAccount,
      getCurrentDate()
    );
    getFilterReports(userId, 9, page);
  }

  async function updateTransaction(
    name,
    category,
    amount,
    date,
    transactionId,
    accountId
  ) {
    await updateTransactionsUseCase(
      name,
      category,
      amount,
      accountId,
      date,
      transactionId
    );
    getFilterReports(userId, 9, page);
  }

  async function deleteTransaction(transactionId) {
    const result = await deleteTransactionsUseCase(transactionId);
    getFilterReports(userId, 9, page);
  }

  async function getFilterReports(uid = userId, limit, offset) {
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
      categories
    );
    setTransactions(result);
  }

  async function fetchData(user) {
    const auth0User = user?.sub.split("|")[1];
    const result = await getUserUseCase(auth0User);
    if (!result) return;
    const userId = result.id;

    getAccounts(userId);
    getFilterReports(userId, 9, page);
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
    setSelectedAccount,
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
