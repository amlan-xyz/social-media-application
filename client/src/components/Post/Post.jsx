import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentAsync,
  deletePostAsync,
  editPostAsync,
  likePostAsync,
  unlikePostAsync,
} from "../../features/post/postSlice";

import { Link } from "react-router-dom";
import {
  addBookmarkAsync,
  removeBookmarkAsync,
} from "../../features/bookmarks/bookmarkSlice";
import "./Post.css";

export const Post = ({ postId }) => {
  const posts = useSelector((state) => state.post.posts);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const post = posts.find((post) => post._id === postId);
  const user = useSelector((state) => state.auth.user);
  const [editCaption, setEditCaption] = useState(post.caption);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
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
    setEditCaption("");
  };

  const addBookmark = (postId) => {
    dispatch(addBookmarkAsync(postId));
  };

  const removeBookmark = (postId) => {
    dispatch(removeBookmarkAsync(postId));
  };

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addCommentAsync({ postId: post._id, comment: commentText }));
    toggleCommentBox();
  };

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
    setCommentText("");
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
      ||
      {bookmarks.find(({ _id }) => _id === post._id) ? (
        <button onClick={() => removeBookmark(post._id)}>
          Remove bookmark
        </button>
      ) : (
        <button onClick={() => addBookmark(post._id)}>Save</button>
      )}
      ||
      <>
        <button onClick={toggleCommentBox}>Comment</button>
        ||
        <Link to={`/posts/${post._id}`}>View comments</Link>
      </>
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
      <>
        {showCommentBox && (
          <div className="modal">
            <div className="modal_wrapper"></div>
            <div className="modal_container">
              <button onClick={toggleCommentBox}>Close</button>
              <form action="">
                <div className="form__item">
                  <label htmlFor="comment">Comment</label>
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
                <div className="form__item">
                  <button onClick={handleComment}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
