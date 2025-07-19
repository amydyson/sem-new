import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import UtenteImage from "../assets/New-Utente.png";
import ProfissionalImage from "../assets/new-profissional.png";
import BloodCuffImage from "../assets/newest-one.png";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import SemPressaoIcon from "../assets/SEM-PRESSÃO-icon.png";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{ display: isMobile ? "flex" : "none", justifyContent: "center" }}
      >
        <img
          src={SemPressaoIcon}
          alt="Sem Pressão"
          style={{ maxWidth: "25px", height: "auto" }}
        />
      </Box>
      <Box
        sx={{ display: isMobile ? "none" : "flex", justifyContent: "flex-end" }}
      >
        <MenuSharpIcon sx={{ fontSize: "2rem" }} />
      </Box>
      <Typography
        sx={{
          marginTop: isMobile ? 2 : 5,
          fontSize: isMobile ? "1rem" : "1.5rem",
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
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          marginTop: isMobile ? 5 : 10,
          justifyContent: "center",
          alignItems: "center",
          gap: isMobile ? 2 : 10,
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            display: {
              xs: "none", // hide on small screens and up
              md: "flex", // show on medium screens and up (≥900px)
            },
          }}
        >
          <img
            style={{ maxWidth: "200px", height: "auto" }}
            src={BloodCuffImage}
            alt="Medição da Pressão Arterial"
          />
        </Box>
        <Box
          sx={{
            "&:hover": {
              filter: "brightness(1.1)",
              transition: "filter 0.2s",
            },
          }}
        >
          <img
            style={{
              cursor: "pointer",
              maxWidth: isMobile ? "150px" : "200px",
              width: "100%",
              height: "auto",
            }}
            src={UtenteImage}
            alt="Utente"
            onClick={() => navigate("/utente")}
          />
        </Box>
        <Box
          sx={{
            "&:hover": {
              filter: "brightness(1.1)",
              transition: "filter 0.2s",
            },
          }}
        >
          <img
            style={{
              cursor: "pointer",
              maxWidth: isMobile ? "150px" : "200px",
              width: "100%",
              height: "auto",
            }}
            src={ProfissionalImage}
            alt="Profissional de Saúde"
            onClick={() => navigate("/profissional-de-saúde")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
