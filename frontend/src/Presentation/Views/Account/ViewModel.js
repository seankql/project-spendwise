import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useController from "./Controller";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";
import { useAuth0 } from "@auth0/auth0-react";
import AccountsController from "../../../Controllers/accountsController";

export default function AccountViewModel() {
  const [error, setError] = useState("");
  const [basicInfo, setBasicInfo] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [transactionVisiblity, setTransactionVisiblity] = useState("hidden");

  const {
    getBasicInfoUseCase,
    getAccountsUseCase,
    postAccountUseCase,
    getUserId,
  } = useController();
  const navigate = useNavigate();

  const { user } = useAuth0();

  function getCurrentDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getUserId(user) {
    return user?.sub.split("|")[1];
  }

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
    await postAccountUseCase(name, getUserId(user));
    const result = await getAccountsUseCase(getUserId(user));
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
    getUserId,
  };
}
