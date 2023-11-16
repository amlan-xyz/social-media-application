import React from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Explore } from "./pages/explore/Explore";
import { Home } from "./pages/home/Home";
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
