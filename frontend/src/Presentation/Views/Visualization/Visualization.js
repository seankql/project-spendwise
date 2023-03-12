import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import AccountSelect from "../../Components/AccountSelect";
import VisualizationViewBox from "../../Components/VisualizationViewBox";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Visualization.css";

export default function Visualization() {
  const {
    accounts,
    transactions,
    getAccounts,
    getFilterReports,
    setFilters,
    name,
    startDate,
    endDate,
    minValue,
    maxValue,
    categories,
    selectedAccount,
    setSelectedAccount,
  } = useViewModel();

  const sectionList = ["View Visualizations"];

  useEffect(() => {
    getAccounts(1);
    getFilterReports(1);
  }, [
    selectedAccount,
    name,
    startDate,
    endDate,
    minValue,
    maxValue,
    categories,
  ]);

  return (
    <div className="body-wrapper">
      <Banner />
      <ScrollBanner data={sectionList} />
      <div className="page-content-container">
        <div
          id="View Visualizations"
          className="page-header-text page-row-container"
        >
          Visualization
          <div className="row-right-element">
            <AccountSelect data={accounts} set={setSelectedAccount} />
          </div>
        </div>
        <div className="section-wrapper page-row-container">
          <SearchFilterSideBar setFilters={setFilters} />
          <VisualizationViewBox data={transactions?.transactions} />
        </div>
      </div>
      <footer />
    </div>
  );
}
