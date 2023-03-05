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

  const { getBasicInfoUseCase, getAccountsUseCase, postAccountUseCase } =
    useController();
  const navigate = useNavigate();

  function getCurrentDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Would be an async function that calls controller
  function getBasicInfo() {
    const { result, error } = getBasicInfoUseCase();
    setError(error);
    setBasicInfo(result);
  }

  async function getAccounts(userId) {
    const result = await getAccountsUseCase(userId);
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

  async function createAccount(name) {
    await postAccountUseCase(name, 1);
    const result = await getAccountsUseCase(1);
    setAccounts(result);
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
    createAccount,
  };
}
