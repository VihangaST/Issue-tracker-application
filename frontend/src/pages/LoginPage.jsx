import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { BASE_URL } from "../config";
function LoginPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const fields = [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          console.log("Received token:", data.token);
          setToken(data.token);
        }
        alert(data.message);
        console.log("Login successful:", data.message);
        navigate("/dashboard");
      } else {
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <AuthForm
          fields={fields}
          values={formData}
          onChange={handleChange}
          onSubmit={handleLogin}
          handleClear={handleClear}
          buttonText="Login"
          title="Login"
        />
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            className="text-cyan-600 hover:underline focus:outline-none"
            onClick={() => navigate("/register")}
            type="button"
          >
            Register here
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
