import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useController from "./Controller";

export default function AccountViewModel() {
  const [error, setError] = useState("");
  const [basicInfo, setBasicInfo] = useState(null);
  const [accounts, setAccounts] = useState(null);

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

  function navigateToPage(page = "/") {
    navigate(page);
  }

  return {
    basicInfo,
    getBasicInfo,
    accounts,
    getAccounts,
    navigateToPage,
  };
}
