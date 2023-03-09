import "../Styles/Components.css";
import "../Styles/Common.css";
import { Link } from "react-scroll";

export default function List({ data }) {
  const createLinkElement = (section) => {
    return (
      <div key={section} className="scroll-banner-element">
        <Link
          activeClass="active"
          to={section}
          spy={true}
          smooth={true}
          offset={-150}
        >
          {section}
        </Link>
      </div>
    );
  };

  const getLinks = data.map((link) => createLinkElement(link));

  return (
    <div className="scroll-banner">
      <div className="scroll-banner-wrapper">{getLinks}</div>
    </div>
  );
}
