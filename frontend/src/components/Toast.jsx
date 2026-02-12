import React, { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 min-w-[250px] px-4 py-4 rounded-lg text-white z-[9999] flex items-center justify-between gap-4 shadow-lg ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="bg-transparent border-none text-white text-2xl cursor-pointer focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
