import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CropCard from "../components/CropCard";
import MarketPrice from "../components/MarketPrice";
import cropData from "../data/cropData";
import { useTranslation } from "react-i18next";
import "./ResultsPage.css";

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const recommendations = location.state?.recommendations || [];
  const selectedSeason = location.state?.selectedSeason || "";
  const [selectedRegion, setSelectedRegion] = useState("");

  const matchesSeason = (seasonText, filter) => {
    if (!filter || filter === "all") return true;
    if (!seasonText) return false;

    const s = seasonText.toLowerCase();
    if (filter === "kharif") {
      return s.includes("kharif") || s.includes("monsoon") || s.includes("june");
    }
    if (filter === "rabi") {
      return s.includes("rabi") || s.includes("winter") || s.includes("nov");
    }
    return true;
  };

  const filteredRecommendations =
    selectedSeason
      ? recommendations.filter((item) => {
          const key = item.crop.toLowerCase();
          const info = cropData[key];
          return info ? matchesSeason(info.season, selectedSeason) : true;
        })
      : recommendations;

  const allStatesSet = new Set();
  (filteredRecommendations.length ? filteredRecommendations : recommendations).forEach(
    (item) => {
      const key = item.crop.toLowerCase();
      const info = cropData[key];
      if (info && info.top_states) {
        info.top_states.split(",").forEach((s) => {
          const trimmed = s.trim();
          if (trimmed) allStatesSet.add(trimmed);
        });
      }
    }
  );
  const availableRegions = Array.from(allStatesSet);

  const regionFilteredRecommendations =
    selectedRegion
      ? filteredRecommendations.filter((item) => {
          const key = item.crop.toLowerCase();
          const info = cropData[key];
          if (!info || !info.top_states) return false;
          return info.top_states.toLowerCase().includes(selectedRegion.toLowerCase());
        })
      : filteredRecommendations;

  const displayRecommendations =
    regionFilteredRecommendations.length > 0
      ? regionFilteredRecommendations
      : filteredRecommendations;

  const comparisonData = displayRecommendations.map((item, index) => {
    const key = item.crop.toLowerCase();
    const info = cropData[key] || null;

    return {
      ...item,
      key,
      info,
      rank: index + 1,
      confidence: (item.probability * 100).toFixed(1),
    };
  });

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
          <h2 className="empty-results-title">
            {t("results.emptyTitle")}
          </h2>
          <p className="empty-results-message">
            {t("results.emptyMessage")}
          </p>
          <button className="back-btn" onClick={() => navigate("/")}>
            {t("results.backHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page" style={backgroundStyle}>
      <h1 className="results-title">{t("results.title")}</h1>
      <div className="filters-row">
        {selectedSeason && (
          <div className="season-chip">
            {t("results.seasonLabel")}&nbsp;
            <span className="season-chip-value">
              {selectedSeason === "kharif"
                ? t("results.seasonKharif")
                : selectedSeason === "rabi"
                ? t("results.seasonRabi")
                : t("results.seasonAll")}
            </span>
          </div>
        )}

        {availableRegions.length > 0 && (
          <div className="region-filter">
            <span className="region-label">{t("results.regionLabel")}</span>
            <select
              className="region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">{t("results.regionAllStates")}</option>
              {availableRegions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 🔥 SIDE-BY-SIDE LAYOUT */}
      <div className="results-grid">
        {displayRecommendations.map((item, index) => (
          <div className={`grid-item rank-${index + 1}`} key={index}>
            <CropCard
              crop={item.crop.toLowerCase()}
              confidence={(item.probability * 100).toFixed(2)}
              rank={index + 1}
            />
          </div>
        ))}
      </div>

      {/* 🔍 Comparison Section */}
      {comparisonData.length > 0 && (
        <div className="comparison-section">
          <h2 className="comparison-title">
            {t("results.comparisonTitle")}
          </h2>
          <p className="comparison-subtitle">
            {t("results.comparisonSubtitle")}
          </p>

          <div className="comparison-table">
            <div className="comparison-row comparison-row-header">
              <div className="comparison-cell label-cell">
                {/* "Factor" is more technical; we keep it implicit */}
              </div>
              {comparisonData.map((item) => (
                <div key={item.key} className="comparison-cell crop-name-cell">
                  <span className="comparison-crop-name">
                    {item.crop.toUpperCase()}
                  </span>
                  <span className="comparison-rank-pill">
                    Rank {item.rank} • {item.confidence}%
                  </span>
                </div>
              ))}
            </div>

            {[
              { label: t("results.factor.duration"), key: "duration" },
              { label: t("results.factor.water"), key: "water" },
              { label: t("results.factor.cost"), key: "cost" },
              { label: t("results.factor.season"), key: "season" },
              { label: t("results.factor.topStates"), key: "top_states" },
            ].map((row) => (
              <div className="comparison-row" key={row.label}>
                <div className="comparison-cell label-cell">
                  {row.label}
                </div>
                {comparisonData.map((item) => (
                  <div key={item.key + row.key} className="comparison-cell">
                    {item.info && item.info[row.key] ? item.info[row.key] : "-"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 💹 Market Price Section */}
      <div className="market-price-wrapper">
        <MarketPrice
          crop={
            (displayRecommendations[0] ||
              filteredRecommendations[0] ||
              recommendations[0]
            ).crop.toLowerCase()
          }
        />
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Prediction
      </button>
    </div>
  );
}

export default ResultsPage;
