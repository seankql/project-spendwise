import React, { useCallback } from "react";
import { VisXYContainer, VisAxis, VisStackedBar } from "@unovis/react";
import "../Styles/Components.css";

export default function List({ data }) {
  function sumEntriesByAttribute(json) {
    if (!json) return;
    let sums = {};
    for (let i = 0; i < json.length; i++) {
      const entry = json[i];
      const attrValue = entry["transactionDate"];
      if (attrValue in sums) {
        sums[attrValue] += parseInt(entry.amount);
      } else {
        sums[attrValue] = parseInt(entry.amount);
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
    <VisXYContainer data={sumEntriesByAttribute(data)}>
      <VisStackedBar
        x={useCallback((d) => convertToDateObject(d.x), [])}
        y={useCallback((d) => d.y, [])}
        color={"#8bc53f"}
      ></VisStackedBar>
      <VisAxis type="x" numTicks={5} tickFormat={dateFormatter}></VisAxis>
      <VisAxis type="y"></VisAxis>
    </VisXYContainer>
  );
}
