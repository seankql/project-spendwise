import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Button from "../../Components/Button";
import SummaryCard from "../../Components/SummaryCard";
import TransactionListTable from "../../Components/TransactionListTable";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import AccountSelect from "../../Components/AccountSelect";
import pieChart from "../../../Media/dashboard-pie-chart.png";
import greenChart from "../../../Media/green-bar-graph.png";
import redChart from "../../../Media/red-bar-graph.png";
import "../../Styles/Common.css";
import "../../Styles/Dashboard.css";
import "../../Styles/Main.css";

export default function Dashboard() {
  const {
    navigateToPage,
    accounts,
    getAccounts,
    transactions,
    getReports,
    getAccountReports,
    selectedAccount,
    setSelectedAccount,
  } = useViewModel();

  // TODO move to viewmodel
  const sectionList = [
    "Summary",
    "Recent Transactions",
    "Income VS Expenditure",
    "Category Chart",
  ];

  const mockIncomeData = [{ category: "Income", amount: 2000 }];
  const mockExpenseData = [
    { category: "Food", amount: 150 },
    { category: "Housing", amount: 1000 },
    { category: "Transportation", amount: 30 },
  ];

  useEffect(() => {
    getAccounts(1);
    if (!selectedAccount) {
      getReports(1);
    } else {
      getAccountReports(selectedAccount);
    }
  }, [selectedAccount]);

  return (
    <div className="body-wrapper">
      <Banner />
      <ScrollBanner data={sectionList} />
      <div className="page-content-container">
        <div className="page-header-text">Dashboard</div>
        <div className="section-wrapper page-row-container">
          <div id="Summary" className="section-header-text">
            Summary
          </div>
          <div className="row-right-element">
            <AccountSelect data={accounts} set={setSelectedAccount} />
          </div>
        </div>
        <div className="section-wrapper page-row-container section-divider">
          <SummaryCard
            title="This Month's Income"
            aggregatedData="$1,501.62"
            data={mockIncomeData}
          />
          <div className="row-right-element">
            <SummaryCard
              title="This Month's Spending"
              aggregatedData="$896.21"
              data={mockExpenseData}
            />
          </div>
        </div>
        <div className="section-divider">
          <div className="section-wrapper page-row-container">
            <div id="Recent Transactions" className="section-header-text">
              Recent Transactions
            </div>
            <Button
              title={"See all transactions"}
              classes="btn btn-sml banner-link-component-container row-right-element"
              onClick={() => {
                navigateToPage("/transactions");
              }}
            />
          </div>
          <TransactionListTable data={transactions} limit={6} />
          <div className="transaction-list-footer">
            See transactions page for all transactions
          </div>
        </div>
        <div className="section-wrapper page-row-container">
          <div className="section-header-text">Highlights</div>
        </div>
        <div
          id="Income VS Expenditure"
          className="section-wrapper section-subheader-text"
        >
          Income VS Expenditure
        </div>
        <div className="page-row-container section-divider">
          <img className="sml-graph-img-wrapper" src={greenChart} alt="logo" />
          <img
            className="sml-graph-img-wrapper row-right-element"
            src={redChart}
            alt="logo"
          />
        </div>
        <div
          id="Category Chart"
          className="section-wrapper section-subheader-text"
        >
          Category Chart
        </div>
        <img className="section-divider" src={pieChart} alt="logo" />
      </div>
      <footer />
    </div>
  );
}
