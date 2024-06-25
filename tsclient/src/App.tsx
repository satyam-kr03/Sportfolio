import "./App.css";
import LoginPage from "./pages/LoginPage";
import PlayerForm from "./pages/PlayerForm";
import OrganizerForm from "./pages/OrganizerForm";
import RegisterForm from "./pages/RegisterPage";
import { PlayerDashboard } from "./pages/PlayerDashboard";
import TestPage from "./pages/TestPage";
import ProfilePage from "./pages/ProfilePage";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import EventForm from "./pages/EventForm";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/register-player" element={<PlayerForm />} />
        <Route path="/register-organizer" element={<OrganizerForm />} />
        <Route path="/dashboard" element={<PlayerDashboard />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/new-event" element={<EventForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
