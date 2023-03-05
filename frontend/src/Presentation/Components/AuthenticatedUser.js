import { useAuth0 } from "@auth0/auth0-react";

const AuthenticatedUser = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="authenticated-user-container">{user?.name}</div>
    )
  );
};

export default AuthenticatedUser;
