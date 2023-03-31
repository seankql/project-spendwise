import "../Styles/Components.css";
import "../Styles/Common.css";
import { useNavigate } from "react-router-dom";
export default function List() {
  const navigate = useNavigate();

  return (
    <div
      className="footer-link"
      onClick={() => {
        navigate("/credits");
      }}
    >
      Credits
    </div>
  );
}
