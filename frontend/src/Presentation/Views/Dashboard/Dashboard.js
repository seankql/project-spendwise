import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Button from "../../Components/Button";
import Dropdown from "../../Components/Dropdown";
import SummaryCard from "../../Components/SummaryCard";
import TransactionListTable from "../../Components/TransactionListTable";
import Banner from "../../Components/Banner";
import pieChart from "../../../Media/dashboard-pie-chart.png";
import greenChart from "../../../Media/green-bar-graph.png";
import redChart from "../../../Media/red-bar-graph.png";
import "../../Styles/Common.css";
import "../../Styles/Dashboard.css";
import "../../Styles/Main.css";

// TODO: Add subbanner under the main banner with scrollable buttons that
// take users to different sections of the dashboard.

export default function Dashboard() {
  const { navigateToPage, username, getUsername, accounts, getAccounts } =
    useViewModel();

  // Perform some sort of action
  const onChange = (item, name) => { };

  const mockTransactions = [
    { id: 1, date: "Feb 28 2023", name: "Starbucks - Coffee", category: "Fast Food", amount: "$5.79" },
    { id: 2, date: "Feb 25 2023", name: "Starbucks - Coffee", category: "Fast Food", amount: "$5.79" },
    { id: 3, date: "Feb 23 2023", name: "Panam - Parking", category: "Parking and Transport", amount: "$8.50" },
    { id: 4, date: "Feb 23 2023", name: "Starbucks - Coffee", category: "Fast Food", amount: "$5.79" },
  ];

  useEffect(() => {
    getUsername();
    getAccounts();
  }, []);

  return (
    <div>
      <Banner/>
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
        <div className="section-divider">
          <div className="section-wrapper page-row-container">
            <div className="section-header-text">Recent Transactions</div>
            <Button
              title={"See all transactions"}
              classes="btn btn-sml banner-link-component-container row-right-element"
              onClick={() => {
                navigateToPage("/transactions");
              }}
            />
          </div>
          <div className="section-divider">
            <TransactionListTable data={mockTransactions} />
            <div className="transaction-list-footer">
              See transactions page for all transactions
            </div>
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
      </div>
    </div>
  );
}
