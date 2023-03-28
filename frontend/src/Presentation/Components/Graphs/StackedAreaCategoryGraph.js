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
  getStackedDataAccessor,
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
          y={getStackedDataAccessor(data)}
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
