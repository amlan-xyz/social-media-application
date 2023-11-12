import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./authAPI";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const signupUserAsync = createAsyncThunk(
  "auth/signupAsync",
  async (userData) => {
    const { data } = await createUser(userData);
    return data.user;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ username, password }) => {
    const { data } = await loginUser({ username, password });
    return data.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signupUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [signupUserAsync.fulfilled]: (state, action) => {
      state.status = "logged_in";
      state.user = action.payload;
    },
    [signupUserAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [loginUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [loginUserAsync.fulfilled]: (state, action) => {
      state.status = "logged_in";
      state.user = action.payload;
    },
    [loginUserAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;
