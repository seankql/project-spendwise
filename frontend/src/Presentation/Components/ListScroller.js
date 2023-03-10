import "../Styles/Components.css";
import arrow from "../../Media/arrow.png";

export default function List({ count, page, inc, dec }) {
  // Amount of transactions per page
  const numPage = 9;

  const getLeftButton = () => {
    if (page > 0) {
      return (
        <button className="scroll-btn scroll-btn-left" onClick={() => dec()}>
          <img src={arrow} className="scroll-left-img" alt="arrow" />
        </button>
      );
    } else {
      // disable button
      return (
        <button className="scroll-btn scroll-btn-left scroll-btn-disable">
          <img src={arrow} className="scroll-left-img" alt="arrow" />
        </button>
      );
    }
  };

  const getRightButton = () => {
    if (count > (page + 1) * numPage) {
      return (
        <button className="scroll-btn scroll-btn-right" onClick={() => inc()}>
          <img src={arrow} className="scroll-right-img" alt="arrow" />
        </button>
      );
    } else {
      // disable button
      return (
        <button className="scroll-btn scroll-btn-right scroll-btn-disable">
          <img src={arrow} className="scroll-right-img" alt="arrow" />
        </button>
      );
    }
  };

  return (
    <div className="page-row-container list-scroll-container">
      {getLeftButton()}
      <div className="text-center list-scroll-element"> {page + 1} </div>
      {getRightButton()}
    </div>
  );
}
