import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useController from "./Controller";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";

export default function TransactionsViewModel() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [transactionVisiblity, setTransactionVisiblity] = useState("hidden");

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

  function toggleTransactionVisiblity() {
    console.log(transactionVisiblity);
    if (transactionVisiblity === "hidden") {
      setTransactionVisiblity("");
    }
    else {
      setTransactionVisiblity("hidden");
    }
  }

  function getArrow() {
    if (transactionVisiblity === "hidden") {
      return downArrow;
    }
    else {
      return upArrow;
    }
  }

  function navigateToPage(page = "/") {
    navigate(page);
  }

  return {
    error,
    transactionVisiblity,
    toggleTransactionVisiblity,
    username,
    getUsername,
    accounts,
    getAccounts,
    navigateToPage,
    getArrow,
  };
}
