import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeCommentAsync } from "../../features/post/postSlice";

export const PostDetails = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.post.posts);
  const { user } = useSelector((state) => state.auth);
  const foundPost = posts.find(({ _id }) => _id === id);

  const dispatch = useDispatch();

  const handleDelete = (postId, commentId) => {
    dispatch(removeCommentAsync({ postId, commentId }));
  };

  return (
    <div className="post__details-container">
      {foundPost?.caption}
      <p>Comments:</p>
      <ul>
        {foundPost?.comments.map(({ _id, comment, comment_by }) => (
          <li key={_id}>
            <p>
              {comment} by {comment_by.username}{" "}
            </p>
            {user.username === comment_by.username ? (
              <button onClick={() => handleDelete(foundPost._id, _id)}>
                Delete comment
              </button>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
