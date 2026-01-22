import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${process.env.PUBLIC_URL}/assets/background.jpeg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="landing-page" style={backgroundStyle}>
      <div className="landing-content">
        {/* AI-Powered Agriculture Tag */}
        <div className="ai-tag">
          <span className="ai-tag-icon">⭐</span>
          <span className="ai-tag-text">AI-Powered Agriculture</span>
        </div>

        {/* Main Headline */}
        <h1 className="landing-headline">
          <span className="headline-text">Smart Crop</span>
          <span className="headline-gradient">Recommendation</span>
          <span className="headline-text">for Sustainable</span>
          <span className="headline-text">Agriculture</span>
        </h1>

        {/* Description */}
        <p className="landing-description">
          Leverage machine learning to analyze soil conditions and climate data, 
          getting personalized crop recommendations for maximum yield and sustainability.
        </p>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </div>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <button 
            className="cta-primary" 
            onClick={() => navigate("/crop-recommender")}
          >
            Get Crop Recommendation
          </button>
          <button 
            className="cta-secondary"
            onClick={() => navigate("/crop-recommender")}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;




