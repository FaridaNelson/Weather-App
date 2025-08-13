import React, { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const items = Array.isArray(clothingItems)
    ? clothingItems
    : Array.isArray(clothingItems?.data)
    ? clothingItems.data
    : [];

  const myItems = useMemo(() => {
    if (!currentUser?._id) return [];
    return items.filter((c) => {
      const ownerId = typeof c.owner === "string" ? c.owner : c.owner?._id;
      return ownerId === currentUser._id;
    });
  }, [items, currentUser]);

  return (
    <div className="clothes__section">
      <div className="clothes__section_nav-bar">
        <p className="clothes__section_nav-bar_name">Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes__section_nav-bar_add-clothes-btn"
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__card-list">
        {myItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            handleCardDelete={handleCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </ul>

      {currentUser?._id && myItems.length === 0 && (
        <p className="clothes__empty">You haven’t added any items yet.</p>
      )}
    </div>
  );
}

export default ClothesSection;
