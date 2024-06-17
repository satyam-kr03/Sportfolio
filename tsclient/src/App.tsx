import "./App.css";
import LoginPage from "./pages/LoginPage";
import PlayerForm from "./pages/PlayerForm";
import { SportsForm } from "./pages/SportsList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/player" element={<PlayerForm />} />
        <Route path="/sports" element={<SportsForm />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
