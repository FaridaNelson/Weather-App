import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    if (typeof onCardClick === "function") {
      onCardClick(item);
    } else {
      console.warn("onCardClick is not a function", onCardClick);
    }
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <h2 className="card__name">{item.name}</h2>
      <img
        // onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
