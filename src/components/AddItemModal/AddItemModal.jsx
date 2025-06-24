import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function AddItemModal({ isOpen, onClose, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");

  const handleWeatherConditionChange = (e) => {
    setWeatherCondition(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItemModalSubmit({ name, link, weatherCondition });
    setName("");
    setLink("");
    setWeatherCondition("");
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={name}
      link={link}
      weatherCondition={weatherCondition}
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
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
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
          onChange={(e) => {
            setLink(e.target.value);
          }}
          value={link}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherCondition"
            value="hot"
            className="modal___radio-input"
            onChange={handleWeatherConditionChange}
            checked={weatherCondition === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherCondition"
            value="warm"
            className="modal___radio-input"
            onChange={handleWeatherConditionChange}
            checked={weatherCondition === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherCondition"
            value="cold"
            className="modal___radio-input"
            onChange={handleWeatherConditionChange}
            checked={weatherCondition === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
