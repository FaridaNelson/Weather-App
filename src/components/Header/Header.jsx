import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__nav">
        <ToggleSwitch
          currentTemperatureUnit={currentTemperatureUnit}
          onToggle={handleToggleSwitchChange}
        />
        <div className="header__user-container">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <p className="header__user-name">Terrence Tegegne</p>
            <img
              className="header__user-avatar"
              src={avatar}
              alt="Terrence Tegegne"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
