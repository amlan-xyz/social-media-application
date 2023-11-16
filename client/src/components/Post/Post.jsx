import { useDispatch, useSelector } from "react-redux";
import { likePostAsync, unlikePostAsync } from "../../features/post/postSlice";
import "./Post.css";
export const Post = ({ postId }) => {
  const posts = useSelector((state) => state.post.posts);
  const post = posts.find((post) => post._id === postId);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleLike = (postId) => {
    dispatch(likePostAsync(postId));
  };

  const handleUnLike = (postId) => {
    dispatch(unlikePostAsync(postId));
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
    </div>
  );
};
