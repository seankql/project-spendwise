import React, { useState } from "react";
import downArrow from "../../Media/arrowDown.svg";
import upArrow from "../../Media/arrowUp.svg";
import "../Styles/Components.css";
import "../Styles/Common.css";

export default function List({
  title,
  aggregatedData = null,
  data = null,
  isIncome = false,
}) {
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

  const getAmount = (category, isIncome) => {
    if (isIncome) {
      return aggregatedData;
    } else {
      return data["expense"][category]?.amount.toFixed(2);
    }
  };

  const createNewRowElement = (category, isIncome) => {
    return (
      <div key={category} className="page-row-container">
        <div className="component-subheader-text card-sml-padding-wrapper">
          {category}
        </div>
        <div className="row-right-element card-sml-padding-wrapper">
          {getAmount(category, isIncome)}
        </div>
      </div>
    );
  };

  const getRows = () => {
    if (!data) return;
    let elements = [];
    if (isIncome) {
      elements.push(createNewRowElement("income", true));
    } else {
      for (let category in data["expense"]) {
        elements.push(createNewRowElement(category, false));
      }
    }
    return elements;
  };

  const getBreakdown = () => {
    if (!open) {
      return;
    } else {
      return <div className="card-wrapper-2">{getRows()}</div>;
    }
  };

  return (
    <div className="card-wrapper">
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          {title}
        </div>
        <div className="card-padding-wrapper row-right-element component-header-text">
          {aggregatedData?.toFixed(2)}
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
