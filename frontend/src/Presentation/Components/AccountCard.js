import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";

export default function List({ title, data = null, classes = "" }) {
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
            Account Name
          </div>
          <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
            {data.accountName}
          </div>
        </div>
        <div className="page-row-container">
          <div className="card-sml-padding-wrapper component-subheader-text">
            Date Created
          </div>
          <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
            {data.createdAt?.substring(0, data.createdAt.indexOf("T"))}
          </div>
        </div>
      </div>
    </div>
  );
}
