import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPost, fetchPosts, likePost, unlikePost } from "./postAPI";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const getPostsAsync = createAsyncThunk("post/fetchPosts", async () => {
  const { data } = await fetchPosts();
  return data.posts;
});

export const createPostAsync = createAsyncThunk(
  "post/createPost",
  async ({ caption, image }) => {
    const { data } = await createPost({ caption, image });
    return data.post;
  }
);

export const likePostAsync = createAsyncThunk(
  "post/likePost",
  async (postId) => {
    const data = await likePost(postId);
    return data.post;
  }
);

export const unlikePostAsync = createAsyncThunk(
  "post/unlikePost",
  async (postId) => {
    const data = await unlikePost(postId);
    return data.post;
  }
);

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
    [createPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
      state.status = "success";
    },
    [createPostAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [likePostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [likePostAsync.fulfilled]: (state, action) => {
      const updatedPost = action.payload;
      const postIdx = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIdx !== -1) {
        state.posts[postIdx] = updatedPost;
      }
      state.status = "success";
    },
    [likePostAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Error liking post";
    },
    [unlikePostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [unlikePostAsync.fulfilled]: (state, action) => {
      const updatedPost = action.payload;
      const postIdx = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIdx !== -1) {
        state.posts[postIdx] = updatedPost;
      }
      state.status = "success";
    },
    [unlikePostAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Error unliking post";
    },
  },
});

export default postSlice.reducer;
