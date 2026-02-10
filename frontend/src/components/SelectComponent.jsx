import React from "react";
import useFormStore from "../store/useFormStore";

function SelectComponent({ filter, onChange, name, options, isEdit }) {
  return (
    <>
      <select
        className="mb-4 px-2 rounded border border-gray-300 mr-4 w-full md:w-56 h-8"
        value={filter}
        name={name}
        onChange={onChange}
        disabled={!isEdit}
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
