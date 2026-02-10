import React from "react";
import SelectComponent from "./SelectComponent";
import useFormStore from "../store/useFormStore";

const Modal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  title,
  isEdit,
  setIsEdit,
}) => {
  if (!show) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <button
          onClick={onClose}
          style={closeButtonStyle}
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <form
          className="bg-white p-2 rounded-lg shadow-md w-full max-w-md"
          onSubmit={onSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {title}
          </h2>

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Issue Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              readOnly={!isEdit}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              readOnly={!isEdit}
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <label htmlFor="status" className="block text-gray-700 mb-2">
                Status
              </label>
              <SelectComponent
                filter={formData.status}
                onChange={handleChange}
                name="status"
                options={[
                  { label: "Open", value: "open" },
                  { label: "In Progress", value: "in progress" },
                  { label: "Resolved", value: "resolved" },
                ]}
                isEdit={isEdit}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="priority" className="block text-gray-700 mb-2">
                Priority
              </label>
              <SelectComponent
                filter={formData.priority}
                onChange={handleChange}
                name="priority"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                ]}
                isEdit={isEdit}
              />
            </div>
          </div>
          {/* Show Edit button in view mode */}
          {!isEdit && (
            <button
              type="button"
              className="mb-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors font-semibold"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}

          {isEdit && (
            <button
              type="submit"
              className="mb-4 w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-600 transition-colors font-semibold"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: 24,
  borderRadius: 8,
  minWidth: 320,
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: 24,
  cursor: "pointer",
  lineHeight: 1,
  color: "#333",
};
export default Modal;
