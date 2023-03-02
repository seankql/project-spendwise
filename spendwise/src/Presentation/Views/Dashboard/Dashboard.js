import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Button from "../../Components/Button";
import Dropdown from "../../Components/Dropdown";
import SummaryCard from "../../Components/SummaryCard";
import TransactionListTable from "../../Components/TransactionListTable";
import logo from "../../../Media/logo-no-background.png";
import pieChart from "../../../Media/dashboard-pie-chart.png";
import greenChart from "../../../Media/green-bar-graph.png";
import redChart from "../../../Media/red-bar-graph.png";
import "../../Styles/Common.css";
import "../../Styles/Dashboard.css";
import "../../Styles/Main.css";

export default function Dashboard() {
  const { navigateToPage, username, getUsername } = useViewModel();

  // Perform some sort of action
  const onChange = (item, name) => {};

  // Mock data
  const accounts = [
    {
      label: "All accounts",
      value: "all",
    },
    {
      label: "TD - 1008531024",
      value: "TD - 1008531024",
    },
    {
      label: "RBC - 1001867295",
      value: "RBC - 1001867295",
    },
    {
      label: "CIBC - 1009671296",
      value: "CIBC - 1009671296",
    },
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
        <div className="page-header-text">{username}'s Dashboard</div>
        <div className="section-wrapper page-row-container">
          <div className="section-header-text">Summary</div>
          <div className="row-right-element">
            <Dropdown
              name="account-select"
              title="select account"
              list={accounts}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="section-wrapper page-row-container section-divider">
          <SummaryCard title="This Month's Income" data="$1,501.62" />
          <div className="row-right-element">
            <SummaryCard title="This Month's Spending" data="$896.21" />
          </div>
        </div>
        <div className="section-wrapper page-row-container">
          <div className="section-header-text">Highlights</div>
        </div>
        <div className="section-wrapper section-subheader-text">
          Income Vs Expenditure
        </div>
        <div className="page-row-container section-divider">
          <img className="sml-graph-img-wrapper" src={greenChart} alt="logo" />
          <img
            className="sml-graph-img-wrapper row-right-element"
            src={redChart}
            alt="logo"
          />
        </div>
        <div className="section-wrapper section-subheader-text">
          Category Chart
        </div>
        <img className="section-divider" src={pieChart} alt="logo" />
        <div className="section-wrapper page-row-container">
          <div className="section-subheader-text">Recent Transactions</div>
          <Button
            title={"See all transactions"}
            classes="btn btn-sml banner-link-component-container row-right-element"
            onClick={() => {
              navigateToPage("/transactions");
            }}
          />
        </div>
        <div className="section-divider">
          <TransactionListTable />
        </div>
      </div>
    </div>
  );
}
