import "../Styles/Components.css";
import "../Styles/Common.css";
import Button from "./Button";
import logo from "../../Media/logo-no-background.png";
import { useNavigate } from "react-router-dom";
import SignoutButton from "./SignoutButton";
import AuthenticatedUser from "./AuthenticatedUser";

export default function List() {
  const navigate = useNavigate();

  return (
    <div className="banner">
      <div className="banner-wrapper">
        <img className="banner-img-container" src={logo} alt="logo" />
        <div className="links-container">
          <Button
            title={"Dashboard"}
            classes="btn btn-sml banner-link-component-container"
            onClick={() => {
              navigate("/dashboard");
            }}
          />
          <Button
            title={"Transactions"}
            classes="btn btn-sml banner-link-component-container"
            onClick={() => {
              navigate("/transactions");
            }}
          />
          <Button
            title={"Visualization"}
            classes="btn btn-sml banner-link-component-container"
            onClick={() => {
              navigate("/visualization");
            }}
          />
          <Button
            title={"Account"}
            classes="btn btn-sml banner-link-component-container"
            onClick={() => {
              navigate("/account");
            }}
          />
        </div>
        <AuthenticatedUser />
        <div className="auth-container">
          <SignoutButton />
        </div>
      </div>
    </div>
  );
}
