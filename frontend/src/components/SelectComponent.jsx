import React from "react";
import useFormStore from "../store/useFormStore";

function SelectComponent({ filter, onChange, name, options, isEdit }) {
  return (
    <>
      <select
        className="mb-4 px-2 rounded border border-gray-300 w-full md:w-40 h-8 custom-select"
        value={filter}
        name={name}
        onChange={onChange}
        disabled={!isEdit}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="custom-option"
          >
            {option.label}
          </option>
        ))}
      </select>
      <style>{`
        select.custom-select option.custom-option:hover {
          background-color: #e5e7eb !important; /* Tailwind gray-200 */
          color: #111827 !important; /* Tailwind gray-900 */
        }
      `}</style>
    </>
  );
}

export default SelectComponent;
