import React, { useCallback } from "react";
import {
  VisXYContainer,
  VisAxis,
  VisStackedBar,
  VisBulletLegend,
} from "@unovis/react";
import { getExpenseData, convertToDateObject } from "./GraphDataFormatter";
import "../../Styles/Components.css";

export default function List({ data, startDate, endDate }) {
  const dateFormatter = Intl.DateTimeFormat().format;

  return (
    <div>
      <VisXYContainer data={getExpenseData(data, startDate, endDate)}>
        <VisStackedBar
          x={useCallback((d) => convertToDateObject(d.x), [])}
          y={useCallback((d) => d.y, [])}
          color={"#FF0000"}
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
