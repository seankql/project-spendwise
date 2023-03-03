import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";

// TODO: data should be a list of alerts if there are multiple alerts, users
// should be able to scroll or perhaps clear through alerts.
export default function List({ title, data, classes = "" }) {
  return (
    <div className={"card-wrapper " + classes}>
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          {title}
        </div>
      </div>
      <div className="card-wrapper-2">
        <div className="page-row-container">
          <div className="card-sml-padding-wrapper component-subheader-text">
            No alerts at the moment!
          </div>
        </div>
      </div>
    </div>
  );
}
