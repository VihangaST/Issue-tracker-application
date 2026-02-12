import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import logo from "../assets/logo.png";

function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-cyan-700 shadow-md px-4 py-2 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center">
        <img alt="Your Company" src={logo} className="h-8 w-auto" />
        <span className="ml-2 text-xl font-bold text-white">Issue Tracker</span>
      </div>
      <button
        className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </nav>
  );
}

export default Navbar;
