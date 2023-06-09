import React, { useState } from "react";
import "../Styles/Components.css";
import TransactionViewToggle from "./TransactionViewToggle";
import TransactionListTable from "./TransactionListTable";
import TransactionGridTable from "./TransactionGridTable";
import ListScroller from "./ListScroller";

export default function List({
  transactions,
  page,
  inc,
  dec,
  editSubmit,
  deleteFunction,
}) {
  const [view, setView] = useState("list");

  const getTransactionView = () => {
    if (view === "list") {
      return (
        <TransactionListTable
          data={transactions}
          editSubmit={editSubmit}
          deleteFunction={deleteFunction}
        />
      );
    } else {
      return (
        <TransactionGridTable
          data={transactions}
          editSubmit={editSubmit}
          deleteFunction={deleteFunction}
        />
      );
    }
  };

  return (
    <div className="transactions-col">
      <div className="page-row-container">
        <div className="section-header-text">Transaction List</div>
        <div className="row-right-element">
          <TransactionViewToggle toggleFunc={setView} />
        </div>
      </div>
      {getTransactionView()}
      <ListScroller
        count={transactions?.totalCount}
        page={page}
        inc={inc}
        dec={dec}
      />
    </div>
  );
}
