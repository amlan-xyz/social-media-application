import React from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/navbar/Navbar";
import { Signup } from "./pages/auth/Signup";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <div className="main">
      <Navbar />
      <div className="main__body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
