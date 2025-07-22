import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Utente from "./components/Utente";
import ProfissionalDeSaúde from "./components/ProfissionalDeSaúde";
import BloodPressureMaze from "./components/GameContainer";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Router basename="/sem-new">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/utente" element={<Utente />} />
            <Route
              path="/profissional-de-saúde"
              element={<ProfissionalDeSaúde />}
            />
            <Route path="/game" element={<BloodPressureMaze />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
