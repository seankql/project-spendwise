import useViewModel from "./ViewModel";
import Button from "../../Components/Button";
import logo from "../../../Media/logo-no-background.png";
import InfoCard from "../../Components/InfoCard";
import AlertCard from "../../Components/AlertCard";
import FormCard from "../../Components/FormCard";
import "../../Styles/Common.css";
import "../../Styles/Account.css";
import "../../Styles/Main.css";

export default function Account() {
  const { navigateToPage } = useViewModel();

  // TODO: add functionality to Create New Account
  // TODO: Show different "Bank Information" form depending on whether or not
  // User has linked it to a bank account or not. If not, users should be prompted
  // to link their account to a bank account, otherwise, just show the current
  // information and have an option to unlink

  return (
    <div>
      <div className="banner">
        <div className="banner-wrapper">
          <img className="banner-img-container" src={logo} alt="logo" />
          <div className="links-container">
            <Button
              title={"Dashboard"}
              classes="btn btn-sml banner-link-component-container"
              onClick={() => {
                navigateToPage("/dashboard");
              }}
            />
            <Button
              title={"Transactions"}
              classes="btn btn-sml banner-link-component-container"
              onClick={() => {
                navigateToPage("/transactions");
              }}
            />
            <Button
              title={"Visualization"}
              classes="btn btn-sml banner-link-component-container"
              onClick={() => {
                navigateToPage("/visualization");
              }}
            />
            <Button
              title={"Account"}
              classes="btn btn-sml banner-link-component-container"
              onClick={() => {
                navigateToPage("/account");
              }}
            />
          </div>
          <div className="auth-container">
            <Button
              title={"Sign Out"}
              classes="btn btn-sml banner-auth-component-container"
              onClick={() => {
                navigateToPage("/");
              }}
            />
          </div>
        </div>
      </div>
      <div className="page-content-container">
        <div className="page-header-text">
          Account & Settings
          <div className="section-wrapper section-header-text">
            {" "}
            Profile & Alerts{" "}
          </div>
          <div className="section-wrapper page-row-container section-divider">
            <InfoCard title={"Basic Information"} classes={"basic-info-card"} />
            <div className="page-col-container row-right-element">
              <AlertCard title={"Alerts"} classes={"alert-card "} />
              <div className="section-wrapper">
                <Button
                  title={"Create New Account"}
                  classes={"btn alert-card"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section-wrapper section-header-text">
          {" "}
          Create New Account{" "}
        </div>
        <div className="section-wrapper page-row-container">
          <FormCard title={"Basic Information"} classes={"create-form-card"} />
          <FormCard
            title={"Link To Bank Account"}
            classes={"row-right-element create-form-card"}
          />
        </div>
        <div className="section-wrapper page-row-container section-divider">
          <div className="row-right-element">
            <Button title={"Cancel"} classes={"btn btn-sml confirm-btns"} />
            <Button title={"Confirm"} classes={"btn btn-sml confirm-btns"} />
          </div>
        </div>
        <div className="section-wrapper section-header-text"> Accounts </div>
        <div className="section-wrapper page-row-container">
          <InfoCard
            title={"Account information"}
            classes={"create-form-card"}
          />
          <div className="page-col-container row-right-element">
            <InfoCard title={"Bank Information"} classes={"create-form-card"} />
          </div>
        </div>
        <div className="section-wrapper section-divider page-row-container">
          <Button
            title={"Edit Account"}
            classes={"btn btn-sml account-btns-left"}
          />
          <Button
            title={"Delete Account"}
            classes={"btn btn-sml account-btns-left"}
          />
          <div className="row-right-element">
            <Button
              title={"Link Account"}
              classes={"btn btn-sml account-btns-right"}
            />
            <Button
              title={"Unlink Account"}
              classes={"btn btn-sml account-btns-right"}
            />
          </div>
        </div>
        <div className="section-wrapper page-row-container">
          <InfoCard
            title={"Account information"}
            classes={"create-form-card"}
          />
          <div className="page-col-container row-right-element">
            <InfoCard title={"Bank Information"} classes={"create-form-card"} />
          </div>
        </div>
        <div className="section-wrapper section-divider page-row-container">
          <Button
            title={"Edit Account"}
            classes={"btn btn-sml account-btns-left"}
          />
          <Button
            title={"Delete Account"}
            classes={"btn btn-sml account-btns-left"}
          />
          <div className="row-right-element">
            <Button
              title={"Link Account"}
              classes={"btn btn-sml account-btns-right"}
            />
            <Button
              title={"Unlink Account"}
              classes={"btn btn-sml account-btns-right"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
