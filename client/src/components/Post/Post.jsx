import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAsync,
  editPostAsync,
  likePostAsync,
  unlikePostAsync,
} from "../../features/post/postSlice";
import "./Post.css";
export const Post = ({ postId }) => {
  const posts = useSelector((state) => state.post.posts);
  const post = posts.find((post) => post._id === postId);
  const user = useSelector((state) => state.auth.user);
  const [editCaption, setEditCaption] = useState(post.caption);
  const [showEditForm, setShowEditForm] = useState(false);

  const dispatch = useDispatch();

  const handleLike = (postId) => {
    dispatch(likePostAsync(postId));
  };

  const handleUnLike = (postId) => {
    dispatch(unlikePostAsync(postId));
  };

  const handleDelete = (postId) => {
    dispatch(deletePostAsync(postId));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedData = {
      caption: editCaption,
    };
    dispatch(editPostAsync({ postId: post._id, updatedData }));
    toggleForm();
  };

  const toggleForm = () => {
    setShowEditForm(!showEditForm);
  };

  return (
    <div className="post__container">
      <h3>{post.caption}</h3> ||
      <small>by:- {post.author.username}</small> ||
      <p>Likes : {post.likes.length}</p> ||
      {post.likes.find(({ username }) => username === user.username) ? (
        <button onClick={() => handleUnLike(post._id)}>Unlike</button>
      ) : (
        <button onClick={() => handleLike(post._id)}>Like</button>
      )}
      ||
      {user.username === post.author.username ? (
        <>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
          ||
          <button onClick={toggleForm}>Edit</button>
        </>
      ) : (
        ""
      )}
      <>
        {showEditForm && (
          <div className="modal">
            <div className="modal_wrapper"></div>
            <div className="modal_container">
              <button onClick={toggleForm}>Close</button>
              <form action="">
                <div className="form__item">
                  <label htmlFor="caption">Caption</label>
                  <input
                    type="text"
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                  />
                </div>
                <div className="form__item">
                  <button onClick={handleEdit}>Edit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
