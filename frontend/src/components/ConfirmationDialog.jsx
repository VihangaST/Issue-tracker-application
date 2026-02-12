import React from "react";
import SimpleButton from "./SimpleButton";

function ConfirmationDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/30 flex items-center justify-center z-2000">
      <div className="bg-white p-6 rounded-lg min-w-[320px] shadow-lg">
        <div className="mb-4 text-gray-900 text-base">{message}</div>
        <div className="flex justify-end gap-3">
          <SimpleButton onClick={onCancel} title="No" color="default" />
          <SimpleButton onClick={onConfirm} title="Yes" color="primary" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
