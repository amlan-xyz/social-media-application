import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post } from "../../components/Post/Post";
import { Sidebar } from "../../components/Sidebar/Sidebar";

import { useState } from "react";
import { editProfileAsync } from "../../features/user/userSlice";
import "./Profile.css";

export const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { users, user } = useSelector((state) => state.user);
  const foundUser = users.find((user) => user.username === username);
  const [name, setName] = useState(foundUser.name);
  const [userName, setUserName] = useState(foundUser.username);
  const [img, setImg] = useState(foundUser.profile_img);

  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      username: userName,
      profile_img: img,
    };
    dispatch(editProfileAsync(updatedData));
    toggleForm();
  };

  const toggleForm = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div className="layout">
      <Sidebar />
      <section className="content">
        <div className="user__container">
          <img
            className="profile__img"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt="my profile pic"
          />
          <div className="user__body">
            <div className="user__header">
              <h2>{foundUser.username}</h2>
              {foundUser.username === user.username ? (
                <button onClick={toggleForm} className="primary__btn">
                  Edit Profile
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="user__stats">
              <p>{foundUser.posts.length} posts</p>
              <p>{foundUser.followers.length} followers</p>
              <p>{foundUser.following.length} following</p>
            </div>
            <div className="user__details">
              <p>{foundUser.name}</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>

        <ul className="post__list">
          {foundUser.posts?.map((post) => (
            <li className="home__item" key={post._id}>
              <Post postId={post._id} />
            </li>
          ))}
        </ul>
      </section>
      {showEdit && (
        <div className="modal">
          <div className="modal_wrapper"></div>
          <div className="modal_container">
            <div className="post__form-container">
              <div className="post__form-header">
                <button onClick={toggleForm}>
                  <AiOutlineClose />
                </button>
              </div>
              <form action="" className="post__form-body">
                <div className="post__form-item">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder={foundUser.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="post__form-item">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder={foundUser.username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="post__form-item">
                  <label htmlFor="image">Image</label>
                  <input
                    id="image"
                    type="text"
                    placeholder={foundUser.profile_img}
                    onChange={(e) => setImg(e.target.value)}
                  />
                </div>
                <div className="post__form-item">
                  <button onClick={handleEdit} className="submit__btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
