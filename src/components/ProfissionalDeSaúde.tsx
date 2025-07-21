import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MedicationIcon from "@mui/icons-material/Medication"; // Best pill icon

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: "#C8860D",
  borderRadius: "8px",
  overflow: "hidden",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  border: "1px solid #B8860B",
  textAlign: "center",
  padding: "12px 8px",
}));

const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #B8860B",
  textAlign: "center",
  padding: "12px 8px",
  backgroundColor: "#E6F3FF",
  color: "#333",
}));

const IconBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#C8860D",
  borderRadius: "8px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "120px",
  color: "white",
  marginRight: "20px",
  minWidth: "140px",
}));

const ProfissionalDeSaude = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Sample data for the medication table
  const medications = [
    {
      dci: "Amlodipina",
      doseDiaria: "5-10mg",
      frequencia: "1x/dia",
      semiVida: "35-50h",
      efeitoAbsorcao: "Alimentos não afetam",
      efeitosAdversos: "Edema, rubor",
    },
    {
      dci: "Enalapril",
      doseDiaria: "5-40mg",
      frequencia: "2x/dia",
      semiVida: "11h",
      efeitoAbsorcao: "Tomar em jejum",
      efeitosAdversos: "Tosse seca, hipercalemia",
    },
    {
      dci: "Losartan",
      doseDiaria: "50-100mg",
      frequencia: "1-2x/dia",
      semiVida: "6-9h",
      efeitoAbsorcao: "Pode tomar com alimentos",
      efeitosAdversos: "Tonturas, hipercalemia",
    },
    {
      dci: "Hidroclorotiazida",
      doseDiaria: "12.5-25mg",
      frequencia: "1x/dia",
      semiVida: "6-12h",
      efeitoAbsorcao: "Tomar de manhã",
      efeitosAdversos: "Hipocalemia, hiperuricemia",
    },
    {
      dci: "Propranolol",
      doseDiaria: "80-320mg",
      frequencia: "2-3x/dia",
      semiVida: "3-6h",
      efeitoAbsorcao: "Tomar com alimentos",
      efeitosAdversos: "Bradicardia, broncoespasmo",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#E6F3FF",
        p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: isMobile ? "100%" : "1200px",
          width: "100%",
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "flex-start",
            mb: 3,
          }}
        >
          {/* Icon Section */}
          <IconBox>
            <MedicationIcon
              sx={{
                fontSize: 40,
                mb: 2,
                color: "white",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: isMobile ? "1rem" : "1.2rem",
              }}
            >
              SOS Consulta
            </Typography>
          </IconBox>

          {/* Table Section */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Typography
              variant="h5"
              sx={{
                backgroundColor: "#C8860D",
                color: "white",
                p: 2,
                textAlign: "center",
                fontWeight: "bold",
                borderRadius: "8px 8px 0 0",
                mb: 0,
              }}
            >
              Características dos principais fármacos anti-hipertensores
              disponíveis em Portugal
            </Typography>

            <StyledTableContainer component={Paper} elevation={0}>
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#B8860B" }}>
                    <StyledTableCell>DCI</StyledTableCell>
                    <StyledTableCell>Dose diária</StyledTableCell>
                    <StyledTableCell>Frequência</StyledTableCell>
                    <StyledTableCell>Semi-vida</StyledTableCell>
                    <StyledTableCell>
                      Efeito da alimentação na absorção
                    </StyledTableCell>
                    <StyledTableCell>Efeitos adversos</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medications.map((med, index) => (
                    <TableRow key={index}>
                      <StyledTableBodyCell sx={{ fontWeight: "bold" }}>
                        {med.dci}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {med.doseDiaria}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {med.frequencia}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>{med.semiVida}</StyledTableBodyCell>
                      <StyledTableBodyCell sx={{ fontSize: "0.8rem" }}>
                        {med.efeitoAbsorcao}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell sx={{ fontSize: "0.8rem" }}>
                        {med.efeitosAdversos}
                      </StyledTableBodyCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfissionalDeSaude;
