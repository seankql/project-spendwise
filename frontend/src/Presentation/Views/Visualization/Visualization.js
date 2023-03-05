import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import AccountSelect from "../../Components/AccountSelect";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Visualization.css";

export default function Visualization() {
  const { accounts, getAccounts } = useViewModel();

  const sectionList = ["View Visualizations"];

  useEffect(() => {
    getAccounts(1);
  }, []);

  return (
    <div>
      <Banner />
      <ScrollBanner data={sectionList} />
      <div className="page-content-container">
        <div
          id="View Visualizations"
          className="page-header-text page-row-container"
        >
          Visualization
          <div className="row-right-element">
            <AccountSelect data={accounts} />
          </div>
        </div>
        <div className="section-wrapper page-row-container">
          <SearchFilterSideBar />
          <div className="transactions-col"></div>
        </div>
      </div>
    </div>
  );
}
