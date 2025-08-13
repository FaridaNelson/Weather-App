import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

export default function SideBar({ onEditProfile, onLogout }) {
  const ctx = useContext(CurrentUserContext);
  const user = ctx?.user?.data ?? ctx?.user ?? ctx ?? null;

  const name = user?.name || user?.email || "User";
  const avatar = user?.avatar || "";

  const initial = (name?.trim?.()[0] || "?").toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        {avatar ? (
          <span className="sidebar__avatar-wrap">
            <img
              className="sidebar__avatar-img"
              src={avatar}
              alt={`${name}'s avatar`}
            />
          </span>
        ) : (
          <span className="sidebar__avatar-wrap">
            <span className="sidebar__avatar-placeholder">{initial}</span>
          </span>
        )}
        <span className="sidebar__name">{name}</span>
      </div>

      <div className="sidebar__btns">
        <button
          type="button"
          className="sidebar__btn"
          onClick={() => {
            onEditProfile?.();
          }}
        >
          Change profile data
        </button>

        <button
          type="button"
          className="sidebar__btn sidebar__btn--danger"
          onClick={onLogout}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
