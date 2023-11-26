import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  fetchUsers,
  followUser,
  loginUser,
  updateProfile,
} from "./userAPI";

const initialState = {
  status: "idle",
  isLoggedIn: false,
  token: localStorage.getItem("token") || null,
  user: {},
  users: [],
  error: null,
};

export const signupUserAsync = createAsyncThunk(
  "user/signupAsync",
  async (userData) => {
    const { data } = await createUser(userData);
    return data.user;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginAsync",
  async ({ username, password }) => {
    const { data } = await loginUser({ username, password });
    return data.user;
  }
);

export const followUserAsync = createAsyncThunk(
  "user/followUser",
  async (userId) => {
    const { data } = await followUser(userId);
    console.log(data);
  }
);

export const getUsersAsync = createAsyncThunk("user/fetchUsers", async () => {
  const { data } = await fetchUsers();
  return data.users;
});

export const editProfileAsync = createAsyncThunk(
  "user/editProfile",
  async (updatedData) => {
    const { data } = await updateProfile(updatedData);
    return data.profile;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [getUsersAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getUsersAsync.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.status = "success";
    },
    [getUsersAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [signupUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [signupUserAsync.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
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
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [loginUserAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [editProfileAsync.pending]: (state) => {
      state.status = "loading";
    },
    [editProfileAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedUser = action.payload;
      const userIdx = state.users.findIndex(
        ({ username }) => username === updatedUser.username
      );
      if (userIdx !== -1) {
        state.users[userIdx] = updatedUser;
      }
      state.user = updatedUser;
    },
    [editProfileAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
