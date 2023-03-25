import React, { useCallback } from "react";
import {
  VisXYContainer,
  VisAxis,
  VisStackedBar,
  VisBulletLegend,
} from "@unovis/react";
import {
  getIncomeExpenseData,
  convertToDateObject,
} from "./GraphDataFormatter";
import "../../Styles/Components.css";

export default function List({ data, startDate, endDate }) {
  const dateFormatter = Intl.DateTimeFormat().format;
  const color = (d) => (d.y > 0 ? "#8bc53f" : "#FF0000");

  return (
    <div>
      <VisXYContainer data={getIncomeExpenseData(data, startDate, endDate)}>
        <VisStackedBar
          x={useCallback((d) => convertToDateObject(d.x), [])}
          y={useCallback((d) => Math.abs(d.y), [])}
          color={color}
        ></VisStackedBar>
        <VisAxis
          type="x"
          label="Date"
          numTicks={5}
          tickFormat={dateFormatter}
        ></VisAxis>
        <VisAxis type="y" label="Amount"></VisAxis>
      </VisXYContainer>
    </div>
  );
}
