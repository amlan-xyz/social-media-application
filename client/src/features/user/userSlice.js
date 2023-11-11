import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUsers } from "./userAPI";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const getUsersAsync = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetchUsers();
  return response.data;
});

export const addUserAsync = createAsyncThunk(
  "user/createUserAsync",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.status = "success";
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addUserAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.users.push(action.payload);
    },
    [addUserAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
