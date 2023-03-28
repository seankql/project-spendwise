import React, { useCallback } from "react";
import {
  VisXYContainer,
  VisAxis,
  VisStackedBar,
  VisBulletLegend,
} from "@unovis/react";
import { getIncomeData, convertToDateObject } from "./GraphDataFormatter";
import "../../Styles/Components.css";

export default function List({ data, startDate, endDate }) {
  const dateFormatter = Intl.DateTimeFormat().format;

  return (
    <div>
      <VisXYContainer data={getIncomeData(data, startDate, endDate)}>
        <VisStackedBar
          x={useCallback((d) => convertToDateObject(d.x), [])}
          y={useCallback((d) => d.y, [])}
          color={"#8bc53f"}
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
