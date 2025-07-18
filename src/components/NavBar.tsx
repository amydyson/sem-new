import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const NavBar = () => {
  return (
    <div>
      <Button variant="contained">Hello World</Button>
      <Link to="/">Home</Link>
      <Link to="/utente">Utente</Link>
      <Link to="/profissional-de-saúde">Profissional de Saúde</Link>
    </div>
  );
};

export default NavBar;
