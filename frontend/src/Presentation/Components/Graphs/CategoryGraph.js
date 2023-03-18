import React, { useCallback } from "react";
import { VisSingleContainer, VisDonut, VisBulletLegend } from "@unovis/react";
import "../../Styles/Components.css";

export default function List({ data }) {
  function getLegend(json) {
    if (!json) return [];
    let labels = [];
    for (let i = 0; i < json.length; i++) {
      const entry = json[i];
      const attrValue = entry["category"];
      if (!labels.includes(attrValue)) {
        labels = [...labels, attrValue];
      }
    }
    let labelsDict = [];
    labels.forEach((val) => {
      labelsDict = [...labelsDict, { name: val }];
    });
    return labelsDict;
  }

  function sumEntriesByAttribute(json) {
    if (!json) return;
    let sums = {};
    for (let i = 0; i < json.length; i++) {
      const entry = json[i];
      const attrValue = entry["category"];
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
    return result;
  }

  return (
    <div>
      <VisBulletLegend items={getLegend(data)} />
      <VisSingleContainer data={sumEntriesByAttribute(data)}>
        <VisDonut
          arcWidth={40}
          value={useCallback((d) => d.y, [])}
          centralLabel="Category Breakdown"
        />
      </VisSingleContainer>
    </div>
  );
}
