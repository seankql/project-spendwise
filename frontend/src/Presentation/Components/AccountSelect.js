import React, { useState } from "react";
import "../Styles/Components.css";
import "../Styles/Common.css";

export default function List({ data, set }) {
  const [selectedAccount, setSelectedAccount] = useState("");

  const clickEvent = (value) => {
    setSelectedAccount(value);
    if (value === "") {
      set(null);
    } else {
      set(value);
    }
  };

  const createNewOption = (id, value) => {
    return (
      <option key={id} value={id}>
        {" "}
        {value}{" "}
      </option>
    );
  };

  const options = data?.map((item) =>
    createNewOption(item.id, item.accountName)
  );

  return (
    <select
      value={selectedAccount}
      onChange={(e) => clickEvent(e.target.value)}
    >
      <option value={""}> All Accounts </option>
      {options}
    </select>
  );
}
