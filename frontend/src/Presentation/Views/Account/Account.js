import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
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
  } = useViewModel();

  // TODO: add functionality to Create New Account
  // TODO: Show different "Bank Information" form depending on whether or not
  // User has linked it to a bank account or not. If not, users should be prompted
  // to link their account to a bank account, otherwise, just show the current
  // information and have an option to unlink

  const accountCreateKeys = [{ id: 1, key: "Name" }];

  const BankLinkKeys = [
    { id: 1, key: "Bank Info" },
    { id: 2, key: "or something" },
  ];

  useEffect(() => {
    getBasicInfo();
    getAccounts(1);
  }, []);

  return (
    <div>
      <Banner />
      <div className="page-content-container">
        <div className="page-header-text">
          Account & Settings
          <div className="section-wrapper section-header-text">
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
        <div className="section-wrapper section-header-text"> Accounts </div>
        <AccountCardGenerator data={accounts} />
        <div className="section-divider">
          <div className="section-wrapper page-row-container section-header-text">
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
            <AccountForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
