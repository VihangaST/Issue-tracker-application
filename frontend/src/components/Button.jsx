import React from "react";

function Button({ onClickFunction, name }) {
  return (
    <>
      <button
        className="mb-4 rounded bg-cyan-700 text-white font-semibold hover:bg-cyan-600 w-40 h-8"
        onClick={onClickFunction}
      >
        {name}
      </button>
    </>
  );
}

export default Button;
