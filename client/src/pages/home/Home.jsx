import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Aside } from "../../component/Aside/Aside";
import { NoPost } from "../../component/Empty/Empty";
import { Post } from "../../component/Post/Post";
import { Sidebar } from "../../component/Sidebar/Sidebar";
import { fetchBookmarksAsync } from "../../features/bookmarks/bookmarkSlice";
import { getPostsAsync } from "../../features/post/postSlice";
import "./Home.css";
export const Home = () => {
  const { posts, status } = useSelector((state) => state.post);
  const userState = useSelector((state) => state.user);
  const bookmarkStatus = useSelector((state) => state.bookmark.status);

  const dispatch = useDispatch();

  const showPosts = posts.filter(
    ({ author }) =>
      author.username === userState.user.username ||
      userState.user?.following?.some(
        (follower) => follower.username === author.username
      )
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
    <div className="layout">
      <Sidebar />
      <section className="content">
        <div className="home__container">
          {showPosts.length === 0 ? (
            <NoPost />
          ) : (
            <ul className="post__list">
              {showPosts?.map((post) => (
                <li className="home__item" key={post._id}>
                  <Post postId={post._id} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Aside />
    </div>
  );
};
