import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Loader } from "./components/Loader/Loader";
import { Navbar } from "./components/Navbar/Navbar";
import { getProfileAsync, getUsersAsync } from "./features/user/userSlice";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Bookmarks } from "./pages/bookmark/Bookmarks";
import { Explore } from "./pages/explore/Explore";
import { Home } from "./pages/home/Home";
import { PostDetails } from "./pages/post/PostDetails";
import { Profile } from "./pages/profile/Profile";
import { RequiresAuth } from "./utils/auth";

function App() {
  const { status, isLoggedIn } = useSelector((state) => state.user);
  const postStatus = useSelector((state) => state.post.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      dispatch(getProfileAsync()).then(() => navigate("/"));
    }
  }, [isLoggedIn, navigate, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getUsersAsync());
    }
  });

  return (
    <div className="container">
      {status === "loading" || postStatus === "loading" ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
