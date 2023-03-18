import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountsController from "../../../Controllers/accountsController";
import ReportsController from "../../../Controllers/reportsController";

export default function DashboardViewModel() {
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const navigate = useNavigate();

  const {
    getReportsUseCase,
    getAccountReportsUseCase,
    getCategoryReportsUseCase,
  } = ReportsController();

  const { getAccountsUseCase } = AccountsController();

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
  };
}
