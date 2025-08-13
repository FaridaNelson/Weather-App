import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  user,
  isLoggedIn,
  onOpenLogin,
  onOpenRegister,
  onProfileClick,
}) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const safeUser = user?.data ?? user ?? null;
  const name = safeUser?.name || safeUser?.email || "User";

  const initial = (name?.trim?.()[0] || "?").toUpperCase();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}
          {weatherData?.city ? `, ${weatherData.city}` : ""}
        </p>
      </div>

      <div className="header__nav">
        <ToggleSwitch
          currentTemperatureUnit={currentTemperatureUnit}
          onToggle={handleToggleSwitchChange}
        />
        {isLoggedIn ? (
          <div className="header__user-container">
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <Link
              to="/profile"
              className="header__profile-link"
              onClick={onProfileClick}
            >
              <p className="header__user-name">{name}</p>
              {safeUser?.avatar ? (
                <span className="header__avatar-wrap">
                  <img
                    className="header__user-avatar"
                    src={safeUser.avatar}
                    alt={`${name}'s avatar`}
                  />
                </span>
              ) : (
                <div
                  className="header__user-avatar header__user-avatar--placeholder"
                  aria-label="User avatar placeholder"
                >
                  {initial}
                </div>
              )}
            </Link>
          </div>
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={onOpenRegister}
              type="button"
              className="header__register-btn"
            >
              Sign Up
            </button>
            <button
              onClick={onOpenLogin}
              type="button"
              className="header__login-btn"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
