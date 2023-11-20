import { useState } from "react";
import { Link } from "react-router-dom";
import { NewPost } from "../Forms/NewPost";

//icons
import { FaCompass, FaHome, FaUser } from "react-icons/fa";
import { IoBookmarkSharp } from "react-icons/io5";

import "./Sidebar.css";
export const Sidebar = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="sidebar__container">
        <div className="sidebar__body">
          <button className="sidebar__post-btn" onClick={toggleForm}>
            <span>Create post</span>
          </button>
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <Link className="sidebar__link" to="/">
                <FaHome /> <span>Home</span>
              </Link>
            </li>
            <li className="sidebar__item">
              <Link className="sidebar__link" to="/explore">
                <FaCompass />
                <span>Explore</span>
              </Link>
            </li>
            <li className="sidebar__item">
              <Link className="sidebar__link" to="/bookmarks">
                <IoBookmarkSharp />
                <span>Bookmarks</span>
              </Link>
            </li>
            <li className="sidebar__item">
              <Link className="sidebar__link" to="/profile">
                <FaUser />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar__footer">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt="a women profile"
          />
          <div className="sidebar__footer-body">
            <p>Amlan</p>
            <span>@weird</span>
          </div>
        </div>
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
