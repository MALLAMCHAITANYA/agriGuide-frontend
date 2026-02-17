import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import LandingPage from "./pages/LandingPage";
import CropRecommender from "./pages/CropRecommender";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/crop-recommender" element={<CropRecommender />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
      <Chatbot />
    </>
  );
}
