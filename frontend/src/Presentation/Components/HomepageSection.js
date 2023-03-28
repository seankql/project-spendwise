import "../Styles/Components.css";
import "../Styles/Common.css";
import "../Styles/Homepage.css";

export default function List({
  header,
  description,
  image,
  direction = "left",
  background = "white",
}) {
  const getOrientLeft = () => {
    return (
      <div className="home-section-wrapper">
        <div className="home-section-block">
          <div className="part">
            <div className="section-header-text "> {header} </div>
            <div className="section-paragraph-text"> {description} </div>
          </div>
          <div className="part">
            <div className="background-circle">
              <img className="section-img" src={image} alt="section-img" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getOrientRight = () => {
    return (
      <div className="home-section-wrapper">
        <div className="home-section-block">
          <div className="part">
            <div className="background-circle">
              <img className="section-img" src={image} alt="section-img" />
            </div>
          </div>
          <div className="part">
            <div className="section-header-text "> {header} </div>
            <div className="section-paragraph-text"> {description} </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={"section " + background}>
      {direction === "left" ? getOrientLeft() : getOrientRight()}
    </div>
  );
}
