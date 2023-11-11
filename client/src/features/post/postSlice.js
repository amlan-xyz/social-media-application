import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postAPI";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const getPostsAsync = createAsyncThunk("post/fetchPosts", async () => {
  const { data } = await fetchPosts();
  return data.posts;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [getPostsAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getPostsAsync.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "success";
    },
    [getPostsAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default postSlice.reducer;
