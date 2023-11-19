import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Aside } from "./components/Aside/Aside";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Bookmarks } from "./pages/bookmark/Bookmarks";
import { Explore } from "./pages/explore/Explore";
import { Home } from "./pages/home/Home";
import { PostDetails } from "./pages/post/PostDetails";
import { RequiresAuth } from "./utils/auth";
function App() {
  return (
    <div className="main">
      <Navbar />
      <Sidebar />
      <div className="main__body">
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
      <Aside />
      <Footer />
    </div>
  );
}

export default App;
