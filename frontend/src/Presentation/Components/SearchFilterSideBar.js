import "../Styles/Components.css";

export default function List() {
  return (
    <div className="search-filter-col">
      <div className="section-header-text">Search Filters</div>

      <div className="subsection-wrapper categories-wrapper">
        <div className="sidebar-subheader-text">Transaction Name</div>
        <input
          placeholder="Enter Name"
          className="card-sml-padding-wrapper row-right-element search-input"
        />
      </div>

      <div className="subsection-wrapper categories-wrapper">
        <div className="sidebar-subheader-text">Insert Date Picker</div>
      </div>

      <div className="subsection-wrapper categories-wrapper">
        <div className="sidebar-subheader-text">Insert Max Amount Slider</div>
      </div>

      <div className="subsection-wrapper categories-wrapper">
        <div className="sidebar-subheader-text">Insert Min Amount Slider</div>
      </div>

      <div className="subsection-wrapper categories-wrapper page-col-container">
        <div className="sidebar-subheader-text">Categories</div>
        <label className="subsection-wrapper">
          <input type="checkbox" />
          Grocery
        </label>
        <label>
          <input type="checkbox" />
          Furniture
        </label>
        <label>
          <input type="checkbox" />
          Restaurants
        </label>
        <label>
          <input type="checkbox" />
          Gas
        </label>
        <label>
          <input type="checkbox" />
          Recyrring Bill Payments
        </label>
        <label>
          <input type="checkbox" />
          Drug Store
        </label>
        <label>
          <input type="checkbox" />
          Home Improvement
        </label>
        <label>
          <input type="checkbox" />
          Entertainment
        </label>
        <label>
          <input type="checkbox" />
          Public Transportation and Parking
        </label>
      </div>
    </div>
  );
}
