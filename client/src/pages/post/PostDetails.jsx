import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import {
  addCommentAsync,
  deletePostAsync,
  editPostAsync,
  likePostAsync,
  removeCommentAsync,
  unlikePostAsync,
} from "../../features/post/postSlice";

import {
  addBookmarkAsync,
  removeBookmarkAsync,
} from "../../features/bookmarks/bookmarkSlice";

import { useState } from "react";
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
import "./PostDetails.css";

export const PostDetails = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.post.posts);
  const { user } = useSelector((state) => state.user);
  const foundPost = posts.find(({ _id }) => _id === id);
  const { bookmarks } = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  const [editCaption, setEditCaption] = useState(foundPost.caption);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");

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
    dispatch(editPostAsync({ postId: foundPost._id, updatedData }));
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
    dispatch(addCommentAsync({ postId: foundPost._id, comment: commentText }));
    toggleCommentBox();
    setCommentText("");
  };

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleDeleteComment = (postId, commentId) => {
    dispatch(removeCommentAsync({ postId, commentId }));
  };

  return (
    <div className="layout">
      <Sidebar />
      <section className="content">
        <div className="post__container">
          <div className="post__header">
            <div className="post__header-content">
              <img
                src={
                  foundPost.author.profile_img
                    ? foundPost.author.profile_img
                    : "/images/demo.png"
                }
                alt={foundPost.author.username}
              />
              <p>
                <Link
                  className="no__decoration"
                  to={`/profile/${foundPost.author.username}`}
                >
                  {foundPost.author.username}.
                </Link>
              </p>
              <small>3h</small>
            </div>
            {user.username === foundPost.author.username ? (
              <div className="post__header-btns">
                <button onClick={toggleForm}>
                  <MdEdit />
                </button>
                <button onClick={() => handleDelete(foundPost._id)}>
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
                {foundPost.likes.find(
                  ({ username }) => username === user.username
                ) ? (
                  <button onClick={() => handleUnLike(foundPost._id)}>
                    <FaHeart className="fill__red" />
                  </button>
                ) : (
                  <button onClick={() => handleLike(foundPost._id)}>
                    <FaRegHeart />
                  </button>
                )}
                <button onClick={toggleCommentBox}>
                  <FaRegCommentAlt />
                </button>
              </span>

              {bookmarks.find(({ _id }) => _id === foundPost._id) ? (
                <button onClick={() => removeBookmark(foundPost._id)}>
                  <FaBookmark className="fill__accent" />
                </button>
              ) : (
                <button onClick={() => addBookmark(foundPost._id)}>
                  <FaRegBookmark />
                </button>
              )}
            </div>
            <div className="post__body-content">
              <p>{foundPost.likes.length} likes.</p>
              <p>
                <span className="font__bold">{foundPost.author.username}</span>
                {"  "}
                {foundPost.caption}
              </p>
            </div>
          </div>
        </div>
        <div className="post__comments">
          <p>Comments :</p>
          <ul className="comments__list">
            {foundPost?.comments.map(({ _id, comment, comment_by }) => (
              <>
                <hr />
                <li className="comments__list-item" key={_id}>
                  <div className="comment__header">
                    <div className="comment__header-content">
                      <img
                        src={
                          comment_by.profile_img
                            ? comment_by.profile_img
                            : "/images/demo.png"
                        }
                        alt={comment_by.username}
                      />
                      <p>
                        <Link
                          className="no__decoration"
                          to={`/profile/${comment_by.username}`}
                        >
                          {comment_by.username}.
                        </Link>
                      </p>
                    </div>
                    {user.username === comment_by.username ? (
                      <button
                        className="comment__delete-btn"
                        onClick={() => handleDeleteComment(foundPost._id, _id)}
                      >
                        <MdDelete />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="comment__body">{comment}</p>
                </li>
              </>
            ))}
            <hr />
          </ul>
        </div>
      </section>
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
