import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import TransactionForm from "../../Components/TransactionForm";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import AccountSelect from "../../Components/AccountSelect";
import TransactionViewBox from "../../Components/TransactionViewBox";
import FooterLink from "../../Components/FooterLink";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Transactions.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Transactions() {
  const {
    getArrow,
    transactionVisiblity,
    toggleTransactionVisiblity,
    accounts,
    transactions,
    page,
    incrementPage,
    decrementPage,
    selectedAccount,
    setSelectedAccountFunction,
    createTransaction,
    getCreateTransactionVisibility,
    setFilters,
    updateTransaction,
    deleteTransaction,
    name,
    startDate,
    endDate,
    minValue,
    maxValue,
    categories,
    fetchData,
  } = useViewModel();

  const sectionList = selectedAccount
    ? ["Add Transaction", "View Transactions"]
    : ["View Transactions"];

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
  }, [
    user,
    isAuthenticated,
    isLoading,
    isAuthenticated,
    isLoading,
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
            <AccountSelect data={accounts} set={setSelectedAccountFunction} />
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
          className="section-wrapper page-row-container bottom-elem-padder"
        >
          <SearchFilterSideBar setFilters={setFilters} />
          <TransactionViewBox
            transactions={transactions}
            page={page}
            inc={incrementPage}
            dec={decrementPage}
            editSubmit={updateTransaction}
            deleteFunction={deleteTransaction}
          />
        </div>
      </div>
      <footer>
        <FooterLink />
      </footer>
    </div>
  );
}
