import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: "🌾",
      title: "Smart Recommendations",
      description: "AI-powered analysis for optimal crop selection"
    },
    {
      icon: "📊",
      title: "Data-Driven Insights",
      description: "Real-time soil and climate analysis"
    },
    {
      icon: "🌱",
      title: "Sustainable Growth",
      description: "Maximize yield while protecting the environment"
    }
  ];

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="background-animation">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="landing-content">
          {/* Badge */}
          <div className="ai-tag">
            <span className="ai-tag-icon">✨</span>
            <span className="ai-tag-text">Next-Gen Agricultural AI</span>
          </div>

          {/* Main Headline */}
          <h1 className="landing-headline">
            Grow Smarter,
            <span className="headline-gradient"> Harvest Better</span>
          </h1>

          {/* Description */}
          <p className="landing-description">
            Unlock the power of artificial intelligence to make informed crop decisions. 
            Our platform analyzes soil conditions, climate data, and agricultural patterns 
            to deliver personalized recommendations for maximum yield and sustainability.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button 
              className="cta-primary" 
              onClick={() => navigate("/crop-recommender")}
            >
              <span>Get Started</span>
              <span className="button-arrow">→</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <span className="scroll-text">Discover more</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="features-title">Why Choose Our Platform</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                transform: hoveredFeature === index ? 'translateY(-10px)' : 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-accent"></div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="final-cta-section">
        <h2>Ready to Transform Your Farming?</h2>
        <p>Join thousands of farmers making smarter decisions with AI</p>
        <button 
          className="cta-large"
          onClick={() => navigate("/crop-recommender")}
        >
          Start Your Journey Now
        </button>
      </div>
    </div>
  );
}

export default LandingPage;




