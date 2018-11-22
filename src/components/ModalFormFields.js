import React from "react";

const ModalFormFields = ({
  children,
  title,
  isActive,
  onConfirm,
  onClose,
  errors
}) => {
  return (
    <div className={`modal ${isActive ? "active" : ""}`} id="modal">
      <span className="modal-overlay" aria-label="Close" onClick={onClose} />

      <form
        className="modal-container"
        name="modal-form"
        id="modal-form"
        onSubmit={onConfirm}
      >
        <div className="modal-header">
          <button
            className="btn btn-clear float-right"
            type="button"
            aria-label="Close"
            onClick={onClose}
          />
          <div className="modal-title h5">{title}</div>
        </div>
        <div className="modal-body">
          <div className="content">
            {children && React.cloneElement(children, { errors })}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-success" type="submit">
            Confirm
          </button>
          <button className="btn btn-error" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalFormFields;
