import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";
import Button from "./Button";

export default function List({ title, data, classes = "" }) {

  const createNewRowElement = (id, key) => {
    return (
      <div key={id} className="page-row-container">
        <div id={key} className="card-sml-padding-wrapper component-subheader-text">
          {key}
        </div>
        <input
          placeholder={"Enter " + key}
          className="card-sml-padding-wrapper row-right-element account-create-input"
        />
      </div>);
  }

  const rowItems = data?.map((item) => createNewRowElement(item.id, item.key));

  const handleSubmitForm = e => {
    let rows =  Array.from(e.target.children[1].children);
    rows.forEach(row => {
      console.log(row.children[0].id);
      console.log(row.children[1].value);
      row.children[1].value = "";
    })
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmitForm} className={"card-wrapper " + classes}>
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          {title}
        </div>
      </div>
      <div id="rowItems" className="card-wrapper-2">
        {rowItems}
      </div>
      <div className="page-row-container btn-form-wrapper">
        <Button type="submit" title={"Cancel"} classes={"btn btn-form"} />
        <Button type="clear" title={"Confirm"} classes={"btn btn-form confirm-btns"} />
      </div>
    </form>
  );
}
