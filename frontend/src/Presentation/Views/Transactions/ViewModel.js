import { useState } from "react";
import { useNavigate } from "react-router-dom";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";
import TransactionsController from "../../../Controllers/transactionsController";
import AccountsController from "../../../Controllers/accountsController";
import ReportsController from "../../../Controllers/reportsController";

export default function TransactionsViewModel() {
  const [error, setError] = useState("");
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

  const navigate = useNavigate();

  const {
    createTransactionsUseCase,
    updateTransactionsUseCase,
    deleteTransactionsUseCase,
  } = TransactionsController();

  const { getFilterReportsUseCase } = ReportsController();

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

  async function getAccounts(userId) {
    const result = await getAccountsUseCase(userId);
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
    getFilterReports(1, 9, page);
  }

  async function getFilterReports(userId, limit, offset) {
    const result = await getFilterReportsUseCase(
      userId,
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
    name,
    startDate,
    endDate,
    minValue,
    maxValue,
    categories,
  };
}
