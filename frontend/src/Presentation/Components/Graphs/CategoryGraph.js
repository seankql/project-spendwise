import React, { useCallback } from "react";
import { VisSingleContainer, VisDonut, VisBulletLegend } from "@unovis/react";
import { getLegend, getCategoryData } from "./GraphDataFormatter";
import "../../Styles/Components.css";

export default function List({ data }) {
  return (
    <div>
      <VisBulletLegend items={getLegend(data)} />
      <VisSingleContainer data={getCategoryData(data)}>
        <VisDonut
          arcWidth={40}
          value={useCallback((d) => Math.abs(d.y), [])}
          centralLabel="Category Breakdown"
        />
      </VisSingleContainer>
    </div>
  );
}
