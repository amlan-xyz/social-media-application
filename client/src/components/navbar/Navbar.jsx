import { IoShareSocialOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <div className="navbar">
      <header className="nav__header">
        Social
        <IoShareSocialOutline />
      </header>

      <ul className="nav__body">
        <li className="nav__item">
          <NavLink className="nav__link">Home</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/explore" className="nav__link">
            Explore
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link">Profile</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/signup" className="nav__link">
            Signup
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
