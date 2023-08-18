import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/home";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};