import React from "react";

function CustomConfirmModal({
  isOpen,
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning", // 'warning' | 'danger' | 'info'
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-backdrop" onClick={onCancel}>
      <div
        className="custom-confirm-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-confirm-header">
          <div className="confirm-icon-wrap">
            {type === "danger" && <span className="icon-danger">⚠️</span>}
            {type === "warning" && <span className="icon-warning">⚠️</span>}
            {type === "info" && <span className="icon-info">ℹ️</span>}
          </div>
          <h3 className="custom-confirm-title">{title}</h3>
        </div>

        <div className="custom-confirm-body">
          <p className="custom-confirm-message">{message}</p>
        </div>

        <div className="custom-confirm-actions">
          <button
            type="button"
            className="btn-modal-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`btn-modal-confirm ${
              type === "danger" ? "btn-confirm-danger" : "btn-confirm-primary"
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomConfirmModal;
