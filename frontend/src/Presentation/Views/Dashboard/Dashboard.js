import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Button from "../../Components/Button";
import SummaryCard from "../../Components/SummaryCard";
import TransactionListTable from "../../Components/TransactionListTable";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import AccountSelect from "../../Components/AccountSelect";
import ExpenditureGraph from "../../Components//Graphs/ExpenditureGraph";
import IncomeGraph from "../../Components/Graphs/IncomeGraph";
import CategoryGraph from "../../Components//Graphs/CategoryGraph";
import "../../Styles/Common.css";
import "../../Styles/Dashboard.css";
import "../../Styles/Main.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  const {
    getCurrentDate,
    getDefaultStartDate,
    accounts,
    categoryData,
    transactions,
    selectedAccount,
    setSelectedAccount,
    navigateToPage,
    fetchData,
  } = useViewModel();

  // TODO move to viewmodel
  const sectionList = [
    "Summary",
    "Recent Transactions",
    "Income VS Expenditure",
    "Category Chart",
  ];

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    if (user && isAuthenticated && !isLoading) {
      getAccessTokenSilently({
        authorizationParams: {
          audience: "https://api.swx.cscc09.rocks",
        },
      }).then((token) => {
        fetchData(user, token);
      });
    }
  }, [user, isAuthenticated, isLoading, selectedAccount]);

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
            isIncome={true}
            aggregatedData={transactions?.income}
            data={categoryData}
          />
          <div className="row-right-element">
            <SummaryCard
              title="This Month's Spending"
              aggregatedData={transactions?.expense}
              data={categoryData}
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
          <div className="graph-padder sml-graph-img-wrapper">
            <IncomeGraph
              data={transactions?.transactions}
              startDate={getDefaultStartDate()}
              endDate={getCurrentDate()}
            />
          </div>
          <div className="graph-padder sml-graph-img-wrapper row-right-element">
            <ExpenditureGraph
              data={transactions?.transactions}
              startDate={getDefaultStartDate()}
              endDate={getCurrentDate()}
            />
          </div>
        </div>
        <div
          id="Category Chart"
          className="section-wrapper section-subheader-text"
        >
          Category Chart
        </div>
        <div className="graph-padder bottom-elem-padder">
          <CategoryGraph data={transactions?.transactions} />
        </div>
      </div>
      <footer />
    </div>
  );
}
