import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  const ctx = useContext(CurrentUserContext);
  const user = ctx?.user?.data ?? ctx?.user ?? ctx?.data ?? ctx ?? null;

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || "");
      setAvatar(user.avatar || "");
    }
  }, [isOpen, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Edit profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={Boolean(name)}
      buttonText={isLoading ? "Saving changes..." : "Save changes"}
    >
      <label className="modal__label">
        Name *
        <input
          className="modal__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://..."
        />
      </label>
    </ModalWithForm>
  );
}
