import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiFillFire, AiOutlineFire } from "react-icons/ai";
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
  const [trending, setTrending] = useState(false);
  const [allPosts, setAllPost] = useState([]);
  const dispatch = useDispatch();

  const showPosts = posts.filter(
    ({ author }) =>
      author.username === userState.user.username ||
      userState.user?.following?.some(
        (follower) => follower.username === author.username
      )
  );

  const sortPosts = () => {
    setTrending(!trending);
    if (trending) {
      const posts = showPosts.sort(
        (a, b) => Number(b.likes.length) - Number(a.likes.length)
      );
      setAllPost(posts);
    } else {
      setAllPost(showPosts);
    }
  };

  useEffect(() => {
    sortPosts();
  }, []);

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
        {allPosts.length !== 0 ? (
          <div className="filter__container">
            <p>Show trending :</p>

            <button
              className="filter__btn"
              onClick={() => {
                sortPosts();
              }}
            >
              {trending ? (
                <AiOutlineFire />
              ) : (
                <AiFillFire className="fill__orange" />
              )}
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="home__container">
          {allPosts.length === 0 ? (
            <NoPost />
          ) : (
            <ul className="post__list">
              {allPosts?.map((post) => (
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
