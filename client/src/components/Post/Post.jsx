import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addCommentAsync,
  deletePostAsync,
  editPostAsync,
  likePostAsync,
  unlikePostAsync,
} from "../../features/post/postSlice";

import {
  addBookmarkAsync,
  removeBookmarkAsync,
} from "../../features/bookmarks/bookmarkSlice";

//icons
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegCommentAlt,
  FaRegHeart,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
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
      <div className="post__header">
        <div className="post__header-content">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt="woman profile"
          />
          <p>{post.author.username}. </p>
          <small>3h</small>
        </div>
        {user.username === post.author.username ? (
          <div className="post__header-btns">
            <button onClick={toggleForm}>
              <MdEdit />
            </button>
            <button onClick={() => handleDelete(post._id)}>
              <MdDelete />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="post__body">
        <img
          className="post__img"
          src="https://images.unsplash.com/photo-1613323593608-abc90fec84ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="a man in snow"
        />
        <div className="post__body-btns">
          <span>
            {post.likes.find(({ username }) => username === user.username) ? (
              <button onClick={() => handleUnLike(post._id)}>
                <FaHeart className="fill__red" />
              </button>
            ) : (
              <button onClick={() => handleLike(post._id)}>
                <FaRegHeart />
              </button>
            )}
            <button onClick={toggleCommentBox}>
              <FaRegCommentAlt />
            </button>
          </span>

          {bookmarks.find(({ _id }) => _id === post._id) ? (
            <button onClick={() => removeBookmark(post._id)}>
              <FaBookmark className="fill__accent" />
            </button>
          ) : (
            <button onClick={() => addBookmark(post._id)}>
              <FaRegBookmark />
            </button>
          )}
        </div>
        <div className="post__body-content">
          <p>{post.likes.length} likes.</p>
          <p>
            <span className="font__bold">{post.author.username}</span>
            {"  "}
            {post.caption}
          </p>
          <Link to={`/posts/${post._id}`}>
            View all {post.comments.length > 1 ? post.comments.length : ""}{" "}
            comments
          </Link>
        </div>
      </div>
      <></>
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
