import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/RegistrationPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
