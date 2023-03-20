import React, { useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import AccountCard from "./AccountCard.js";
import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";

export default function List({
  data = null,
  editSubmit,
  deleteFunction,
  linkToken,
  successFunction,
}) {
  const [editState, setEditState] = useState(false);
  const [name, setName] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    editSubmit(name, data.id);
    changeEditState();
  };

  const changeEditState = () => {
    if (!editState) {
      setName(data?.accountName);
      setEditState(true);
    } else {
      setEditState(false);
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      successFunction(public_token);
    },
  });

  const createAccountCardForm = (accountData) => {
    if (!editState) {
      return (
        <div>
          <div className="section-wrapper page-row-container">
            <AccountCard
              data={accountData}
              title={"Account information"}
              classes={"create-form-card"}
            />
          </div>
          <div className="section-wrapper section-divider page-row-container">
            <button
              type="button"
              onClick={() => changeEditState()}
              className={"btn btn-sml account-btns-left"}
            >
              Edit Account
            </button>
            <button
              type="button"
              onClick={() => deleteFunction(accountData.id)}
              className={"btn btn-sml account-btns-left"}
            >
              Delete Account
            </button>
            <button
              type="button"
              onClick={() => open()}
              disabled={!ready}
              className={"btn btn-sml account-btns-left"}
            >
              Connect a bank account
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <form onSubmit={handleSubmit}>
          <div className="section-wrapper page-row-container">
            <div className={"card-wrapper create-form-card"}>
              <div className="page-row-container">
                <div className="card-padding-wrapper component-header-text">
                  Account information
                </div>
              </div>
              <div className="card-wrapper-2 page-row-container">
                <div className="card-sml-padding-wrapper component-subheader-text">
                  Account Name
                </div>
                <input
                  className="transaction-col-container list-transaction-font"
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="section-wrapper section-divider page-row-container">
            <button
              type="button"
              onClick={() => changeEditState()}
              className={"btn btn-sml account-btns-left"}
            >
              Cancel
            </button>
            <button type="submit" className={"btn btn-sml account-btns-left"}>
              Confirm
            </button>
          </div>
        </form>
      );
    }
  };

  return createAccountCardForm(data);
}
