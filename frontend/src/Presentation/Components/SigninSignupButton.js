import { useAuth0 } from "@auth0/auth0-react";

const SigninSignupButton = () => {
    const { loginWithRedirect } = useAuth0();
    
    return (
        <button className="btn btn-sml banner-auth-component-container" onClick={() => loginWithRedirect()}>
            Sign In / Sign Up
        </button>
    );
}

export default SigninSignupButton;