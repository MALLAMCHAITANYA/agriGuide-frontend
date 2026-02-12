import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isHome = location.pathname === "/";
  const isRecommender = location.pathname === "/crop-recommender";
  const isResults = location.pathname === "/results";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <span className="navbar-icon">🌾</span>
          <span className="navbar-title">{t("navbar.title")}</span>
          <span className="navbar-tagline">{t("navbar.tagline")}</span>
        </div>

        <div className="navbar-links">
          <button
            className={`nav-link ${isHome ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            {t("navbar.home")}
          </button>
          <button
            className={`nav-link ${isRecommender ? "active" : ""}`}
            onClick={() => navigate("/crop-recommender")}
          >
            {t("navbar.recommender")}
          </button>
          <button
            className={`nav-link ${isResults ? "active" : ""}`}
            onClick={() => navigate("/results")}
          >
            {t("navbar.results")}
          </button>

          <div className="nav-lang-select">
            <span className="nav-lang-label">{t("navbar.languageLabel")}:</span>
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

