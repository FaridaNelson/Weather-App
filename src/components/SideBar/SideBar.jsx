import "./SideBar.css";
import avatar from "../../images/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={avatar}
        alt="Terrence Tegegne"
      ></img>
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
