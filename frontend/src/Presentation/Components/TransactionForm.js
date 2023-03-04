import React, { useState } from "react";
import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";
import Button from "./Button";

export default function List({ classes = "", submit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Grocery");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(name, category, amount);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setCategory("Grocery");
    setAmount("");
    setDescription("");
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
            <option value={"Grocery"}> Grocery </option>
            <option value={"Furniture"}> Furniture </option>
            <option value={"Restaurants"}> Restaurants </option>
            <option value={"Gas"}> Gas </option>
          </select>
        </div>
        <div className="page-row-container">
          <label className="card-sml-padding-wrapper component-subheader-text">
            Amount
          </label>
          <input
            className="row-right-element account-create-input"
            type="text"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="page-row-container">
          <label className="card-sml-padding-wrapper component-subheader-text">
            Description
          </label>
          <textarea
            className="row-right-element account-create-input"
            type="text"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
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
