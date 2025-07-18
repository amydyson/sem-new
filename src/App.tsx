import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Utente from "./components/Utente";
import ProfissionalDeSaúde from "./components/ProfissionalDeSaúde";
// import Utente from "./components/Utente";
// import ProfissionalDeSaude from "./components/ProfissionalDeSaude";
function App() {
  return (
    <>
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
    </>
  );
}

export default App;
