import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useController from "./Controller";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";

export default function AccountViewModel() {
  const [error, setError] = useState("");
  const [basicInfo, setBasicInfo] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [transactionVisiblity, setTransactionVisiblity] = useState("hidden");

  const { getBasicInfoUseCase, getAccountsUseCase } = useController();
  const navigate = useNavigate();

  // Would be an async function that calls controller
  function getBasicInfo() {
    const { result, error } = getBasicInfoUseCase();
    setError(error);
    setBasicInfo(result);
  }

  function getAccounts() {
    const { result, error } = getAccountsUseCase();
    setError(error);
    setAccounts(result);
  }

  function toggleTransactionVisiblity() {
    if (transactionVisiblity === "hidden") {
      setTransactionVisiblity("");
    } else {
      setTransactionVisiblity("hidden");
    }
  }

  function getArrow() {
    if (transactionVisiblity === "hidden") {
      return downArrow;
    } else {
      return upArrow;
    }
  }

  function navigateToPage(page = "/") {
    navigate(page);
  }

  return {
    transactionVisiblity,
    toggleTransactionVisiblity,
    basicInfo,
    getBasicInfo,
    accounts,
    getAccounts,
    navigateToPage,
    getArrow,
  };
}
