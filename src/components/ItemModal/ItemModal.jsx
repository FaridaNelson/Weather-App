import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import closeIconWHT from "../../images/close-icon-WHT.svg";
import useEscapeClose from "../../hooks/useEscapeClose";
import "./ItemModal.css";

function ItemModal({
  selectedCard,
  activeModal,
  onClose,
  card,
  setItemToDelete,
  setConfirmDeleteModalOpen,
}) {
  const isOpen = activeModal === "preview";
  const ctx = useContext(CurrentUserContext);
  const currentUser = ctx?.user?.data ?? ctx?.user ?? ctx ?? null;

  // Hook to close modal on Escape key press
  useEscapeClose(isOpen, onClose);

  const item = card ?? selectedCard;
  if (!isOpen || !item?._id) return null;

  const ownerId = String(item?.owner?._id ?? item?.owner ?? "");
  const currentUserId = String((currentUser?.data ?? currentUser)?._id ?? "");
  const isOwn = Boolean(currentUserId && ownerId && ownerId === currentUserId);

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
        <img
          src={item.imageUrl}
          alt={item.name ? `${item.name} item` : "Clothing item"}
          className="modal__image"
        />
        <div className="modal__footer">
          <div>
            <p className="modal__caption">{item.name}</p>
            <p className="modal__weather">Weather: {item.weather}</p>
          </div>
          {isOwn && (
            <button
              onClick={() => {
                setItemToDelete(item);
                setConfirmDeleteModalOpen(true);
              }}
              type="button"
              className="modal__delete-item-btn"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
