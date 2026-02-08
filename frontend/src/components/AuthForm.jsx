import React from "react";

const AuthForm = ({
  fields,
  values,
  onChange,
  onSubmit,
  handleClear,
  buttonText = "Submit",
  title = "Form",
}) => (
  <form
    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
    onSubmit={onSubmit}
  >
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
      {title}
    </h2>
    {fields.map((field) => (
      <div className="mb-4" key={field.name}>
        <label htmlFor={field.name} className="block text-gray-700 mb-2">
          {field.label}
        </label>
        <input
          type={field.type}
          id={field.name}
          name={field.name}
          value={values[field.name]}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required={field.required}
        />
      </div>
    ))}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
    >
      {buttonText}
    </button>
    <button
      type="button"
      className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition-colors font-semibold mt-2"
      onClick={handleClear}
    >
      Clear
    </button>
  </form>
);

export default AuthForm;
