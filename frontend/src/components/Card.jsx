import React from "react";

function Card({ title, count, color }) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between p-4 sm:p-8 rounded-lg shadow-md w-full sm:w-1/3 h-32 sm:h-24 ${color}`}
    >
      <span className="text-lg sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-0">{title}</span>
      <span className="text-4xl sm:text-6xl md:text-7xl font-bold">{count}</span>
    </div>
  );
}

export default Card;
