import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../component/Post/Post";
import { Sidebar } from "../../component/Sidebar/Sidebar";

import { useState } from "react";
import { NoPost } from "../../component/Empty/Empty";
import {
  changeAvatarAsync,
  editProfileAsync,
  followUserAsync,
  unfollowUserAsync,
} from "../../features/user/userSlice";
import "./Profile.css";

import { MdEdit } from "react-icons/md";

export const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { users, user } = useSelector((state) => state.user);
  const foundUser = users.find((user) => user.username === username);
  const [name, setName] = useState(foundUser.name);
  const [userName, setUserName] = useState(foundUser.username);
  const [img, setImg] = useState(foundUser.image.url);
  const { posts } = useSelector((state) => state.post);

  const [showEdit, setShowEdit] = useState(false);
  const [showAvatarForm, setShowAvatarForm] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      username: userName,
      profile_img: img,
    };
    dispatch(editProfileAsync(updatedData)).then(() =>
      navigate(`/profile/${user.username}`)
    );
    toggleForm();
  };

  const toggleForm = () => {
    setShowEdit(!showEdit);
  };

  const handleFollow = (userId) => {
    dispatch(followUserAsync(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(unfollowUserAsync(userId));
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatar(file);
      setAvatarPreview(reader.result);
    };
  };

  const handleAvatar = (e) => {
    e.preventDefault();
    dispatch(changeAvatarAsync(avatar));
    setAvatar("");
    setAvatarPreview("");
    setShowAvatarForm(false);
  };

  const toggleAvatarForm = () => {
    setShowAvatarForm(false);
    setAvatarPreview("");
  };

  return (
    <div className="layout">
      <Sidebar />
      <section className="content">
        <div className="user__container">
          <div className="avatar__container">
            <img
              className="profile__img"
              src={user.image ? user.image.url : "/images/demo.png"}
              alt="my profile pic"
            />
            <button onClick={() => setShowAvatarForm(true)}>
              <MdEdit />
            </button>
          </div>

          <div className="user__body">
            <div className="user__header">
              <h2>{foundUser.username}</h2>
              {foundUser.username === user.username ? (
                <button onClick={toggleForm} className="primary__btn">
                  Edit Profile
                </button>
              ) : (
                <>
                  {user.following.some(
                    ({ username }) => username === foundUser.username
                  ) ? (
                    <button
                      onClick={() => handleUnfollow(foundUser._id)}
                      className="primary__btn"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow(foundUser._id)}
                      className="primary__btn"
                    >
                      Follow
                    </button>
                  )}
                </>
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

        <>
          <hr />
          {foundUser.posts.length === 0 ? (
            <NoPost />
          ) : (
            <ul className="post__list">
              {posts?.map((post) =>
                post.author.username === foundUser.username ? (
                  <li className="home__item" key={post._id}>
                    <Post postId={post._id} />
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          )}
        </>
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
      {showAvatarForm && (
        <div className="modal">
          <div className="modal_wrapper"></div>
          <div className="modal_container">
            <div className="post__form-container">
              <div className="post__form-header">
                <button onClick={toggleAvatarForm}>
                  <AiOutlineClose />
                </button>
              </div>
              <form action="" className="post__form-body">
                <div className="post__form-item">
                  <label htmlFor="image">Image</label>
                  <input id="image" type="file" onChange={changeImageHandler} />
                </div>
                <div className="post__form-item">
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="preview"
                      width="100px"
                      height="100px"
                    ></img>
                  )}
                </div>
                <div className="post__form-item">
                  <button onClick={handleAvatar} className="submit__btn">
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
