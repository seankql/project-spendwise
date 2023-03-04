import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import TransactionViewToggle from "../../Components/TransactionViewToggle";
import TransactionListTable from "../../Components/TransactionListTable";
import TransactionForm from "../../Components/TransactionForm";
import ListScroller from "../../Components/ListScroller";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Transactions.css";

export default function Transactions() {
  const {
    getArrow,
    transactionVisiblity,
    toggleTransactionVisiblity,
    accounts,
    transactions,
    getTransactions,
    getAccounts,
  } = useViewModel();

  // Perform some sort of action
  const onChange = (item, name) => {};

  useEffect(() => {
    getAccounts();
    getTransactions(1, 0, 16);
  }, []);

  return (
    <div>
      <Banner />
      <div className="page-content-container">
        <div className="page-header-text page-row-container">
          Transactions
          <div className="row-right-element">
            <select>
              <option value={"All Accounts"}> All Accounts </option>
              <option value={"RBC"}> RBC </option>
              <option value={"TD"}> TD </option>
              <option value={"CIBC"}> CIBC </option>
            </select>
          </div>
        </div>
        <div className="section-divider">
          <div className="section-wrapper page-row-container section-header-text">
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
          <TransactionForm classes={transactionVisiblity} />
        </div>
        <div className="section-wrapper page-row-container">
          <SearchFilterSideBar />
          <div className="transactions-col">
            <div className="page-row-container">
              <div className="section-header-text">Transaction List</div>
              <div className="row-right-element">
                <TransactionViewToggle />
              </div>
            </div>
            <TransactionListTable data={transactions} />
            <ListScroller />
          </div>
        </div>
      </div>
    </div>
  );
}
