import { useState } from "react";
import { Link } from "react-router-dom";
import { NewPost } from "../Forms/NewPost";
import "./Sidebar.css";
export const Sidebar = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="sidebar__container">
        <button onClick={toggleForm}>Create post</button>
        <ul className="sidbear__list">
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/">
              Home
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/explore">
              Explore
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/bookmarks">
              Bookmarks
            </Link>
          </li>
        </ul>
      </div>
      {showForm && (
        <div className="modal">
          <div className="modal_wrapper"></div>
          <div className="modal_container">
            <button onClick={toggleForm}>Close</button>
            <NewPost />
          </div>
        </div>
      )}
    </>
  );
};
