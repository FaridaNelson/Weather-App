import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  cards,
  onCardClick,
  handleAddClick,
  handleCardDelete,
  onOpenEditProfile,
  onLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onOpenEditProfile} onLogout={onLogout} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={cards}
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          handleCardDelete={handleCardDelete}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
