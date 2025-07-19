import { Box, Typography } from "@mui/material";
import UtenteImage from "../assets/New-Utente.png";
import ProfissionalImage from "../assets/new-profissional.png";
import BloodCuffImage from "../assets/newest-one.png";

const Home = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{
          marginTop: 5,
          fontSize: "1.5rem",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Escolheu o melhor caminho para a sua saúde. sem pressão.
      </Typography>
      <Box
        sx={{
          height: "100vh", // subtract navbar height (default AppBar is 64px)
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          overflowX: "hidden",
        }}
      >
        <img
          style={{ maxWidth: "200px", width: "100%", height: "auto" }}
          src={UtenteImage}
          alt="Utente"
        />
        <img
          style={{ maxWidth: "200px", width: "100%", height: "auto" }}
          src={BloodCuffImage}
          alt="Medição da Pressão Arterial"
        />
        <img
          style={{ maxWidth: "200px", width: "100%", height: "auto" }}
          src={ProfissionalImage}
          alt="Profissional de Saúde"
        />
      </Box>
    </Box>
  );
};

export default Home;
