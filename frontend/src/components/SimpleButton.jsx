import React from "react";

function SimpleButton({ onClick, title, color }) {
  const colorClasses = {
    default: "bg-gray-300 text-gray-800 hover:bg-gray-200",
    primary: "bg-cyan-700 text-white hover:bg-cyan-600",
  };

  const colorClass = colorClasses[color];
  return (
    <button
      type="button"
      className={`px-5 py-2 rounded font-semibold border-none cursor-pointer transition-colors duration-150 ${colorClass} `}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default SimpleButton;
