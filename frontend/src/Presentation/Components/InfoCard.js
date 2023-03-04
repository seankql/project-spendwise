import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";

export default function List({ title, data, classes = "" }) {
  const createNewRowElement = (id, key, value) => {
    return (
      <div key={id} className="page-row-container">
        <div className="card-sml-padding-wrapper component-subheader-text">
          {key}
        </div>
        <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
          {value}
        </div>
      </div>
    );
  };

  const rowItems = data?.map((item) =>
    createNewRowElement(item.id, item.key, item.value)
  );

  return (
    <div className={"card-wrapper " + classes}>
      <div className="page-row-container">
        <div className="card-padding-wrapper component-header-text">
          {title}
        </div>
      </div>
      <div className="card-wrapper-2">{rowItems}</div>
    </div>
  );
}
