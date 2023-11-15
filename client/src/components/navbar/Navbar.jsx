import { IoShareSocialOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
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
        Social
        <IoShareSocialOutline />
      </header>

      <ul className="nav__body">
        <li className="nav__item">
          <NavLink to="/" className="nav__link">
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/explore" className="nav__link">
            Explore
          </NavLink>
        </li>
        {status === "logged_in" ? (
          <>
            <li className="nav__item">
              <NavLink to="/profile" className="nav__link">
                Profile
              </NavLink>
            </li>
            <li className="nav__item">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li className="nav__item">
              <NavLink to="/signup" className="nav__link">
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
