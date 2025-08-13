import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onOpenLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Validate the form (update isFormValid state)
  useEffect(() => {
    const { email, password, name, avatar } = formData;
    setIsFormValid(email && password && name && avatar && isValidUrl(avatar));
  }, [formData]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData); // Call parent onRegister function to handle registration logic
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="register-email" className="modal__label">
        Email *
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="register-email"
          className="modal__input"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password *
        <input
          type="password"
          id="register-password"
          className="modal__input"
          placeholder="Password"
          name="password"
          minLength="1"
          maxLength="30"
          autoComplete="off"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="user-name" className="modal__label">
        Name *
        <input
          type="text"
          name="name"
          className="modal__input"
          id="user-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          autoComplete="off"
          onChange={handleChange}
          value={formData.name}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL *
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={formData.avatar}
        />
        {!isValidUrl(formData.avatar) && formData.avatar && (
          <p className="error-message">Invalid URL</p>
        )}
      </label>
      <div className="modal__buttons">
        <button type="submit" className="modal__submit" disabled={!isFormValid}>
          Sign Up
        </button>
        <button type="button" className="modal__link" onClick={onOpenLogin}>
          or Sign In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
