import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import ProfileCard from "../../Components/ProfileCard";
import AlertCard from "../../Components/AlertCard";
import AccountCardGenerator from "../../Components/AccountCardGenerator";
import AccountForm from "../../Components/AccountForm";
import { usePlaidLink } from "react-plaid-link";
import "../../Styles/Common.css";
import "../../Styles/Account.css";
import "../../Styles/Main.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Account() {
  const {
    email,
    dateCreated,
    nickname,
    getArrow,
    accounts,
    getAccounts,
    transactionVisiblity,
    toggleTransactionVisiblity,
    createAccount,
    updateAccount,
    deleteAccount,
    fetchData,
    linkToken,
    exchangeAndSync,
    hasLinkedPlaid,
    setHasLinkedPlaid,
  } = useViewModel();

  const sectionList = ["Profile & Alerts", "Accounts", "Create New Account"];

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      exchangeAndSync((public_token = public_token));
      setHasLinkedPlaid(true);
    },
  });

  useEffect(() => {
    if (user && isAuthenticated && !isLoading) {
      getAccessTokenSilently({
        authorizationParams: {
          audience: "https://api.sw.cscc09.rocks:3001",
        },
      }).then((token) => {
        fetchData(user, token);
      });
    }
  }, [user, isAuthenticated, isLoading]);

  return (
    <div className="body-wrapper">
      <Banner />
      <ScrollBanner data={sectionList} />
      <div className="page-content-container">
        <div className="page-header-text width-padder">
          Account & Settings
          <div
            id="Profile & Alerts"
            className="section-wrapper section-header-text"
          >
            Profile & Alerts
          </div>
          <div className="section-wrapper page-row-container section-divider">
            <ProfileCard
              email={email}
              nickname={nickname}
              dateCreated={dateCreated}
              classes={"basic-info-card"}
            />
            <div className="page-col-container row-right-element">
              <div className="section-wrapper ">
                {hasLinkedPlaid ? (
                  ""
                ) : (
                  <button
                    type="button"
                    onClick={() => open()}
                    disabled={!ready}
                    className={"btn btn-sml account-btns-left"}
                  >
                    Connect a bank account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="Accounts" className="section-wrapper section-header-text">
          {" "}
          Accounts{" "}
        </div>
        <AccountCardGenerator
          data={accounts}
          editSubmit={updateAccount}
          deleteFunction={deleteAccount}
        />
        <div className="section-divider">
          <div
            id="Create New Account"
            className="section-wrapper page-row-container section-header-text"
          >
            Create New Account
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
          <div
            className={
              "section-wrapper page-row-container bottom-elem-padder " +
              transactionVisiblity
            }
          >
            <AccountForm submit={createAccount} />
          </div>
        </div>
      </div>
      <footer />
    </div>
  );
}
