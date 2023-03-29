import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountsController from "../../../Controllers/accountsController";
import ReportsController from "../../../Controllers/reportsController";
import UserController from "../../../Controllers/userController";

export default function DashboardViewModel() {
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);

  const {
    getReportsUseCase,
    getAccountReportsUseCase,
    getCategoryReportsUseCase,
  } = ReportsController();

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

  function getDefaultStartDate() {
    const dateObj = new Date(new Date() - 1000 * 60 * 60 * 24 * 30);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = "01";
    return `${year}-${month}-${day}`;
  }

  function navigateToPage(page = "/") {
    navigate(page);
  }

  async function getUserId(user) {
    const auth0User = user?.sub.split("|")[1];
    const result = await getUserUseCase(auth0User);
    if (!result) return null;
    return result.id;
  }

  async function createUser(user, token = bearerToken) {
    await postUserUseCase(user?.sub.split("|")[1], user.email, token);
  }

  async function getAccounts(userId, token = bearerToken) {
    const result = await getAccountsUseCase(userId, token);
    setAccounts(result);
  }

  async function getReports(userId, token = bearerToken) {
    const startDate = getDefaultStartDate();
    const endDate = getCurrentDate();
    const result = await getReportsUseCase(userId, startDate, endDate, token);
    setTransactions(result);
  }

  async function getAccountReports(accountId, token = bearerToken) {
    const startDate = getDefaultStartDate();
    const endDate = getCurrentDate();
    const result = await getAccountReportsUseCase(
      accountId,
      startDate,
      endDate,
      token
    );
    setTransactions(result);
  }

  async function getCategoryData(userId, token = bearerToken) {
    const startDate = getDefaultStartDate();
    const endDate = getCurrentDate();
    const result = await getCategoryReportsUseCase(
      userId,
      startDate,
      endDate,
      token
    );
    setCategoryData(result);
  }

  async function fetchData(user, token) {
    setBearerToken(token);

    const result = await getUserUseCase(user?.sub.split("|")[1], token);
    if (result.status !== 200) {
      await createUser(user, token);
    }
    const resultJson = await result.json();
    const userId = resultJson.id;

    getCategoryData(userId, token);
    await getAccounts(userId, token);
    if (!selectedAccount) {
      getReports(userId, token);
    } else {
      getAccountReports(selectedAccount, token);
    }
  }

  return {
    error,
    getCurrentDate,
    getDefaultStartDate,
    accounts,
    getAccounts,
    categoryData,
    setCategoryData,
    getCategoryData,
    transactions,
    getReports,
    getAccountReports,
    selectedAccount,
    setSelectedAccount,
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
    fetchData,
  };
}
