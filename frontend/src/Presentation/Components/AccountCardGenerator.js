import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";
import AccountCard from "./AccountCard.js";
import Button from "./Button.js";

export default function List({ data = null }) {
  const createNewRowElement = (accountData) => {
    return (
      <div key={accountData.id}>
        <div className="section-wrapper page-row-container">
          <AccountCard
            data={accountData}
            title={"Account information"}
            classes={"create-form-card"}
          />
          <div className="page-col-container row-right-element">
            <AccountCard
              data={accountData}
              title={"Bank Information"}
              classes={"create-form-card"}
            />
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
    );
  };

  const rowItems = data?.map((account) => createNewRowElement(account));

  return rowItems;
}
