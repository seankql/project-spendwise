import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useController from "./Controller";

export default function TransactionsViewModel() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const { getUsernameUseCase, getAccountsUseCase } = useController();
  const navigate = useNavigate();

  // Would be an async function that calls controller
  function getUsername() {
    const { result, error } = getUsernameUseCase();
    setError(error);
    setUsername(result);
  }

  function getAccounts() {
    const { result, error } = getAccountsUseCase();
    setError(error);
    setAccounts(result);
  }

  function navigateToPage(page = "/") {
    navigate(page);
  }

  return {
    error,
    username,
    getUsername,
    accounts,
    getAccounts,
    navigateToPage,
  };
}
