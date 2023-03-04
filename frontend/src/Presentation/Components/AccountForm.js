import React, { useState } from "react";
import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";
import Button from "./Button";

export default function List() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setName("");
  };

  const clearForm = (event) => {
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className={"card-wrapper create-form-card"}>
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          Create Account
        </div>
      </div>
      <div className="card-wrapper-2 page-row-container">
        <label className="card-sml-padding-wrapper component-subheader-text">
          Account Name:
        </label>
        <input
          className="row-right-element account-create-input"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
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
