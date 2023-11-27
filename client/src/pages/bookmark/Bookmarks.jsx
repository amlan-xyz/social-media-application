import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Aside } from "../../components/Aside/Aside";
import { NoBookmarks } from "../../components/Empty/Empty";
import { Post } from "../../components/Post/Post";
import { Sidebar } from "../../components/Sidebar/Sidebar";
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
