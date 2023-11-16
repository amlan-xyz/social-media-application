import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../../components/Post/Post";
import { getPostsAsync } from "../../features/post/postSlice";
import "./Home.css";
export const Home = () => {
  const { posts, status } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

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

  return (
    <div className="container">
      <h1>Home page</h1>
      <ul>
        {showPosts?.map((post) => (
          <li key={post._id}>
            <Post data={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};
