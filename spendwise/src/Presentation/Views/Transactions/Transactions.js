import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Button from "../../Components/Button";
import logo from "../../../Media/logo-no-background.png";
import TransactionViewToggle from "../../Components/TransactionViewToggle";
import TransactionListTable from "../../Components/TransactionListTable";
import ListScroller from "../../Components/ListScroller";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import FormCard from "../../Components/FormCard";
import Dropdown from "../../Components/Dropdown";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Transactions.css";

export default function Transactions() {
  const { navigateToPage, getArrow,
    transactionVisiblity, toggleTransactionVisiblity,
    accounts, getAccounts
  } = useViewModel();

  const transactionKeys = [
    { id: 1, key: "Name" },
    { id: 2, key: "Amount" },
    { id: 3, key: "Category" },
    { id: 4, key: "Description" }
  ];

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
        <div className="page-header-text page-row-container">
          Transactions
          <div className="row-right-element">
            <Dropdown
              name="account-select"
              title="select account"
              list={accounts}
              onChange={onChange}
            />
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
          <FormCard
            data={transactionKeys}
            title={"Add Transaction"}
            classes={"create-form-card " + transactionVisiblity}
          />
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
