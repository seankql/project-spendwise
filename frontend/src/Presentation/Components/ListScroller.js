import "../Styles/Components.css";
import arrow from "../../Media/arrow.png";

export default function List({ data, onClick }) {
  return (
    <div className="page-row-container list-scroll-container">
      <button className="scroll-btn-left" onClick={onClick}>
        <img src={arrow} className="scroll-left-img" alt="arrow" />
      </button>
      <div className="text-center list-scroll-element"> 1 </div>
      <button className="scroll-btn-right" onClick={onClick}>
        <img src={arrow} className="scroll-right-img" alt="arrow" />
      </button>
    </div>
  );
}
