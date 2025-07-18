import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Utente from "./components/Utente";
import ProfissionalDeSaúde from "./components/ProfissionalDeSaúde";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/utente" element={<Utente />} />
            <Route
              path="/profissional-de-saúde"
              element={<ProfissionalDeSaúde />}
            />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
