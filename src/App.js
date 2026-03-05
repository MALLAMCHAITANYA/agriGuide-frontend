import { Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";

import MarketDashboard from "./components/MarketDashboard";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import CropRecommender from "./pages/CropRecommender";
import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/crop-recommender" element={<CropRecommender />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/market" element={<MarketDashboard />} />

      </Routes>
      <Chatbot />
    </>
  );
}
