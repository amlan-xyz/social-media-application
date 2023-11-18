import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addBookmark, fetchBookmarks, removeBookmark } from "./bookmarkAPI";

const initialState = {
  status: "idle",
  bookmarks: [],
  eror: null,
};

export const fetchBookmarksAsync = createAsyncThunk(
  "user/bookmarks",
  async () => {
    const { data } = await fetchBookmarks();
    return data.bookmarks;
  }
);

export const addBookmarkAsync = createAsyncThunk(
  "post/addBookmark",
  async (postId) => {
    const { data } = await addBookmark(postId);
    return data.bookmark;
  }
);

export const removeBookmarkAsync = createAsyncThunk(
  "post/removeBookmark",
  async (postId) => {
    const { data } = await removeBookmark(postId);
    return data.bookmark;
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBookmarksAsync.pending]: (state) => {
      state.status = "loading";
    },
    [fetchBookmarksAsync.fulfilled]: (state, action) => {
      state.bookmarks = action.payload;
      state.status = "success";
    },
    [fetchBookmarksAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addBookmarkAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addBookmarkAsync.fulfilled]: (state, action) => {
      state.bookmarks.push(action.payload);
      state.status = "success";
    },
    [addBookmarkAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [removeBookmarkAsync.pending]: (state) => {
      state.status = "loading";
    },
    [removeBookmarkAsync.fulfilled]: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        ({ _id }) => _id !== action.payload._id
      );
      state.status = "success";
    },
    [removeBookmarkAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default bookmarkSlice.reducer;
