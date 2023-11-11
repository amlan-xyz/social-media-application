import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <div className="explore__container">
      <h1>Explore page</h1>
    </div>
  );
};
