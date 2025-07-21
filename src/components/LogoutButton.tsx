import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: import.meta.env.VITE_REDIRECT_URI || window.location.origin,
      },
    });
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
