import "./ItemModal.css";
import closeIconWHT from "../../images/close-icon-WHT.svg";

function ItemModal({
  activeModal,
  onClose,
  card,
  setItemToDelete,
  setConfirmdeleteModalOpen,
}) {
  if (!card) return null;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeIconWHT}
            alt="Close modal"
            className="modal__close-img"
          />
        </button>
        <img src={card.imageUrl} alt="Card image" className="modal__image" />
        <div className="modal__footer">
          <div>
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={() => {
              setItemToDelete(card);
              setConfirmdeleteModalOpen(true);
            }}
            type="button"
            className="modal__delete-item-btn"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
