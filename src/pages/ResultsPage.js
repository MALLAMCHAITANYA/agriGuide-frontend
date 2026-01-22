import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CropCard from "../components/CropCard";
import "./ResultsPage.css";

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const recommendations = location.state?.recommendations || [];

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${process.env.PUBLIC_URL}/assets/background.jpeg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  };

  if (recommendations.length === 0) {
    return (
      <div className="results-page" style={backgroundStyle}>
        <div className="empty-results-container">
          <h2 className="empty-results-title">⚠️ Please Enter Details First</h2>
          <p className="empty-results-message">
            You need to fill in the crop prediction form on the Home page to see results.
          </p>
          <button className="back-btn" onClick={() => navigate("/")}>
            ⬅ Go to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page" style={backgroundStyle}>
      <h1 className="results-title">🌾 Top 3 Recommended Crops</h1>

      {/* 🔥 SIDE-BY-SIDE LAYOUT */}
      <div className="results-grid">
        {recommendations.map((item, index) => (
          <div className={`grid-item rank-${index + 1}`} key={index}>
            <CropCard
              crop={item.crop.toLowerCase()}
              confidence={item.confidence}
              rank={index + 1}
            />
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Prediction
      </button>
    </div>
  );
}

export default ResultsPage;
