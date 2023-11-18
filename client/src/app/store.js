import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import bookmarkSlice from "../features/bookmarks/bookmarkSlice";
import postSlice from "../features/post/postSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    auth: authSlice,
    bookmark: bookmarkSlice,
  },
});
