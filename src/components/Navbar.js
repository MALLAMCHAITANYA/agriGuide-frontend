import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "te", label: "తెలుగు" }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const isHome = location.pathname === "/";
  const isRecommender = location.pathname === "/crop-recommender";
  const isResults = location.pathname === "/results";
  const isAbout = location.pathname === "/about";
  const isMarket = location.pathname === "/market";


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <span className="navbar-icon">🌾</span>
          <span className="navbar-title">{t("navbar.title")}</span>
          <span className="navbar-tagline">{t("navbar.tagline")}</span>
        </div>

        <div className={`navbar-links ${mobileMenuOpen ? "mobile-active" : ""}`} ref={mobileRef}>
          <button
            className={`nav-link ${isHome ? "active" : ""}`}
            onClick={() => { navigate("/"); setMobileMenuOpen(false); }}
          >
            {t("navbar.home")}
          </button>
          <button
            className={`nav-link ${isRecommender ? "active" : ""}`}
            onClick={() => { navigate("/crop-recommender"); setMobileMenuOpen(false); }}
          >
            {t("navbar.recommender")}
          </button>
          <button
            className={`nav-link ${isMarket ? "active" : ""}`}
            onClick={() => { navigate("/market"); setMobileMenuOpen(false); }}
          >
            {t("navbar.market")}
          </button>

          <button
            className={`nav-link ${isResults ? "active" : ""}`}
            onClick={() => { navigate("/results"); setMobileMenuOpen(false); }}
          >
            {t("navbar.results")}
          </button>
          <button
            className={`nav-link ${isAbout ? "active" : ""}`}
            onClick={() => { navigate("/about"); setMobileMenuOpen(false); }}
          >
            {t("navbar.about")}
          </button>

          <div className="nav-lang-container" ref={dropdownRef}>
            <button 
              className="nav-lang-btn" 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            >
              <span className="nav-lang-label">{t("navbar.languageLabel")}:</span>
              <span className="nav-lang-current">{currentLang.label}</span>
              <span className="nav-lang-arrow">▼</span>
            </button>
            
            {langDropdownOpen && (
              <div className="nav-lang-menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`nav-lang-option ${i18n.language === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

