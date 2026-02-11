import React from "react";

function Button({ onClickFunction, name, color }) {
  const colorClasses = {
    cyan1: "bg-cyan-700 hover:bg-cyan-600",
    cyan2: "bg-cyan-500 hover:bg-cyan-400",
    gray: "bg-gray-700 hover:bg-gray-600",
  };
  const selectedColor = colorClasses[color] || colorClasses.cyan;
  return (
    <button
      className={`mb-4 rounded text-white font-semibold w-40 h-8 ${selectedColor}`}
      onClick={onClickFunction}
    >
      {name}
    </button>
  );
}

export default Button;
