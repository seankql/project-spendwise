import { useNavigate } from "react-router-dom";

export default function HomepageViewModel() {
  const navigate = useNavigate();

  function navigateToDashboard() {
    navigate("/dashboard");
  }

  return {
    navigateToDashboard,
  };
}
