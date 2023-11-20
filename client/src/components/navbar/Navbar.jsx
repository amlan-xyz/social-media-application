import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";

//icons
import { CiLogin, CiLogout } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";

import "./Navbar.css";
export const Navbar = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navbar">
      <header className="nav__header">
        <NavLink className="no__decoration" to="/">
          Social
          <IoShareSocialOutline />
        </NavLink>
      </header>

      <ul className="nav__body">
        {status === "logged_in" ? (
          <>
            <li className="nav__item">
              <button className="nav__link" onClick={handleLogout}>
                <CiLogout className="nav__icon" />
              </button>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li className="nav__item">
              <NavLink to="/login" className="nav__link">
                <CiLogin className="nav__icon" />
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
