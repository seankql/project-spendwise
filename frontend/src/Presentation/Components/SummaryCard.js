import "../Styles/Components.css";
import "../Styles/Common.css";
import downArrow from "../../Media/arrowDown.svg";

// TODO: make "see breakdown" a clickable component that breaks down
// the users spending/income by category
export default function List({ title, data }) {
  return (
    <div className="card-wrapper">
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          {title}
        </div>
        <div className="card-padding-wrapper row-right-element component-header-text">
          {data}
        </div>
      </div>
      <div className="card-wrapper-2">
        <div className="page-row-container">
          <div className="card-padding-wrapper component-subheader-text">
            See breakdown
          </div>
          <img
            src={downArrow}
            className="row-right-element card-right-padding-wrapper"
            alt="down arrow"
          />
        </div>
      </div>
    </div>
  );
}
