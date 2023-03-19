import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountsController from "../../../Controllers/accountsController";
import ReportsController from "../../../Controllers/reportsController";
import UserController from "../../../Controllers/userController";

export default function DashboardViewModel() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const {
    getReportsUseCase,
    getAccountReportsUseCase,
    getCategoryReportsUseCase,
  } = ReportsController();
  const { getAccountsUseCase } = AccountsController();
  const { postUserUseCase } = UserController();

  const navigate = useNavigate();

  function getCurrentDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getCurrentMonth() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = "01";
    return `${year}-${month}-${day}`;
  }

  function navigateToPage(page = "/") {
    navigate(page);
  }

  function getUserId(user) {
    return user?.sub.split("|")[1];
  }

  async function createUser(user) {
    await postUserUseCase(getUserId(user), user.email);
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

  async function getReports(userId) {
    const startDate = getCurrentMonth();
    const endDate = getCurrentDate();
    const result = await getReportsUseCase(userId, startDate, endDate);
    setTransactions(result);
  }

  async function getAccountReports(accountId) {
    const startDate = getCurrentMonth();
    const endDate = getCurrentDate();
    const result = await getAccountReportsUseCase(
      accountId,
      startDate,
      endDate
    );
    setTransactions(result);
  }

  async function getCategoryData(userId) {
    const startDate = getCurrentMonth();
    const endDate = getCurrentDate();
    const result = await getCategoryReportsUseCase(userId, startDate, endDate);
    setCategoryData(result);
  }

  return {
    error,
    username,
    getUsername,
    accounts,
    getAccounts,
    transactions,
    getTransactions,
    navigateToPage,
    getUserId,
    createUser,
    categoryData,
    setCategoryData,
    getCategoryData,
    getReports,
    getAccountReports,
    selectedAccount,
    setSelectedAccount,
  };
}
