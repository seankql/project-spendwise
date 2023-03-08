import logo from "../../../Media/logo-no-background.png";
import imageBanner from "../../../Media/homepage-banner.png";
import { Link } from "react-scroll";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Homepage.css";
import SigninSignupButton from "../../Components/SigninSignupButton";

export default function Homepage() {
  return (
    <div className="body-wrapper">
      <div className="banner">
        <div className="banner-wrapper">
          <img className="banner-img-container" src={logo} alt="logo" />
          <div className="links-container">
            <div className="btn-alt btn-sml banner-link-component-container">
              <Link
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={-128}
              >
                Home
              </Link>
            </div>
            <div className="btn-alt btn-sml banner-link-component-container">
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-128}
              >
                About Us
              </Link>
            </div>
            <div className="btn-alt btn-sml banner-link-component-container">
              <Link
                activeClass="active"
                to="features"
                spy={true}
                smooth={true}
                offset={-128}
              >
                Features
              </Link>
            </div>
            <div className="btn-alt btn-sml banner-link-component-container">
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-128}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="auth-container">
            <SigninSignupButton />
          </div>
        </div>
      </div>
      <div id="home" className="image-banner-wrapper">
        <img className="image-banner" src={imageBanner} alt="banner" />
        <div className="image-banner-text-container">
          <div className="image-banner-header">
            {" "}
            Track your spending a wiser way{" "}
          </div>
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            tempor molestie lorem laoreet vehicula. Integer pellentesque mattis
            eros nec porttitor. Aenean sagittis elit at maximus imperdiet. Etiam
            maximus tortor vitae est lacinia semper. In hac habitasse platea
            dictumst. Nulla vehicula fringilla mi eu commodo. Pellentesque ac
            tellus dolor.
          </p>
        </div>
      </div>
      <div className="page-content-container">
        <div id="about" style={{ height: 500 }}>
          <h1>This is About section</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          repellendus. Totam nihil similique a repellat minus dolor amet quasi.
          Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
        </div>
        <div id="features" style={{ height: 500 }}>
          <h1>This is Features section</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          repellendus. Totam nihil similique a repellat minus dolor amet quasi.
          Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
        </div>
        <div id="contact" style={{ height: 500 }}>
          <h1>This is Contacts section</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          repellendus. Totam nihil similique a repellat minus dolor amet quasi.
          Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
        </div>
      </div>
      <footer />
    </div>
  );
}
