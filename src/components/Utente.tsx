import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Switch,
  TextField,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AvatarImage from "../assets/avatar.png";

const Utente = () => {
  const [gender, setGender] = useState("Masculino");
  const [age, setAge] = useState("");
  const [smoker, setSmoker] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [imc, setImc] = useState("");
  const [bloodPressureHigh] = useState(130);
  const [] = useState(80);
  const [targetPressure] = useState(160);
  const [exercise, setExercise] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleGenderChange = (
    _event: any,
    newGender: React.SetStateAction<string> | null
  ) => {
    if (newGender !== null) {
      setGender(newGender);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#E3F2FD",
        p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          backgroundColor: "white",
          maxWidth: isMobile ? 400 : 900,
          width: "100%",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 4,
            }}
          >
            {/* Avatar Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: isMobile ? "auto" : 200,
                backgroundColor: "#E3F2FD",
                borderRadius: 2,
                p: 3,
              }}
            >
              <img
                src={AvatarImage}
                alt="Avatar"
                style={{
                  width: isMobile ? 60 : 120,
                  marginBottom: 16,
                }}
              />
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  fontWeight: "bold",
                  color: "#666",
                  textAlign: "center",
                }}
              >
                CRIE O SEU AVATAR
              </Typography>
            </Box>

            {/* Form Section */}
            <Box sx={{ flex: 1 }}>
              {/* Gender Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, color: "#666", fontWeight: "bold" }}
                >
                  Género
                </Typography>
                <ToggleButtonGroup
                  value={gender}
                  exclusive
                  onChange={handleGenderChange}
                  sx={{ width: "100%" }}
                >
                  <ToggleButton
                    value="Masculino"
                    sx={{
                      flex: 1,
                      backgroundColor:
                        gender === "Masculino" ? "#4FC3F7" : "white",
                      color: gender === "Masculino" ? "white" : "#666",
                      "&.Mui-selected": {
                        backgroundColor: "#4FC3F7",
                        color: "white",
                      },
                    }}
                  >
                    Masculino
                  </ToggleButton>
                  <ToggleButton
                    value="Feminino"
                    sx={{
                      flex: 1,
                      backgroundColor:
                        gender === "Feminino" ? "#4FC3F7" : "white",
                      color: gender === "Feminino" ? "white" : "#666",
                      "&.Mui-selected": {
                        backgroundColor: "#4FC3F7",
                        color: "white",
                      },
                    }}
                  >
                    Feminino
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* Age and Smoker Row */}
              <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "#666", fontWeight: "bold" }}
                  >
                    Idade
                  </Typography>
                  <TextField
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ backgroundColor: "#f5f5f5" }}
                  />
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "#666", fontWeight: "bold" }}
                  >
                    Fumador
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Switch
                      checked={smoker}
                      onChange={(e) => setSmoker(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#4FC3F7",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#4FC3F7",
                          },
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Weight, Height, IMC */}
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "#666", fontWeight: "bold" }}
                  >
                    Peso
                  </Typography>
                  <TextField
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ backgroundColor: "#f5f5f5" }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "#666", fontWeight: "bold" }}
                  >
                    Altura
                  </Typography>
                  <TextField
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ backgroundColor: "#f5f5f5" }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "#666", fontWeight: "bold" }}
                  >
                    IMC
                  </Typography>
                  <TextField
                    value={imc}
                    onChange={(e) => setImc(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ backgroundColor: "#f5f5f5" }}
                  />
                </Box>
              </Box>

              {/* Blood Pressure */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, color: "#666", fontWeight: "bold" }}
                >
                  Tensão Arterial Alvo
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 1, flexWrap: "wrap" }}>
                  <Box
                    sx={{
                      backgroundColor: "#4FC3F7",
                      color: "white",
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      minWidth: 100,
                      textAlign: "center",
                    }}
                  >
                    ≤ {bloodPressureHigh}/80
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#4FC3F7",
                      color: "white",
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      minWidth: 100,
                      textAlign: "center",
                    }}
                  >
                    ≤ 140/90
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#f5f5f5",
                      color: "#666",
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      border: "1px solid #ccc",
                      minWidth: 100,
                      textAlign: "center",
                    }}
                  >
                    ={targetPressure}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ alignSelf: "center", color: "#666", ml: 1 }}
                  >
                    mmHg
                  </Typography>
                </Box>
              </Box>

              {/* Exercise */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "#666", maxWidth: "70%", fontWeight: "bold" }}
                >
                  Pratica atividade física/caminha 30 minutos por dia?
                </Typography>
                <Switch
                  checked={exercise}
                  onChange={(e) => setExercise(e.target.checked)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#4FC3F7",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#4FC3F7",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Utente;
