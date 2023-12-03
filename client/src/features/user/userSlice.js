import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createUser,
  fetchProfile,
  fetchUsers,
  followUser,
  loginUser,
  unfollowUser,
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

export const getProfileAsync = createAsyncThunk("user/getProfile", async () => {
  const { data } = await fetchProfile();
  return data.profile;
});

export const followUserAsync = createAsyncThunk(
  "user/followUser",
  async (userId) => {
    const { data } = await followUser(userId);
    return data;
  }
);

export const unfollowUserAsync = createAsyncThunk(
  "user/unfollowUser",
  async (userId) => {
    const { data } = await unfollowUser(userId);
    return data;
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
      state.status = "success";
      state.isLoggedIn = true;
      state.user = action.payload;
      state.users.push(action.payload);
      toast.success("Signup successful");
    },
    [signupUserAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.success("Signup failed");
    },
    [loginUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [loginUserAsync.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.status = "success";
      toast.success("Login successful");
    },
    [loginUserAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.error("Login Failed");
    },
    [getProfileAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getProfileAsync.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.status = "success";
      state.user = action.payload;
    },
    [getProfileAsync.rejected]: (state, action) => {
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
      toast.success("Profile Updated");
    },
    [editProfileAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.error("Failed to update profile");
    },
    [followUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [followUserAsync.fulfilled]: (state, action) => {
      const updatedUser = action.payload.user;
      const updatedFollowUser = action.payload.followUser;
      state.user = updatedUser;
      const userIdx = state.users.findIndex(
        ({ username }) => username === updatedFollowUser.username
      );
      state.users[userIdx] = updatedFollowUser;
      state.status = "success";
      toast.success("User followed");
    },
    [followUserAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.error("Failed to follow");
    },
    [unfollowUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [unfollowUserAsync.fulfilled]: (state, action) => {
      const updatedUser = action.payload.user;
      const updatedFollowUser = action.payload.unfollowUser;
      state.user = updatedUser;
      const userIdx = state.users.findIndex(
        ({ username }) => username === updatedFollowUser.username
      );
      state.users[userIdx] = updatedFollowUser;
      state.status = "success";
      toast.success("User unfollowed");
    },
    [unfollowUserAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      toast.error("Failed to unfollow");
    },
  },
});

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
