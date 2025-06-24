import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardDelete,
}) {
  return (
    <div className="clothes__section">
      <div className="clothes__section_nav-bar">
        <p className="clothes__section_nav-bar_name">Your items</p>
        <button
          type="button"
          onClick={() => {
            console.log("Add button clicked");
            handleAddClick();
          }}
          className="clothes__section_nav-bar_add-clothes-btn"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__card-list">
        {(clothingItems || []).map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            handleCardDelete={handleCardDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
