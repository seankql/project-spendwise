import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountsController from "../../../Controllers/accountsController";

export default function VisualizationViewModel() {
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState(null);

  const navigate = useNavigate();

  function navigateToPage(page = "/") {
    navigate(page);
  }

  const { getAccountsUseCase } = AccountsController();

  async function getAccounts(userId) {
    const result = await getAccountsUseCase(userId);
    setAccounts(result);
  }

  return {
    error,
    accounts,
    getAccounts,
    navigateToPage,
  };
}
