import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Bookmarks } from "./pages/bookmark/Bookmarks";
import { Explore } from "./pages/explore/Explore";
import { Home } from "./pages/home/Home";
import { PostDetails } from "./pages/post/PostDetails";
import { RequiresAuth } from "./utils/auth";
function App() {
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
