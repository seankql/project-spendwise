import React, { useCallback } from "react";
import {
  VisXYContainer,
  VisAxis,
  VisArea,
  VisBulletLegend,
} from "@unovis/react";
import { CurveType } from "@unovis/ts";
import "../../Styles/Components.css";

export default function List({ data }) {
  function sumEntriesByAttribute(json) {
    if (!json) return;
    let sums = {};
    for (let i = 0; i < json.length; i++) {
      const entry = json[i];
      const attrValue = entry["transactionDate"];
      if (attrValue in sums) {
        if (sums[attrValue][entry.category]) {
          sums[attrValue][entry.category] += parseInt(entry.amount);
        } else {
          sums[attrValue].push(entry.category);
          sums[attrValue][entry.category] = parseInt(entry.amount);
        }
      } else {
        sums[attrValue] = [];
        sums[attrValue].push(entry.category);
        sums[attrValue][entry.category] = parseInt(entry.amount);
      }
    }
    let result = [];
    Object.keys(sums).forEach((key) => {
      result.push({ x: key, y: sums[key] });
    });
    console.log(result);
    return result;
  }

  function convertToDateObject(dateString) {
    const dateArray = dateString.split("-"); // Split the date string by hyphens
    const year = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1]) - 1; // Subtract 1 from month since it's zero-indexed in the Date constructor
    const day = parseInt(dateArray[2]);
    const dateObj = new Date(year, month, day);
    return dateObj;
  }

  const dateFormatter = Intl.DateTimeFormat().format;

  return (
    <div>
      <VisBulletLegend
        items={[
          { name: "Grocery" },
          { name: "Gas" },
          { name: "Restaurants" },
          { name: "Furniture" },
        ]}
      />
      <VisXYContainer data={sumEntriesByAttribute(data)}>
        <VisArea
          x={useCallback((d) => convertToDateObject(d.x), [])}
          y={[
            useCallback((d) => d.y["Grocery"], []),
            useCallback((d) => d.y["Gas"], []),
            useCallback((d) => d.y["Restaurants"], []),
            useCallback((d) => d.y["Furniture"], []),
          ]}
          curveType={CurveType.StepAfter}
        />
        <VisAxis type="x" label="Date" tickFormat={dateFormatter} />
        <VisAxis type="y" label="Amount" />
      </VisXYContainer>
    </div>
  );
}
