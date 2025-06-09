import "./ItemModal.css";
import closeIconWHT from "../../images/close-icon-WHT.svg";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIconWHT} alt="Close modal" />
        </button>
        <img src={card.link} alt="Card image" className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.wether}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
