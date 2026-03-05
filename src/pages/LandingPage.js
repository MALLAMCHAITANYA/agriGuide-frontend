import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const { t } = useTranslation();

  const handleDiscoverMore = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const features = [
    {
      icon: "🌾",
      title: t("landing.featureSmartTitle"),
      description: t("landing.featureSmartDesc")
    },
    {
      icon: "📊",
      title: t("landing.featureDataTitle"),
      description: t("landing.featureDataDesc")
    },
    {
      icon: "🌱",
      title: t("landing.featureSustainTitle"),
      description: t("landing.featureSustainDesc")
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
            <span className="ai-tag-text">{t("landing.badge")}</span>
          </div>

          {/* Main Headline */}
          <h1 className="landing-headline">
            {t("landing.headlineMain")}
            <span className="headline-gradient">
              {t("landing.headlineAccent")}
            </span>
          </h1>

          {/* Description */}
          <p className="landing-description">
            {t("landing.description")}
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button 
              className="cta-primary" 
              onClick={() => navigate("/crop-recommender")}
            >
              <span>{t("landing.ctaPrimary")}</span>
              <span className="button-arrow">→</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div
            className="scroll-indicator"
            onClick={handleDiscoverMore}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleDiscoverMore();
              }
            }}
          >
            <span className="scroll-text">{t("landing.scrollMore")}</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-section" className="features-section">
        <h2 className="features-title">{t("landing.featuresTitle")}</h2>
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
        <h2>{t("landing.finalCtaTitle")}</h2>
        <p>{t("landing.finalCtaText")}</p>
        <button 
          className="cta-large"
          onClick={() => navigate("/crop-recommender")}
        >
          {t("landing.finalCtaButton")}
        </button>
      </div>
    </div>
  );
}

export default LandingPage;




