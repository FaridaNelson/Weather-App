import closeIcon from "../../images/close-icon.svg";
import "./ModalWithForm.css";
import useEscapeClose from "../../hooks/useEscapeClose";

function ModalWithForm({
  isOpen,
  title,
  buttonText,
  children,
  onClose,
  onSubmit,
  isFormValid,
}) {
  useEscapeClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close modal" className="modal__close-img" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
