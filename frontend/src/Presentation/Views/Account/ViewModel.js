import { useState } from "react";
import { useNavigate } from "react-router-dom";
import downArrow from "../../../Media/arrowDown.svg";
import upArrow from "../../../Media/arrowUp.svg";
import AccountsController from "../../../Controllers/accountsController";
import UserController from "../../../Controllers/userController";
import PlaidController from "../../../Controllers/plaidController";

export default function AccountViewModel() {
  const [error, setError] = useState("");
  const [hasLinkedPlaid, setHasLinkedPlaid] = useState(true);
  const [userId, setUserId] = useState(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [accounts, setAccounts] = useState(null);
  const [transactionVisiblity, setTransactionVisiblity] = useState("hidden");
  const [linkToken, setLinkToken] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);

  const navigate = useNavigate();

  const {
    getAccountsUseCase,
    createAccountsUseCase,
    updateAccountsUseCase,
    deleteAccountsUseCase,
  } = AccountsController();

  const {
    getPlaidLinkTokenUseCase,
    exchangePlaidTokenUseCase,
    getPlaidLinkedStatusUseCase,
  } = PlaidController();

  const { getUserUseCase } = UserController();

  function navigateToPage(page = "/") {
    navigate(page);
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

  function setProfileData(user) {
    setDateCreated(user.updated_at);
    setNickname(user.nickname);
    setEmail(user.name);
  }

  async function getAccounts(uId = userId, token = bearerToken) {
    const result = await getAccountsUseCase(uId, token);
    setAccounts(result);
  }

  async function createAccount(name, token = bearerToken) {
    await createAccountsUseCase(userId, name, token);
    const result = await getAccountsUseCase(userId, token);
    setAccounts(result);
  }

  async function updateAccount(name, accountId, token = bearerToken) {
    await updateAccountsUseCase(userId, name, accountId, token);
    const result = await getAccountsUseCase(userId, token);
    setAccounts(result);
  }

  async function deleteAccount(accountId, token = bearerToken) {
    await deleteAccountsUseCase(accountId, token);
    const result = await getAccountsUseCase(userId, token);
    setAccounts(result);
  }

  async function getPlaidLinkToken(userId, token = bearerToken) {
    const result = await getPlaidLinkTokenUseCase(userId, token);
    setLinkToken(result.link_token);
  }

  async function exchangeAndSync(publicToken, token = bearerToken) {
    await exchangePlaidTokenUseCase(userId, publicToken, token);
  }

  async function getPlaidLinkedStatus(userId, token = bearerToken) {
    const result = await getPlaidLinkedStatusUseCase(userId, token);
    setHasLinkedPlaid(result.status === 200);
  }

  async function fetchData(user, token) {
    if (!user) return;
    setProfileData(user);
    setBearerToken(token);
    const result = await getUserUseCase(user.sub.split("|")[1], token);
    const resultJson = await result.json();
    const userId = resultJson.id;

    setUserId(userId);
    getAccounts(userId, token);
    getPlaidLinkToken(userId, token);
    getPlaidLinkedStatus(userId, token);
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
    linkToken,
    exchangeAndSync,
    hasLinkedPlaid,
    setHasLinkedPlaid,
  };
}
