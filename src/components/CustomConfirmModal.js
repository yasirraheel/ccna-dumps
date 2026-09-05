import React from "react";

function CustomConfirmModal({
  isOpen,
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning", // 'warning' | 'danger' | 'info' | 'success'
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (onCancel) {
      onCancel();
    } else if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className="custom-modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="custom-confirm-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-confirm-header">
          <div className="confirm-icon-wrap">
            {type === "danger" && <span className="icon-danger">⚠️</span>}
            {type === "warning" && <span className="icon-warning">⚠️</span>}
            {type === "info" && <span className="icon-info">ℹ️</span>}
            {type === "success" && <span className="icon-success">🎉</span>}
          </div>
          <h3 className="custom-confirm-title">{title}</h3>
        </div>

        <div className="custom-confirm-body">
          <p className="custom-confirm-message">{message}</p>
        </div>

        <div className="custom-confirm-actions">
          {Boolean(cancelText) && (
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onCancel || onConfirm}
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            className={`btn-modal-confirm ${
              type === "danger"
                ? "btn-confirm-danger"
                : type === "success"
                ? "btn-confirm-success"
                : "btn-confirm-primary"
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
