import React, { useState } from "react";
import SelectComponent from "./SelectComponent";
import useFormStore from "../store/useFormStore";

import ConfirmationDialog from "./ConfirmationDialog";

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

  // states to manage confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const handleConfirm = () => {
    setFormData({ ...formData, status: pendingStatus });
    setConfirmOpen(false);
    setPendingStatus(null);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
    setPendingStatus(null);
  };

  // Handle on change all form data
  const handleChange = (e) => {
    if (
      e.target.name === "status" &&
      e.target.value === "resolved" &&
      formData.status !== "resolved"
    ) {
      setPendingStatus(e.target.value);
      setConfirmOpen(true);
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 flex items-center justify-center z-[1000]">
        <div className="bg-white p-6 rounded-lg min-w-[320px] shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-transparent border-none text-2xl cursor-pointer leading-none text-gray-700 hover:text-red-500 focus:outline-none"
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
            {/* show Edit button in view mode */}
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
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
      <ConfirmationDialog
        open={confirmOpen}
        message="Are you sure you want to mark this issue as Resolved?"
        onConfirm={handleConfirm}
        onCancel={handleConfirmCancel}
      />
    </>
  );
};

export default Modal;
