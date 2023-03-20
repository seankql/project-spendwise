import React from "react";
import "../Styles/Components.css";
import pie from "../../Media/analytics.png";
import stack from "../../Media/graph-bar.png";
import trenddown from "../../Media/trenddown.png";
import trendup from "../../Media/trendup.png";

export default function List({ setGraph }) {
  return (
    <div className="graph-select-box-wrapper">
      <div className="section-header-text">Graph Select</div>
      <div className="page-row-container graph-select-wrapper component-buffer">
        <button
          className="graph-button-wrapper"
          onClick={() => setGraph("pie")}
        >
          <div className="graph-button-text"> Pie Chart</div>
          <img src={pie} className="graph-picture-wrapper" alt="pie" />
        </button>
        <button
          className="graph-button-wrapper"
          onClick={() => setGraph("stack")}
        >
          <div className="graph-button-text"> Stacked Category Graph</div>
          <img src={stack} className="graph-picture-wrapper" alt="stack" />
        </button>
        <button
          className="graph-button-wrapper"
          onClick={() => setGraph("expense")}
        >
          <div className="graph-button-text"> Expense Chart</div>
          <img
            src={trenddown}
            className="graph-picture-wrapper"
            alt="expense"
          />
        </button>
        <button
          className="graph-button-wrapper"
          onClick={() => setGraph("income")}
        >
          <div className="graph-button-text"> Income Chart</div>
          <img src={trendup} className="graph-picture-wrapper" alt="income" />
        </button>
      </div>
    </div>
  );
}
