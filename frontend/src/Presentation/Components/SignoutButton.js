import { useAuth0 } from "@auth0/auth0-react";
import "../Styles/Components.css";

const SignoutButton = () => {
    const { logout, isAuthenticated} = useAuth0();
    
    return (
        isAuthenticated && (
            <button className="btn btn-sml banner-auth-component-container" onClick={() => logout()}>
                Sign Out
            </button>
            
        )
    );
}

export default SignoutButton;