import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, fetchProfile, loginUser } from "./authAPI";

const initialState = {
  token: localStorage.getItem("token") || null,
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

export const getProfileAsync = createAsyncThunk(
  "auth/getProfile",
  async (req, res) => {
    const { data } = await fetchProfile();
    return data.profile;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.status = "logged_out";
    },
  },
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
    [getProfileAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getProfileAsync.fulfilled]: (state, action) => {
      state.status = "logged_in";
      state.user = action.payload;
    },
    [getProfileAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;
export const { logoutUser } = authSlice.actions;
