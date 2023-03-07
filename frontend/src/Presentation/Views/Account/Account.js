import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import InfoCard from "../../Components/InfoCard";
import AlertCard from "../../Components/AlertCard";
import AccountCardGenerator from "../../Components/AccountCardGenerator";
import AccountForm from "../../Components/AccountForm";
import "../../Styles/Common.css";
import "../../Styles/Account.css";
import "../../Styles/Main.css";

export default function Account() {
  const {
    getArrow,
    basicInfo,
    getBasicInfo,
    accounts,
    getAccounts,
    transactionVisiblity,
    toggleTransactionVisiblity,
    createAccount,
  } = useViewModel();

  // TODO: Show different "Bank Information" form depending on whether or not
  // User has linked it to a bank account or not. If not, users should be prompted
  // to link their account to a bank account, otherwise, just show the current
  // information and have an option to unlink

  const sectionList = ["Profile & Alerts", "Accounts", "Create New Account"];

  useEffect(() => {
    getBasicInfo();
    getAccounts(1);
  }, []);

  return (
    <div className="body-wrapper">
      <Banner />
      <ScrollBanner data={sectionList} />
      <div className="page-content-container">
        <div className="page-header-text">
          Account & Settings
          <div
            id="Profile & Alerts"
            className="section-wrapper section-header-text"
          >
            Profile & Alerts
          </div>
          <div className="section-wrapper page-row-container section-divider">
            <InfoCard
              data={basicInfo}
              title={"Basic Information"}
              classes={"basic-info-card"}
            />
            <div className="page-col-container row-right-element">
              <AlertCard title={"Alerts"} classes={"alert-card "} />
            </div>
          </div>
        </div>
        <div id="Accounts" className="section-wrapper section-header-text">
          {" "}
          Accounts{" "}
        </div>
        <AccountCardGenerator data={accounts} />
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
              "section-wrapper page-row-container " + transactionVisiblity
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
