import { useState } from "react";
import { useNavigate } from "react-router-dom";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";
import AccountsController from "../../../Controllers/accountsController";

export default function AccountViewModel() {
  const [error, setError] = useState("");
  const [basicInfo, setBasicInfo] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [transactionVisiblity, setTransactionVisiblity] = useState("hidden");

  const navigate = useNavigate();

  const { getAccountsUseCase, createAccountsUseCase } = AccountsController();

  function navigateToPage(page = "/") {
    navigate(page);
  }

  function getCurrentDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
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

  // Would be an async function that calls controller
  function getBasicInfo() {
    setBasicInfo([
      { id: 1, key: "First Name", value: "Bob" },
      { id: 2, key: "Last Name", value: "Bobs" },
      { id: 3, key: "Email", value: "Bob@gmail.com" },
      { id: 4, key: "Member Since", value: "Apr 19, 2017" },
    ]);
  }

  async function getAccounts(userId) {
    const result = await getAccountsUseCase(userId);
    setAccounts(result);
  }

  async function createAccount(userId = 1, name) {
    await createAccountsUseCase(userId, name);
    const result = await getAccountsUseCase(userId);
    setAccounts(result);
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
