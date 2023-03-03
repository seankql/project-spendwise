import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import Dropdown from "../../Components/Dropdown";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Visualization.css";

export default function Visualization() {
  const { navigateToPage, username, getUsername, accounts, getAccounts } =
    useViewModel();

  // Perform some sort of action
  const onChange = (item, name) => {};

  useEffect(() => {
    getUsername();
    getAccounts();
  }, []);

  return (
    <div>
      <Banner/>
      <div className="page-content-container">
        <div className="page-header-text page-row-container">
          Visualization
          <div className="row-right-element">
            <Dropdown
              name="account-select"
              title="select account"
              list={accounts}
              onChange={onChange}
            />
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
