import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountsController from "../../../Controllers/accountsController";
import TransactionsController from "../../../Controllers/transactionsController";
import UserController from "../../../Controllers/userController";

export default function VisualizationViewModel() {
  const [error, setError] = useState("");
  const [graph, setGraph] = useState("pie");
  const [transactions, setTransactions] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [name, setName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [categories, setCategories] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);

  const navigate = useNavigate();

  function navigateToPage(page = "/") {
    navigate(page);
  }

  const { getFilterTransactionsUseCase } = TransactionsController();

  const { getAccountsUseCase } = AccountsController();

  const { postUserUseCase, getUserUseCase } = UserController();

  function setFilters(filtersJSON) {
    const filters = JSON.parse(filtersJSON);
    setName(filters.name);
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
    setMinValue(filters.minValue);
    setMaxValue(filters.maxValue);
    setCategories(filters.categories);
  }

  async function getAccounts(userId, token = bearerToken) {
    const result = await getAccountsUseCase(userId, token);
    setAccounts(result);
  }

  async function getFilterReports(userId, token = bearerToken) {
    const result = await getFilterTransactionsUseCase(
      userId,
      Number.MAX_SAFE_INTEGER,
      0,
      selectedAccount,
      name,
      startDate,
      endDate,
      minValue,
      maxValue,
      categories,
      token
    );
    setTransactions(result);
  }

  async function fetchData(user, token) {
    setBearerToken(token);
    const result = await getUserUseCase(user?.sub.split("|")[1], token);
    if (!result) return;
    const resultJson = await result.json();
    const userId = resultJson.id;

    getAccounts(userId, token);
    getFilterReports(userId, token);
  }

  return {
    error,
    accounts,
    transactions,
    getAccounts,
    navigateToPage,
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
    fetchData,
    graph,
    setGraph,
  };
}
