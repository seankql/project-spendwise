import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";

export default function List({ email, nickname, dateCreated, classes = "" }) {
  return (
    <div className={"card-wrapper " + classes}>
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          Profile Data
        </div>
      </div>
      <div className="card-wrapper-2">
        <div className="page-row-container">
          <div className="card-sml-padding-wrapper component-subheader-text">
            Username
          </div>
          <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
            {nickname}
          </div>
        </div>
        <div className="page-row-container">
          <div className="card-sml-padding-wrapper component-subheader-text">
            email
          </div>
          <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
            {email}
          </div>
        </div>
        <div className="page-row-container">
          <div className="card-sml-padding-wrapper component-subheader-text">
            Date Created
          </div>
          <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
            {dateCreated?.substring(0, dateCreated.indexOf("T"))}
          </div>
        </div>
      </div>
    </div>
  );
}
