import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    console.log("User object:", user); // See all user data
    console.log("User roles:", user?.["https://your-app.com/roles"]); // Custom claim
    // navigate("/home");
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    if (
      user?.["https://sem-prassao.com/roles"][0] === "Profissional de Saúde"
    ) {
      navigate("/profissional-de-saúde");
    } else if (user?.["https://sem-prassao.com/roles"][0] === "Admin") {
      navigate("/admin");
    } else {
      navigate("/utente");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Typography variant="h4" mb={2}>
        Login
      </Typography>
      <Button variant="contained" onClick={() => loginWithRedirect()}>
        Log In with Auth0
      </Button>
    </Box>
  );
};

export default Login;
