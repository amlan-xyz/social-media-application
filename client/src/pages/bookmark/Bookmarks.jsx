import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/Post/Post";
import { fetchBookmarksAsync } from "../../features/bookmarks/bookmarkSlice";
export const Bookmarks = () => {
  const { bookmarks, status } = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") dispatch(fetchBookmarksAsync());
  }, [dispatch, status]);

  return (
    <div className="bookmarks">
      <h1>Bookmarks</h1>
      <ul>
        {bookmarks?.map((post) => (
          <li key={post._id}>
            <Post postId={post._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
