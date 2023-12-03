import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createPostAsync } from "../../features/post/postSlice";

//icons
import { AiOutlineClose } from "react-icons/ai";
import { FaCompass, FaHome, FaUser } from "react-icons/fa";
import { IoBookmarkSharp } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import "./Sidebar.css";
export const Sidebar = () => {
  const [showForm, setShowForm] = useState(false);

  const { user } = useSelector((state) => state.user);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(
      createPostAsync({
        caption,
        image,
      })
    );
    setCaption("");
    setImage("");
  };

  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "#2B2A4C" : "",
  });

  return (
    <>
      <div className="sidebar__container">
        <div className="sidebar__body">
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <button
                className="sidebar__post-btn sidebar__link"
                onClick={toggleForm}
              >
                <MdAddBox className="sidebar__icon" />
                <span>Create post</span>
              </button>
            </li>
            <li className="sidebar__item">
              <NavLink style={getActiveStyle} className="sidebar__link" to="/">
                <FaHome className="sidebar__icon" /> <span>Home</span>
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink
                style={getActiveStyle}
                className="sidebar__link"
                to="/explore"
              >
                <FaCompass className="sidebar__icon" />
                <span>Explore</span>
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink
                style={getActiveStyle}
                className="sidebar__link"
                to="/bookmarks"
              >
                <IoBookmarkSharp className="sidebar__icon" />
                <span>Bookmarks</span>
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink
                style={getActiveStyle}
                className="sidebar__link"
                to={`/profile/${user?.username}`}
              >
                <FaUser className="sidebar__icon" />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar__footer">
          <img
            src={user.profile_img ? user.profile_img : "/images/demo.png"}
            alt={user.name}
          />
          <div className="sidebar__footer-body">
            <p>{user.name}</p>
            <span>{user.username}</span>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="modal">
          <div className="modal_wrapper"></div>
          <div className="modal_container">
            <div className="post__form-container ">
              <div className="post__form-header">
                <button onClick={toggleForm}>
                  <AiOutlineClose />
                </button>
              </div>
              <form className="post__form-body">
                <div className="post__form-item">
                  <label htmlFor="caption">Caption</label>
                  <input
                    type="text"
                    id="caption"
                    onChange={(e) => setCaption(e.target.value)}
                    value={caption}
                  />
                </div>
                <div className="post__form-item">
                  <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                  />
                </div>
                <div className="post__form-item">
                  <button className="submit__btn" onClick={handleForm}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
