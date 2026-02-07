import React from "react";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-4 py-2 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="h-8 w-auto"
        />
        <span className="ml-2 text-xl font-bold text-gray-800">
          Issue Tracker
        </span>
      </div>
      <button
        className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600"
        onClick={() => alert("Logged out!")}
      >
        Log Out
      </button>
    </nav>
  );
}

export default Navbar;
