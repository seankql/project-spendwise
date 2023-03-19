import React, { useState } from "react";
import "../Styles/Components.css";
import grid from "../../Media/grid.png";
import list from "../../Media/list.png";

export default function List({ toggleFunc }) {
  const [view, setView] = useState("list");

  const getListClass = () => {
    if (view === "list") return "toggle-btn-selected";
    return "";
  };

  const getGridClass = () => {
    if (view === "grid") return "toggle-btn-selected";
    return "";
  };

  const toggle = () => {
    if (view === "list") {
      setView("grid");
      toggleFunc("grid");
    } else {
      setView("list");
      toggleFunc("list");
    }
  };

  return (
    <div className="toggle-container">
      <button
        className={"toggle-btn-left " + getListClass()}
        onClick={() => toggle()}
      >
        <img src={list} className="toggle-img" alt="list" />
      </button>
      <button
        className={"toggle-btn-right " + getGridClass()}
        onClick={() => toggle()}
      >
        <img src={grid} className="toggle-img" alt="grid" />
      </button>
    </div>
  );
}
