import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";
import Button from "./Button";

// TODO: data should be some sort of list with key value mappings. Rows
// should then be generated based on the given data
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
            Account Name
          </div>
          <input
            placeholder="Enter Account Name"
            className="card-sml-padding-wrapper row-right-element account-create-input"
          />
        </div>
      </div>
      <div className="page-row-container btn-form-wrapper">
        <Button title={"Cancel"} classes={"btn btn-form"} />
        <Button title={"Confirm"} classes={"btn btn-form confirm-btns"} />
      </div>
    </div>
  );
}
