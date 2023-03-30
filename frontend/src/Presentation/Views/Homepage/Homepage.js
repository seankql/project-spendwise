import logo from "../../../Media/logo-no-background.png";
import imageBanner from "../../../Media/pexels-andrea-piacquadio.webp";
import aboutPicture from "../../../Media/pexels-mikhail-nilov.webp";
import featurePicture from "../../../Media/pexels-photo-4386433.webp";
import contactPicture from "../../../Media/pexels-cottonbro-studio-3202235.webp";
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

  const FeatureDescription =
    "SpendWise offers powerful features that make managing your finances easier than ever before. With automatic or manual tracking of income and expenses, you can stay on top of your finances and make informed decisions. SpendWise's data visualization tools provide easy-to-read graphs and charts that help you analyze your spending habits and identify areas where you can save money. The app also includes search features that allow you to find and analyze expenses quickly and efficiently. With SpendWise, you have all the tools you need to take control of your finances and achieve your financial goals.";

  const ContactDescription =
    "SpendWise was developed by a three-man development team. You can reach out to us by email for inquiries: \n\n\
    Chongmin-Bai \n jonathan.bai@mail.utoronto.ca \n \n \
    Matthew Melchior \n  matthew.melchior@mail.utoronto.ca \n \n \
    Sean Lau Kuang Qi \n sean.lau@mail.utoronto.ca";

  const sectionList = ["Home", "About", "Features", "Contact"];

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
      <div id="Home" className="image-banner-wrapper">
        <img className="image-banner" src={imageBanner} alt="banner" />
        <div className="image-banner-text-container">
          <div className="image-banner-header">
            {" "}
            Track your spending a wiser way{" "}
          </div>
          <div className="section-paragraph-text">
            {" "}
            With SpendWise, you can track your income and expenses all in one
            place. Whether you choose to enter your transactions manually or
            automatically import them from your bank account, we're here to
            help.
          </div>
        </div>
      </div>
      <div id="About">
        <HomepageSection
          header="About Us"
          description={AboutDescription}
          image={aboutPicture}
          background={"off-white"}
        />
      </div>
      <div id="Features">
        <HomepageSection
          header="Features"
          description={FeatureDescription}
          image={featurePicture}
          background={"white"}
          direction="right"
        />
      </div>
      <div id="Contact">
        <HomepageSection
          header="Contact"
          description={ContactDescription}
          image={contactPicture}
          background={"off-white"}
          direction="left"
        />
      </div>
      <footer />
    </div>
  );
}
