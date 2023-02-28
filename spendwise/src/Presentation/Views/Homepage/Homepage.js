import useViewModel from "./ViewModel";
import Button from "../../Components/Button"
import logo from "../../../Media/logo-no-background.png"
import imageBanner from "../../../Media/homepage-banner.png"
import '../../Styles/Common.css'
import '../../Styles/Main.css'
import '../../Styles/Homepage.css'

export default function Homepage() {

  const { navigateToDashboard } = useViewModel();

  return (
    <div>
      <div className='banner'>
        <img className="banner-img-container" src={logo} alt="logo" />
        <div className="links-container">
          <Button title={"Home"} style='btn-alt btn-sml banner-link-component-container' onClick={() => {
            navigateToDashboard()
          }} />
          <Button title={"About"} style='btn-alt btn-sml banner-link-component-container' onClick={() => {
            navigateToDashboard()
          }} />
          <Button title={"Features"} style='btn-alt btn-sml banner-link-component-container' onClick={() => {
            navigateToDashboard()
          }} />
          <Button title={"Contact Us"} style='btn-alt btn-sml banner-link-component-container' onClick={() => {
            navigateToDashboard()
          }} />
        </div>
        <div className="auth-container">
          <Button title={"Sign In"} style='btn btn-sml banner-auth-component-container' onClick={() => {
            navigateToDashboard()
          }} />
          <Button title={"Sign Up"} style='btn btn-sml banner-auth-component-container' onClick={() => {
            navigateToDashboard()
          }} />
        </div>
      </div>
      <div className="rel">
        <img className="image-banner" src={imageBanner} alt="banner" />
        <div className="abs">
          <h1> Track your spending a wiser way </h1>
        </div>
      </div>
      <Button title={"Navigate to Dashboard"} onClick={() => {
        navigateToDashboard()
      }} />
    </div>
  );
}
