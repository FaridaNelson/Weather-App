import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeButton from "../../images/like-button.svg";
import likeButtonActive from "../../images/like-active.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const ctx = useContext(CurrentUserContext);
  const currentUser = ctx?.user?.data ?? ctx?.user ?? ctx ?? null;
  const isLoggedIn = Boolean(currentUser?._id);

  const rawLikes = Array.isArray(item?.likes) ? item.likes : [];
  const likeIds = rawLikes.map((id) =>
    id && typeof id === "object" && id.toString
      ? id.toString()
      : String(id ?? "")
  );

  const isLiked = isLoggedIn && likeIds.includes(String(currentUser._id));

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike?.(item);
  };

  const likeBtnClass = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleCardClick = () => {
    if (typeof onCardClick === "function") {
      onCardClick(item);
    } else {
      console.warn("onCardClick is not a function", onCardClick);
    }
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__image-wrap">
        {/* overlay header */}
        <div className="card__overlay">
          <span className="card__title">{item.name}</span>

          {isLoggedIn && (
            <button
              type="button"
              aria-pressed={isLiked}
              aria-label={isLiked ? "Unlike" : "Like"}
              className={`card__like ${isLiked ? "card__like--active" : ""}`}
              onClick={handleLike}
              title={isLiked ? "Unlike" : "Like"}
            ></button>
          )}
        </div>

        <img className="card__image" src={item.imageUrl} alt={item.name} />
      </div>
    </li>
  );
}

export default ItemCard;
