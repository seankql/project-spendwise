import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useController from "./Controller";

export default function DashboardViewModel() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const { getUsernameUseCase } = useController();
  const navigate = useNavigate();

  // Would be an async function that calls controller
  function getUsername() {
    const { result, error } = getUsernameUseCase();
    setError(error);
    setUsername(result);
  }

  function navigateToHomepage() {
    navigate("/");
  }

  return {
    error,
    username,
    getUsername,
    navigateToHomepage,
  };
}
