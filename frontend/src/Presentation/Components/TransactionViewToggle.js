import "../Styles/Components.css";
import grid from "../../Media/grid.png";
import list from "../../Media/list.png";

export default function List({ onClick }) {
  return (
    <div className="toggle-container">
      <button className="toggle-btn-left" onClick={onClick}>
        <img src={list} className="toggle-img" alt="list" />
      </button>
      <button className="toggle-btn-right" onClick={onClick}>
        <img src={grid} className="toggle-img" alt="grid" />
      </button>
    </div>
  );
}
