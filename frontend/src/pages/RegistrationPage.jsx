import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { BASE_URL } from "../config";
import Toast from "../components/Toast";

function RegistrationPage() {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

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

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handleRegistration function
  const handleRegistration = async (e) => {
    e.preventDefault();

    // check password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setToast({
        open: true,
        message: "Passwords do not match!",
        type: "error",
      });
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
        setToast({ open: true, message: data.message, type: "success" });
        navigate("/");
      } else {
        setToast({ open: true, message: data.message, type: "error" });
      }
    } catch (error) {
      setToast({
        open: true,
        message: "Network or unexpected error",
        type: "error",
      });
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
      {toast.open && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}
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
            onClick={() => navigate("/")}
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
