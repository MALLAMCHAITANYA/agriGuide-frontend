import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useCrop } from "../contexts/CropContext";
import CropCard from "../components/CropCard";
import MarketPrice from "../components/MarketPrice";
import cropData from "../data/cropData";
import "./ResultsPage.css";

function ResultsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { recommendationData, updateRecommendationData } = useCrop();

  const recommendations = recommendationData.recommendations;
  const initialValues = recommendationData.values;
  const initialCity = recommendationData.city;
  
  const [values, setValues] = useState(initialValues);
  const [city, setCity] = useState(initialCity);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredRecommendations = recommendations; // Season filtering removed from logic as season field was removed

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

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePredictAgain = async () => {
    if (Object.values(values).some((v) => v === "")) return;
    setLoading(true);
    try {
      const { apiUrl, fetchWithTimeout } = await import("../config/api");
      const response = await fetchWithTimeout(apiUrl("/predict"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          N: Number(values.N),
          P: Number(values.P),
          K: Number(values.K),
          temperature: Number(values.temperature),
          humidity: Number(values.humidity),
          ph: Number(values.ph),
          rainfall: Number(values.rainfall),
        }),
      }, 15000);
      if (response.ok) {
        const data = await response.json();
        updateRecommendationData({
          recommendations: data.recommendations,
          values: values,
          city: city
        });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="results-page" style={backgroundStyle}>
      <div className="results-input-summary">
        <div className="recommender-card">
          <h2 className="form-section-title">
            Your Input Data
          </h2>
          <div className="form-grid results-form-compact">
            <div className="input-group">
              <label>City</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Nitrogen (N) <span className="range-badge">0-140</span></label>
              <input type="number" name="N" value={values.N} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Phosphorus (P) <span className="range-badge">5-145</span></label>
              <input type="number" name="P" value={values.P} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Potassium (K) <span className="range-badge">5-205</span></label>
              <input type="number" name="K" value={values.K} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Temperature <span className="range-badge">8.8-43.7°C</span></label>
              <input type="number" name="temperature" value={values.temperature} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Humidity <span className="range-badge">14.3-100%</span></label>
              <input type="number" name="humidity" value={values.humidity} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>pH Value <span className="range-badge">3.5-9.9</span></label>
              <input type="number" name="ph" value={values.ph} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Rainfall <span className="range-badge">20.2-298.6mm</span></label>
              <input type="number" name="rainfall" value={values.rainfall} onChange={handleInputChange} />
            </div>
            <button className="predict-btn results-repredict-btn" onClick={handlePredictAgain} disabled={loading}>
              {loading ? "..." : "Re-Predict"}
            </button>
          </div>
        </div>
      </div>

      <h1 className="results-title">{t("results.title")}</h1>
      <div className="filters-row">
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

      {/* 💹 Market Analysis for Top Recommendation */}
      {displayRecommendations.length > 0 && (
        <div className="market-price-wrapper">
          <MarketPrice crop={displayRecommendations[0].crop.toLowerCase()} />
        </div>
      )}

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
        {t("results.backHome")}
      </button>
    </div>
  );
}

export default ResultsPage;
