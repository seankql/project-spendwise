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
      alert("invalid date string");
      return;
    }
    if (parseFloat(amount) !== amount) {
      alert("invalid amount");
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
              <div className="component-subheader-text">Date:</div>
              <div className="list-transaction-font row-right-element">
                {transactionDate}
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">Name:</div>
              <div className="list-transaction-font row-right-element">
                {transactionName}
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">Category:</div>
              <div className="list-transaction-font row-right-element">
                {transactionCategory}
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">amount:</div>
              <div className="list-transaction-font row-right-element">
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
                <input
                  className="list-transaction-font grid-input-container"
                  type="text"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="grid-inner-divider page-row-container">
              <div className="component-subheader-text">amount:</div>
              <div className="list-transaction-font row-right-element grid-seal-wrapper">
                <input
                  className="list-transaction-font grid-input-container"
                  type="text"
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
