import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Account.css";

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
            First Name
          </div>
          <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
            Bob
          </div>
        </div>
        <div className="card-wrapper-2">
          <div className="page-row-container">
            <div className="card-sml-padding-wrapper component-subheader-text">
              Last Name
            </div>
            <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
              Bobber
            </div>
          </div>
        </div>
        <div className="card-wrapper-2">
          <div className="page-row-container">
            <div className="card-sml-padding-wrapper component-subheader-text">
              Email
            </div>
            <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
              BobbyBob@gmail.com
            </div>
          </div>
        </div>
        <div className="card-wrapper-2">
          <div className="page-row-container">
            <div className="card-sml-padding-wrapper component-subheader-text">
              Member Since
            </div>
            <div className="card-sml-padding-wrapper component-subheader-text row-right-element">
              April 16, 2019
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
