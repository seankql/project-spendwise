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

  async function getAccounts(userId) {
    const result = await getAccountsUseCase(userId);
    setAccounts(result);
  }

  async function getFilterReports(userId) {
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
    getFilterReports(userId);
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
