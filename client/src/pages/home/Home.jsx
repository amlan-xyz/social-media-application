import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../../components/Post/Post";
import { fetchBookmarksAsync } from "../../features/bookmarks/bookmarkSlice";
import { getPostsAsync } from "../../features/post/postSlice";
import "./Home.css";
export const Home = () => {
  const { posts, status } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const bookmarkStatus = useSelector((state) => state.bookmark.status);

  const dispatch = useDispatch();

  const showPosts = posts.filter(
    ({ author }) =>
      author.username === user.username ||
      user?.following?.some((follower) => follower.username === author.username)
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPostsAsync());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (bookmarkStatus === "idle") {
      dispatch(fetchBookmarksAsync());
    }
  }, [dispatch, bookmarkStatus]);

  return (
    <div className="container">
      <h1>Home page</h1>
      <ul>
        {showPosts?.map((post) => (
          <li key={post._id}>
            <Post postId={post._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
