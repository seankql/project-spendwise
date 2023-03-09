import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import AccountSelect from "../../Components/AccountSelect";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Visualization.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Visualization() {
  const { accounts, getAccounts, getUserId } = useViewModel();

  const sectionList = ["View Visualizations"];

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (user && isAuthenticated && !isLoading){
    getAccounts(getUserId(user));
    }
  }, [user, isAuthenticated, isLoading]);

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
            <AccountSelect data={accounts} />
          </div>
        </div>
        <div className="section-wrapper page-row-container">
          <SearchFilterSideBar />
          <div className="transactions-col"></div>
        </div>
      </div>
      <footer />
    </div>
  );
}
