import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { BASE_URL } from "../config";

function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const fields = [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handleRegistration function
  const handleRegistration = async (e) => {
    e.preventDefault();
    alert("Registration button clicked!");
    // check password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        console.log("Registration successful:", data.message);
        navigate("/login");
      } else {
        console.log("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <AuthForm
          fields={fields}
          values={formData}
          onChange={handleChange}
          onSubmit={handleRegistration}
          handleClear={handleClear}
          buttonText="Register"
          title="Register"
        />
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button
            className="text-cyan-600 hover:underline focus:outline-none"
            onClick={() => navigate("/login")}
            type="button"
          >
            Login here
          </button>
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;
