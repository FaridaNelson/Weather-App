import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onOpenRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate the form (update isFormValid state)
  useEffect(() => {
    const { email, password } = formData;
    setIsFormValid(email && password);
  }, [formData]); // Re-run validation when formData changes

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData); // Call parent onLogin function to handle login logic
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log In"
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="login-email"
          placeholder="Email"
          className="modal__input"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          id="login-password"
          placeholder="Password"
          className="modal__input"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <div className="modal__buttons">
        <button type="submit" className="modal__submit" disabled={!isFormValid}>
          Log In
        </button>
        <button type="button" className="modal__link" onClick={onOpenRegister}>
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
