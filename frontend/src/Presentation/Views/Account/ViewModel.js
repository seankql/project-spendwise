import { useState } from "react";
import { useNavigate } from "react-router-dom";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";
import { useAuth0 } from "@auth0/auth0-react";
import AccountsController from "../../../Controllers/accountsController";
import UserController from "../../../Controllers/userController";

export default function AccountViewModel() {
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [accounts, setAccounts] = useState(null);
  const [transactionVisiblity, setTransactionVisiblity] = useState("hidden");

  const navigate = useNavigate();

  const {
    getAccountsUseCase,
    createAccountsUseCase,
    updateAccountsUseCase,
    deleteAccountsUseCase,
  } = AccountsController();

  const { postUserUseCase, getUserUseCase } = UserController();

  function navigateToPage(page = "/") {
    navigate(page);
  }

  async function getAccounts(uId = userId) {
    const result = await getAccountsUseCase(uId);
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
    await createAccountsUseCase(userId, name);
    const result = await getAccountsUseCase(userId);
    setAccounts(result);
  }

  async function updateAccount(name, accountId) {
    await updateAccountsUseCase(userId, name, accountId);
    const result = await getAccountsUseCase(userId);
    setAccounts(result);
  }

  async function deleteAccount(accountId) {
    await deleteAccountsUseCase(accountId);
    const result = await getAccountsUseCase(userId);
    setAccounts(result);
  }

  function setProfileData(user) {
    setDateCreated(user.updated_at);
    setNickname(user.nickname);
    setEmail(user.name);
  }

  async function fetchData(user) {
    if (!user) return;
    setProfileData(user);
    const auth0User = user.sub.split("|")[1];
    const result = await getUserUseCase(auth0User);
    if (!result) return;
    const userId = result.id;

    setUserId(userId);
    getAccounts(userId);
  }

  return {
    email,
    dateCreated,
    nickname,
    transactionVisiblity,
    toggleTransactionVisiblity,
    accounts,
    getAccounts,
    navigateToPage,
    getArrow,
    createAccount,
    updateAccount,
    deleteAccount,
    fetchData,
  };
}
