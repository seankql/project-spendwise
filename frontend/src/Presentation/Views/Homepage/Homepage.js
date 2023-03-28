import logo from "../../../Media/logo-no-background.png";
import imageBanner from "../../../Media/pexels-andrea-piacquadio.jpg";
import aboutPicture from "../../../Media/pexels-mikhail-nilov.jpg";
import featurePicture from "../../../Media/pexels-photo-4386433.webp";
import { Link } from "react-scroll";
import ScrollBanner from "../../Components/ScrollBanner";
import SigninSignupButton from "../../Components/SigninSignupButton";
import HomepageSection from "../../Components/HomepageSection";
import "../../Styles/Common.css";
import "../../Styles/Main.css";
import "../../Styles/Homepage.css";

export default function Homepage() {
  const AboutDescription =
    "SpendWise's user-friendly interface provides you with a clear overview of your financial situation. You can analyze your transactions and monitor your progress towards your financial goals using our advanced reporting features and visualization tools. Whether you're a student, professional, or entrepreneur, SpendWise is a powerful tool that can help you manage your finances more effectively. With SpendWise, you can track your spending a wiser way and take control of your financial future.";

  const sectionList = ["home", "about", "features", "contact"];

  return (
    <div className="body-wrapper">
      <div className="banner">
        <div className="banner-wrapper">
          <img className="banner-img-container" src={logo} alt="logo" />
          <div className="auth-container">
            <SigninSignupButton />
          </div>
        </div>
      </div>
      <ScrollBanner data={sectionList} />
      <div id="home" className="image-banner-wrapper">
        <img className="image-banner" src={imageBanner} alt="banner" />
        <div className="image-banner-text-container">
          <div className="image-banner-header">
            {" "}
            Track your spending a wiser way{" "}
          </div>
          <p>
            {" "}
            With SpendWise, you can track your income and expenses all in one
            place. Whether you choose to enter your transactions manually or
            automatically import them from your bank account, we're here to
            help.
          </p>
        </div>
      </div>
      <div id="about">
        <HomepageSection
          header="About Us"
          description={AboutDescription}
          image={aboutPicture}
          background={"off-white"}
        />
      </div>
      <div id="features">
        <HomepageSection
          header="Features"
          description={AboutDescription}
          image={featurePicture}
          background={"white"}
          direction="right"
        />
      </div>
      <div id="contact">
        <HomepageSection
          header="contact"
          description={AboutDescription}
          image={aboutPicture}
          background={"off-white"}
          direction="left"
        />
      </div>
      <footer />
    </div>
  );
}
