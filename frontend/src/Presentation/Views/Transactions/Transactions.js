import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import TransactionForm from "../../Components/TransactionForm";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import AccountSelect from "../../Components/AccountSelect";
import TransactionViewBox from "../../Components/TransactionViewBox";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Transactions.css";

export default function Transactions() {
  const {
    getArrow,
    transactionVisiblity,
    toggleTransactionVisiblity,
    accounts,
    getAccounts,
    transactions,
    page,
    incrementPage,
    decrementPage,
    selectedAccount,
    setSelectedAccount,
    createTransaction,
    getCreateTransactionVisibility,
    getFilterReports,
    setFilters,
    name,
    startDate,
    endDate,
    minValue,
    maxValue,
    categories,
  } = useViewModel();

  const sectionList = ["Add Transaction", "View Transactions"];

  useEffect(() => {
    getAccounts(1);
    getFilterReports(1, 9, page);
  }, [
    page,
    selectedAccount,
    name,
    startDate,
    endDate,
    minValue,
    maxValue,
    categories,
  ]);

  return (
    <div className="body-wrapper">
      <Banner />
      <ScrollBanner data={sectionList} />
      <div className="page-content-container">
        <div className="page-header-text page-row-container">
          Transactions
          <div className="row-right-element">
            <AccountSelect data={accounts} set={setSelectedAccount} />
          </div>
        </div>
        <div className={"section-divider " + getCreateTransactionVisibility()}>
          <div
            id="Add Transaction"
            className="section-wrapper page-row-container section-header-text"
          >
            Add transaction
            <button
              className="drop-down-btn"
              onClick={() => toggleTransactionVisiblity()}
            >
              <img
                className="row-right-element"
                src={getArrow()}
                alt="downArrow"
              ></img>
            </button>
          </div>
          <TransactionForm
            classes={transactionVisiblity}
            submit={createTransaction}
          />
        </div>
        <div
          id="View Transactions"
          className="section-wrapper page-row-container"
        >
          <SearchFilterSideBar setFilters={setFilters} />
          <TransactionViewBox
            transactions={transactions}
            page={page}
            inc={incrementPage}
            dec={decrementPage}
          />
        </div>
      </div>
      <footer />
    </div>
  );
}
