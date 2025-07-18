import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "right",
            gap: 4,
          }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
          <Link
            to="/utente"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Utente
          </Link>
          <Link
            to="/profissional-de-saúde"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Profissional de Saúde
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
