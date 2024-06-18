import "./App.css";
import LoginPage from "./pages/LoginPage";
import PlayerForm from "./pages/PlayerForm";
import { TestPage } from "./pages/TestPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/playerform" element={<PlayerForm />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
