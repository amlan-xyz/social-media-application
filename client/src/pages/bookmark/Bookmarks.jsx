import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Aside } from "../../component/Aside/Aside";
import { NoBookmarks } from "../../component/Empty/Empty";
import { Post } from "../../component/Post/Post";
import { Sidebar } from "../../component/Sidebar/Sidebar";
import { fetchBookmarksAsync } from "../../features/bookmarks/bookmarkSlice";
export const Bookmarks = () => {
  const { bookmarks, status } = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") dispatch(fetchBookmarksAsync());
  }, [dispatch, status]);

  return (
    <div className="layout">
      <Sidebar />
      <section className="content">
        {bookmarks?.length === 0 ? (
          <NoBookmarks />
        ) : (
          <ul className="post__list">
            {bookmarks?.map((post) => (
              <li key={post._id}>
                <Post postId={post._id} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <Aside />
    </div>
  );
};
