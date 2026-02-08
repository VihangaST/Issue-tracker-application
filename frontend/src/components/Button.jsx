import React from "react";

function Button({ onClickFunction, name }) {
  return (
    <>
      <button
        className="mb-4 p-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 w-full md:w-auto"
        onClick={onClickFunction}
      >
        {name}
      </button>
    </>
  );
}

export default Button;
