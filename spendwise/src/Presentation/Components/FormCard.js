import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";
import Button from "./Button";

export default function List({ title, data, classes = "" }) {

  const createNewRowElement = (id, key) => {
    return (
      <div key={id} className="page-row-container">
        <div className="card-sml-padding-wrapper component-subheader-text">
          {key}
        </div>
        <input
          placeholder={"Enter " + key}
          className="card-sml-padding-wrapper row-right-element account-create-input"
        />
      </div>);
  }

  const rowItems = data?.map((item) => createNewRowElement(item.key, item.key));

  return (
    <div className={"card-wrapper " + classes}>
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          {title}
        </div>
      </div>
      <div className="card-wrapper-2">
        {rowItems}
      </div>
      <div className="page-row-container btn-form-wrapper">
        <Button title={"Cancel"} classes={"btn btn-form"} />
        <Button title={"Confirm"} classes={"btn btn-form confirm-btns"} />
      </div>
    </div>
  );
}
