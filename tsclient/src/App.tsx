import "./App.css";
import LoginPage from "./pages/LoginPage";
import PlayerForm from "./pages/PlayerForm";
import OrganizerForm from "./pages/OrganizerForm";
import { PlayerDashboard } from "./pages/PlayerDashboard";
import TestPage from "./pages/TestPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register-player" element={<PlayerForm />} />
        <Route path="/register-organizer" element={<OrganizerForm />} />
        <Route path="/dashboard" element={<PlayerDashboard />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;