import React from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Explore } from "./pages/explore/Explore";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <div className="main">
      <Navbar />
      <div className="main__body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
