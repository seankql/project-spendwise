import { useNavigate } from "react-router-dom";

export default function HomepageViewModel() {
  const navigate = useNavigate();

  function navigateToPage(page = "/") {
    navigate(page);
  }

  return {
    navigateToPage,
  };
}
