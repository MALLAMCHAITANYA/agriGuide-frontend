import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isRecommender = location.pathname === "/crop-recommender";
  const isResults = location.pathname === "/results";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <span className="navbar-icon">🌾</span>
          <span className="navbar-title">AgriGuide</span>
          <span className="navbar-tagline">Smart Crop Recommendation</span>
        </div>
        
        <div className="navbar-links">
          <button
            className={`nav-link ${isHome ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className={`nav-link ${isRecommender ? "active" : ""}`}
            onClick={() => navigate("/crop-recommender")}
          >
            Crop Recommender
          </button>
          <button
            className={`nav-link ${isResults ? "active" : ""}`}
            onClick={() => navigate("/results")}
          >
            Results
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

