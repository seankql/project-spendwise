import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Banner from "../../Components/Banner";
import ScrollBanner from "../../Components/ScrollBanner";
import SearchFilterSideBar from "../../Components/SearchFilterSideBar";
import AccountSelect from "../../Components/AccountSelect";
import VisualizationViewBox from "../../Components/VisualizationViewBox";
import GraphSelect from "../../Components/GraphSelect";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Visualization.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Visualization() {
  const {
    accounts,
    transactions,
    graph,
    setGraph,
    setFilters,
    page,
    name,
    startDate,
    endDate,
    minValue,
    maxValue,
    categories,
    selectedAccount,
    setSelectedAccount,
    fetchData,
  } = useViewModel();

  const sectionList = ["View Visualizations", "Graph Select"];

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    if (user && isAuthenticated && !isLoading) {
      getAccessTokenSilently({
        authorizationParams: {
          audience: "https://api.swx.cscc09.rocks:3001",
        },
      }).then((token) => {
        fetchData(user, token);
      });
    }
  }, [
    user,
    isAuthenticated,
    isLoading,
    isAuthenticated,
    isLoading,
    page,
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
          <VisualizationViewBox
            graph={graph}
            data={transactions?.transactions}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div id="Graph Select" className="section-wrapper bottom-elem-padder">
          <GraphSelect setGraph={setGraph} />
        </div>
      </div>
      <footer />
    </div>
  );
}
