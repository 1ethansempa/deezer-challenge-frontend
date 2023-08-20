import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/home";
import Artist from "../pages/artist";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:id" element={<Artist />} />
      </Routes>
    </Router>
  );
};
