import React, { useCallback } from "react";
import { VisSingleContainer, VisDonut, VisBulletLegend } from "@unovis/react";
import "../../Styles/Components.css";

export default function List({ data }) {
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
    console.log(result);
    return result;
  }

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
      <VisSingleContainer data={sumEntriesByAttribute(data)}>
        <VisDonut
          arcWidth={80}
          value={useCallback((d) => d.y, [])}
          centralLabel="Category Breakdown"
        />
      </VisSingleContainer>
    </div>
  );
}
