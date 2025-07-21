import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Box sx={{ p: 2 }}>
      {/* Add logout button at the top */}
      <Button
        variant="outlined"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        sx={{ mb: 2 }}
      >
        Log Out
      </Button>

      {/* ...rest of your existing code... */}
    </Box>
  );
};

export default LogoutButton;
