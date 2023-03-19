import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountsController from "../../../Controllers/accountsController";
import ReportsController from "../../../Controllers/reportsController";

export default function VisualizationViewModel() {
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [name, setName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [categories, setCategories] = useState(null);

  const navigate = useNavigate();

  function getUserId(user) {
    return user?.sub.split("|")[1];
  }

  function navigateToPage(page = "/") {
    navigate(page);
  }

  const { getFilterReportsUseCase } = ReportsController();

  const { getAccountsUseCase } = AccountsController();

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

  async function getFilterReports(userId) {
    const result = await getFilterReportsUseCase(
      userId,
      Number.MAX_SAFE_INTEGER,
      0,
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
    accounts,
    transactions,
    getAccounts,
    navigateToPage,
    getUserId,
    setFilters,
    getFilterReports,
    selectedAccount,
    setSelectedAccount,
    name,
    startDate,
    endDate,
    minValue,
    maxValue,
    categories,
  };
}
