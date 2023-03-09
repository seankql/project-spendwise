import React, { useState } from "react";
import downArrow from "../../Media/arrowDown.svg";
import upArrow from "../../Media/arrowUp.svg";
import "../Styles/Components.css";
import "../Styles/Common.css";

export default function List({ title, aggregatedData = null, data = null }) {
  const [open, setOpen] = useState(false);

  const toggleBreakdown = () => {
    setOpen(!open);
  };

  const getArrow = () => {
    if (open) {
      return upArrow;
    } else {
      return downArrow;
    }
  };

  const createNewRowElement = (id, category, amount) => {
    return (
      <div key={id} className="page-row-container">
        <div className="component-subheader-text card-sml-padding-wrapper">
          {category}
        </div>
        <div className="row-right-element card-sml-padding-wrapper">
          {amount}
        </div>
      </div>
    );
  };

  const getRows = data?.map((item) =>
    createNewRowElement(item.id, item.category, item.amount)
  );

  const getBreakdown = () => {
    if (!open) {
      return;
    } else {
      return <div className="card-wrapper-2">{getRows}</div>;
    }
  };

  return (
    <div className="card-wrapper">
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          {title}
        </div>
        <div className="card-padding-wrapper row-right-element component-header-text">
          {aggregatedData}
        </div>
      </div>
      <div className="card-wrapper-2">
        <div className="page-row-container">
          <div className="card-padding-wrapper component-subheader-text">
            See breakdown
          </div>
          <button className="drop-down-btn" onClick={() => toggleBreakdown()}>
            <img
              src={getArrow()}
              className="row-right-element card-right-padding-wrapper"
              alt="down arrow"
            />
          </button>
        </div>
      </div>
      {getBreakdown()}
    </div>
  );
}
