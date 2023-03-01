import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import Button from "../../Components/Button";

export default function Dashboard() {
  const { navigateToHomepage, username, getUsername } = useViewModel();

  useEffect(() => {
    getUsername();
  }, [getUsername]);

  return (
    <div>
      <header>
        <div> Dashboard - {username} </div>
        <Button
          title={"Navigate to homepage"}
          onClick={() => {
            navigateToHomepage();
          }}
        />
      </header>
    </div>
  );
}
