import React, { useState } from "react";
import "../Styles/Components.css";
import "../Styles/Common.css";
import edit from "../../Media/edit.png";
import del from "../../Media/delete.png";
import cancel from "../../Media/cancel.png";
import confirm from "../../Media/confirmation.png";

export default function List({
  data = null,
  editSubmit = null,
  deleteFunction,
}) {
  const [editState, setEditState] = useState(false);
  const [name, setName] = useState(null);
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(false);

  function isDateFormat(str) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex pattern for "YYYY-MM-DD"
    if (!dateRegex.test(str)) return false; // Test if string matches the pattern
    var d = new Date(str);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === str;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isDateFormat(date)) {
      setError(true);
      return;
    }
    editSubmit(name, category, amount, date, data.id, data.AccountId);
    changeEditState();
  };

  const changeEditState = () => {
    if (!editState) {
      setName(data?.descriptions);
      setDate(data?.transactionDate);
      setCategory(data?.category);
      setAmount(data?.amount);
      setEditState(true);
    } else {
      setEditState(false);
      setError(false);
    }
  };

  const getEntry = (
    id,
    transactionDate,
    transactionName,
    transactionCategory,
    transactionAmount
  ) => {
    if (!editState) {
      return (
        <div key={id} className="grid-table-grid">
          <div className="grid-container">
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">Date: </div>
              <div className="list-transaction-font row-right-element overflow">
                {transactionDate}
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">Name:</div>
              <div className="list-transaction-font row-right-element overflow">
                {transactionName}
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">Category:</div>
              <div className="list-transaction-font row-right-element overflow">
                {transactionCategory}
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">amount:</div>
              <div className="list-transaction-font row-right-element overflow">
                {transactionAmount}
              </div>
            </div>
            <div className="grid-button-wrapper">
              <div className="page-row-container">
                <button
                  className="icon-button-wrapper"
                  onClick={() => deleteFunction(data.id)}
                >
                  <img
                    src={del}
                    className="list-transaction-icon"
                    alt="delete"
                  />
                </button>
                <button
                  className="icon-button-wrapper"
                  onClick={() => changeEditState()}
                >
                  <img
                    src={edit}
                    className="list-transaction-icon"
                    alt="edit"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <form onSubmit={handleSubmit} key={id} className="grid-table-grid">
          <div className="grid-container">
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">Date:</div>
              <div className="list-transaction-font row-right-element grid-seal-wrapper">
                <input
                  className="list-transaction-font grid-input-container"
                  type="text"
                  value={date}
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
                {!error ? (
                  ""
                ) : (
                  <div className="error-message">Invalid date</div>
                )}
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">Name:</div>
              <div className="list-transaction-font row-right-element grid-seal-wrapper">
                <input
                  className="list-transaction-font grid-input-container"
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">Category:</div>
              <div className="list-transaction-font row-right-element grid-seal-wrapper">
                <select
                  className="list-transaction-font grid-input-container"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={"Bank Fees"}> Bank Fees </option>
                  <option value={"Cash Advance"}> Cash Advance </option>
                  <option value={"Community"}> Community </option>
                  <option value={"Food and Drink"}> Food and Drink </option>
                  <option value={"Healthcare"}> Healthcare </option>
                  <option value={"Interest"}> Interest </option>
                  <option value={"Payment"}> Payment </option>
                  <option value={"Recreation"}> Recreation </option>
                  <option value={"Service"}> Service </option>
                  <option value={"Shops"}> Shops </option>
                  <option value={"Tax"}> Tax </option>
                  <option value={"Transfer"}> Transfer </option>
                  <option value={"Travel"}> Travel </option>
                </select>
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">amount:</div>
              <div className="list-transaction-font row-right-element grid-seal-wrapper">
                <input
                  className="list-transaction-font grid-input-container"
                  type="number"
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="grid-button-wrapper">
              <div className="page-row-container">
                <button type="submit" className="icon-button-wrapper">
                  <img
                    src={confirm}
                    className="list-transaction-icon"
                    alt="confirm"
                  />
                </button>
                <button
                  type="button"
                  className="icon-button-wrapper"
                  onClick={() => changeEditState()}
                >
                  <img
                    src={cancel}
                    className="list-transaction-icon"
                    alt="cancel"
                  />
                </button>
                <button
                  type="button"
                  className="icon-button-wrapper"
                  onClick={() => changeEditState()}
                >
                  <img
                    src={edit}
                    className="list-transaction-icon"
                    alt="edit"
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    }
  };

  return getEntry(
    data.id,
    data.transactionDate,
    data.descriptions,
    data.category,
    data.amount
  );
}
