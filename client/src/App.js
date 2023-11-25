import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { getUsersAsync } from "./features/user/userSlice";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Bookmarks } from "./pages/bookmark/Bookmarks";
import { Explore } from "./pages/explore/Explore";
import { Home } from "./pages/home/Home";
import { PostDetails } from "./pages/post/PostDetails";
import { Profile } from "./pages/profile/Profile";
import { RequiresAuth } from "./utils/auth";

function App() {
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.status === "idle") {
      dispatch(getUsersAsync());
    }
  }, [users, dispatch]);

  return (
    <div className="container">
      <Navbar />
      <div className="body">
        <Routes>
          <Route
            path="/"
            element={
              <RequiresAuth>
                <Home />
              </RequiresAuth>
            }
          />
          <Route
            path="/explore"
            element={
              <RequiresAuth>
                <Explore />
              </RequiresAuth>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <RequiresAuth>
                <Bookmarks />
              </RequiresAuth>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <RequiresAuth>
                <PostDetails />
              </RequiresAuth>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
