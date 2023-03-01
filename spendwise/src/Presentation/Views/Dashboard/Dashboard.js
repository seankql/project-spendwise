import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Button from "../../Components/Button";
import Dropdown from "../../Components/Dropdown";
import logo from "../../../Media/logo-no-background.png";
import "../../Styles/Common.css";
import "../../Styles/Dashboard.css";
import "../../Styles/Main.css";

export default function Dashboard() {
  const { navigateToPage, username, getUsername } = useViewModel();

  // Perform some sort of action
  const onChange = (item, name) => {
  }

  // Mock data
  const accounts = [
    {
      label: 'All accounts',
      value: 'all',
    },
    {
      label: 'TD - 1008531024',
      value: 'TD - 1008531024',
    },
    {
      label: 'RBC - 1001867295',
      value: 'RBC - 1001867295',
    },
    {
      label: 'CIBC - 1009671296',
      value: 'CIBC - 1009671296',
    }
  ];

  useEffect(() => {
    getUsername();
  }, [getUsername]);

  return (
    <div>
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
              title={"Account"}
              classes="btn btn-sml banner-link-component-container"
              onClick={() => {
                navigateToPage("/account");
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
      <div className="page-content-container">
        <div className="page-row-container">
          <div className="section-header-text">
            Dashboard
          </div>
          <div className="row-right-element">
            <Dropdown
              name="account-select"
              title="select account"
              list={accounts}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
