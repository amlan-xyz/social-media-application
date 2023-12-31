import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { AiOutlineClose } from "react-icons/ai";
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegCommentAlt,
  FaRegHeart,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Post.css";

import { formatDate } from "../../utils/formatDate";

export const Post = ({ postId }) => {
  const posts = useSelector((state) => state.post.posts);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const post = posts.find((post) => post._id === postId);
  const user = useSelector((state) => state.user.user);
  const [editCaption, setEditCaption] = useState(post.caption);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = (postId) => {
    dispatch(likePostAsync(postId));
  };

  const handleUnLike = (postId) => {
    dispatch(unlikePostAsync(postId));
  };

  const handleDelete = (postId) => {
    dispatch(deletePostAsync(postId)).then(() => {
      navigate("/");
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedData = {
      caption: editCaption,
    };
    dispatch(editPostAsync({ postId: post._id, updatedData }));
    toggleForm();
    setEditCaption("");
  };

  const toggleForm = () => {
    setShowEditForm(!showEditForm);
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
    setCommentText("");
  };

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  return (
    <div className="post__container">
      <div className="post__header">
        <div className="post__header-content">
          <img
            src={
              post.author.image.url ? post.author.image.url : "/images/demo.png"
            }
            alt={post.author.username}
          />
          <p>
            <Link
              className="no__decoration color__accent"
              to={`/profile/${post.author.username}`}
            >
              {post.author.username}.
            </Link>
          </p>
          <small>{formatDate(post.createdAt)}</small>
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
        <img className="post__img" src={post.image.url} alt={post.caption} />
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
          {post.comments.length > 0 ? (
            <Link to={`/posts/${post._id}`}>
              View all {post.comments.length > 1 ? post.comments.length : ""}{" "}
              comments
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <>
        {showEditForm && (
          <div className="modal">
            <div className="modal_wrapper"></div>
            <div className="modal_container">
              <div className="post__form-container">
                <div className="post__form-header">
                  <button onClick={toggleForm}>
                    <AiOutlineClose />
                  </button>
                </div>
                <form className="post__form-body">
                  <div className="post__form-item">
                    <label htmlFor="caption">Edit Caption</label>
                    <input
                      type="text"
                      onChange={(e) => setEditCaption(e.target.value)}
                      placeholder={editCaption}
                      value={editCaption}
                    />
                  </div>
                  <div className="post__form-item">
                    <button className="submit__btn" onClick={handleEdit}>
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
      <>
        {showCommentBox && (
          <div className="modal">
            <div className="modal_wrapper"></div>
            <div className="modal_container">
              <div className="post__form-container">
                <div className="post__form-header">
                  <button onClick={toggleCommentBox}>
                    <AiOutlineClose />
                  </button>
                </div>
                <form className="post__form-body">
                  <div className="post__form-item">
                    <label htmlFor="comment">Comment</label>
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Comment your thoughts...."
                    />
                  </div>
                  <div className="post__form-item">
                    <button className="submit__btn" onClick={handleComment}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
