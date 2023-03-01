import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Button from "../../Components/Button";
import logo from "../../../Media/logo-no-background.png";
import "../../Styles/Common.css";
import "../../Styles/Main.css";

export default function Dashboard() {
  const { navigateToPage, username, getUsername } = useViewModel();

  useEffect(() => {
    getUsername();
  }, [getUsername]);

  return (
    <div className="banner">
      <div className="banner-wrapper">
        <img className="banner-img-container" src={logo} alt="logo" />
        <div className="links-container">
          <Button
            title={"Dashboard"}
            classes="btn btn-sml banner-link-component-container"
            onClick={() => {
              navigateToPage("/dashboard");
            }}
          />
          <Button
            title={"Transactions"}
            classes="btn btn-sml banner-link-component-container"
            onClick={() => {
              navigateToPage("/transactions");
            }}
          />
          <Button
            title={"Visualization"}
            classes="btn btn-sml banner-link-component-container"
            onClick={() => {
              navigateToPage("/visualization");
            }}
          />
          <Button
            title={"Profile"}
            classes="btn btn-sml banner-link-component-container"
            onClick={() => {
              navigateToPage("/profile");
            }}
          />
        </div>
        <div className="auth-container">
          <Button
            title={"Sign Out"}
            classes="btn btn-sml banner-auth-component-container"
            onClick={() => {
              navigateToPage("/");
            }}
          />
        </div>
      </div>
    </div>
  );
}
