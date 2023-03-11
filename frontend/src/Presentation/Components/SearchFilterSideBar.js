import Slider from "rc-slider";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "../Styles/Components.css";
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";

export default function List({ setFilters }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(new Date() - 1000 * 60 * 60 * 24 * 365)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [categories, setCategories] = useState([]);

  function dateFormatter(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const removeElementFromArray = (arr, element) => {
    const index = arr.indexOf(element);
    if (index > -1) {
      arr.splice(index, 1);
    }
    setCategories(arr);
  };

  const check = (category, isChecked) => {
    if (isChecked) {
      setCategories([...categories, category]);
    } else {
      removeElementFromArray([...categories], category);
    }
  };

  useEffect(() => {
    let sDate = dateFormatter(startDate);
    let eDate = dateFormatter(endDate);
    let cats = categories.join(",");
    setFilters(
      JSON.stringify({
        name: name,
        startDate: sDate,
        endDate: eDate,
        minValue: minValue,
        maxValue: maxValue,
        categories: cats,
      })
    );
  }, [name, startDate, endDate, minValue, maxValue, categories]);

  return (
    <div className="search-filter-col">
      <div className="section-header-text">Search Filters</div>

      <div className="subsection-wrapper categories-wrapper">
        <div className="sidebar-subheader-text">Transaction Name</div>
        <input
          placeholder="Enter Name"
          className="card-sml-padding-wrapper row-right-element search-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="subsection-wrapper categories-wrapper">
        <div className="sidebar-subheader-text">Start Date</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      <div className="subsection-wrapper categories-wrapper">
        <div className="sidebar-subheader-text">End Date</div>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>

      <div className="subsection-wrapper categories-wrapper">
        <div className="sidebar-subheader-text">Min Amount: {minValue}</div>
        <>
          <Slider
            min={0}
            max={1000}
            defaultValue={minValue}
            onAfterChange={(value) => setMinValue(value)}
            trackStyle={{ backgroundColor: "#8bc53f" }}
            handleStyle={{ border: "#8bc53f 2px solid", boxShadow: "#8bc53f" }}
          />
        </>
      </div>

      <div className="subsection-wrapper categories-wrapper">
        <div className="sidebar-subheader-text">Max Amount: {maxValue}</div>
        <>
          <Slider
            min={0}
            max={1000}
            defaultValue={maxValue}
            onAfterChange={(value) => setMaxValue(value)}
            trackStyle={{ backgroundColor: "#8bc53f" }}
            handleStyle={{ border: "#8bc53f 2px solid", boxShadow: "#8bc53f" }}
          />
        </>
      </div>

      <div className="subsection-wrapper categories-wrapper page-col-container">
        <div className="sidebar-subheader-text">Categories</div>
        <label className="subsection-wrapper">
          <input
            type="checkbox"
            onChange={(e) => check("Grocery", e.target.checked)}
          />
          Grocery
        </label>
        <label>
          <input
            type="checkbox"
            onChange={(e) => check("Furniture", e.target.checked)}
          />
          Furniture
        </label>
        <label>
          <input
            type="checkbox"
            onChange={(e) => check("Restaurants", e.target.checked)}
          />
          Restaurants
        </label>
        <label>
          <input
            type="checkbox"
            onChange={(e) => check("Gas", e.target.checked)}
          />
          Gas
        </label>
      </div>
    </div>
  );
}
