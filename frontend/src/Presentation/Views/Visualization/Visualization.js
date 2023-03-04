import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import AccountSelect from "../../Components/AccountSelect";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Visualization.css";

export default function Visualization() {
  const { username, getUsername, accounts, getAccounts } = useViewModel();

  // Perform some sort of action
  const onChange = (item, name) => {};

  useEffect(() => {
    getUsername();
    getAccounts(1);
  }, []);

  return (
    <div>
      <Banner />
      <div className="page-content-container">
        <div className="page-header-text page-row-container">
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
