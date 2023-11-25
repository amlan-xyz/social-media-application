import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Aside } from "../../components/Aside/Aside";
import { Post } from "../../components/Post/Post";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { getPostsAsync } from "../../features/post/postSlice";
import "./Explore.css";

export const Explore = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);

  useEffect(() => {
    if (post.status === "idle") {
      dispatch(getPostsAsync());
    }
  }, [dispatch, post]);

  return (
    <div className="layout">
      <Sidebar />
      <section className="content">
        <div className="explore__container">
          <ul className="post__list">
            {post?.posts?.map((post) => (
              <li key={post._id}>
                <Post postId={post._id} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Aside />
    </div>
  );
};
