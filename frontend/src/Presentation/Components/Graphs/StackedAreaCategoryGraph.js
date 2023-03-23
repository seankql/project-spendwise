import React, { useCallback } from "react";
import {
  VisXYContainer,
  VisAxis,
  VisArea,
  VisBulletLegend,
} from "@unovis/react";
import {
  getLegend,
  getStackedData,
  convertToDateObject,
} from "./GraphDataFormatter";
import { CurveType } from "@unovis/ts";
import "../../Styles/Components.css";

export default function List({ data, startDate, endDate }) {
  const dateFormatter = Intl.DateTimeFormat().format;

  return (
    <div>
      <VisBulletLegend items={getLegend(data)} />
      <VisXYContainer data={getStackedData(data, startDate, endDate)}>
        <VisArea
          x={useCallback((d) => convertToDateObject(d.x), [])}
          y={[
            useCallback((d) => d.y["Grocery"], []),
            useCallback((d) => d.y["Gas"], []),
            useCallback((d) => d.y["Restaurants"], []),
            useCallback((d) => d.y["Furniture"], []),
            useCallback((d) => d.y["Groceries"], []),
            useCallback((d) => d.y["Income"], []),
          ]}
          curveType={CurveType.StepAfter}
        />
        <VisAxis
          type="x"
          numTicks={5}
          label="Date"
          tickFormat={dateFormatter}
        />
        <VisAxis type="y" label="Amount" />
      </VisXYContainer>
    </div>
  );
}
