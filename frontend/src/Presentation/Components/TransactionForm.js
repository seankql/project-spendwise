import React, { useState } from "react";
import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";
import Button from "./Button";

export default function List({ classes = "", submit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Bank Fees");
  const [amount, setAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(name, category, amount);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setCategory("Grocery");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={"card-wrapper create-form-card " + classes}
    >
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          Create Transaction
        </div>
      </div>
      <div className="card-wrapper-2 page-col-container">
        <div className="page-row-container">
          <label className="card-sml-padding-wrapper component-subheader-text">
            Name
          </label>
          <input
            className="row-right-element account-create-input"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="page-row-container">
          <label className="card-sml-padding-wrapper component-subheader-text">
            Categories
          </label>
          <select
            className="row-right-element account-create-input"
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
        <div className="page-row-container">
          <label className="card-sml-padding-wrapper component-subheader-text">
            Amount
          </label>
          <input
            className="row-right-element account-create-input"
            type="number"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="page-row-container btn-form-wrapper">
        <Button
          title={"Cancel"}
          classes={"btn btn-form"}
          onClick={() => clearForm()}
        />
        <Button
          type="submit"
          title={"Confirm"}
          classes={"btn btn-form confirm-btns"}
        />
      </div>
    </form>
  );
}
