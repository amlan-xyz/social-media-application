import { configureStore } from "@reduxjs/toolkit";
import bookmarkSlice from "../features/bookmarks/bookmarkSlice";
import postSlice from "../features/post/postSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,

    bookmark: bookmarkSlice,
  },
});
