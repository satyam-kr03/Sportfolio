import { Routes, Route } from "react-router-dom"
import './App.css'
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage"
import Layout from "./Layout"
import RegisterPage from "./pages/Register"
import ProfilePage from "./pages/AccountPage"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import OrganizePage from "./pages/OrganizePage"

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/organize" element={<OrganizePage />} />
          <Route path="/account/:subpage?" element={<ProfilePage />} />
          <Route path="*" element={<h1>Not Found</h1>} />


        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
