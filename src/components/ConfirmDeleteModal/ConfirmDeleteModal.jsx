import "./ConfirmDeleteModal.css";
import closeIcon from "../../images/close-icon.svg";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content_delete-confirm">
        <p className="modal__content_delete-confirm_message">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__content_delete-confirm_message">
          This action is irreversible.
        </p>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close modal" className="modal__close-img" />
        </button>
        <div className="modal__content_delete-confirm_buttons">
          <button
            type="submit"
            className="modal__content_delete-confirm_submit-button"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="modal__delete-item_cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
