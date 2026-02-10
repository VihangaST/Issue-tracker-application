import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/RegistrationPage";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
