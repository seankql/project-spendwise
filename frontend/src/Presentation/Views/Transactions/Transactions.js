import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import TransactionViewToggle from "../../Components/TransactionViewToggle";
import TransactionListTable from "../../Components/TransactionListTable";
import TransactionForm from "../../Components/TransactionForm"
import ListScroller from "../../Components/ListScroller";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Transactions.css";

export default function Transactions() {
  const { getArrow,
    transactionVisiblity, toggleTransactionVisiblity,
    accounts, getAccounts
  } = useViewModel();

  const mockTransactions = [
    { id: 1, date: "Feb 28 2023", name: "Starbucks - Coffee", category: "Fast Food", amount: "$5.79" },
    { id: 2, date: "Feb 25 2023", name: "Starbucks - Coffee", category: "Fast Food", amount: "$5.79" },
    { id: 3, date: "Feb 23 2023", name: "Panam - Parking", category: "Parking and Transport", amount: "$8.50" },
    { id: 4, date: "Feb 23 2023", name: "Starbucks - Coffee", category: "Fast Food", amount: "$5.79" },
  ];

  // Perform some sort of action
  const onChange = (item, name) => { };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div>
      <Banner/>
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
            <button className="drop-down-btn" onClick={() => toggleTransactionVisiblity()}>
              <img
                className="row-right-element"
                src={getArrow()}
                alt="downArrow"
              ></img>
            </button>
          </div>
          <TransactionForm classes={transactionVisiblity}/>
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
            <TransactionListTable data={mockTransactions} />
            <ListScroller />
          </div>
        </div>
      </div>
    </div>
  );
}
