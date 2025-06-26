import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import React from "react";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, onClose, onAddItemModalSubmit, buttonText }) {
  const { values, handleChange, setValues } = useForm({ name: "", link: "" });
  const [weatherCondition, setWeatherCondition] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const valid =
      values.name.trim().length >= 1 &&
      isValidUrl(values.link) &&
      weatherCondition !== "";
    setIsFormValid(valid);
  }, [values, weatherCondition]);

  const handleWeatherConditionChange = (e) => {
    setWeatherCondition(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      name: values.name,
      link: values.link,
      weatherCondition,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", link: "" });
      setWeatherCondition("");
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="clothing-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="clothing-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          autoComplete="off"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="link"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.link}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              id={type}
              type="radio"
              name="weatherCondition"
              value={type}
              className="modal___radio-input"
              onChange={handleWeatherConditionChange}
              checked={weatherCondition === type}
            />{" "}
            {type[0].toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
