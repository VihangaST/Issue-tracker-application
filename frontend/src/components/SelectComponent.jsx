import React from "react";

function SelectComponent({ filter, onchange, options }) {
  return (
    <>
      <select
        className="mb-4 p-2 rounded border border-gray-300 mr-4"
        value={filter}
        onChange={onchange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectComponent;
