import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./CropRecommender.css";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";

function CropRecommender() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [values, setValues] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [city, setCity] = useState("");
  const [season, setSeason] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHint, setLoadingHint] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoadingHint(false);
      return;
    }
    const timer = setTimeout(() => setLoadingHint(true), 4000);
    return () => clearTimeout(timer);
  }, [loading]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (Object.values(values).some((v) => v === "")) {
      Swal.fire(
        t("recommender.alertMissingTitle"),
        t("recommender.alertMissingText"),
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://agriguide-backend-opm1.onrender.com/predict", {
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
      });

      const data = await response.json();

      navigate("/results", {
        state: {
          recommendations: data.recommendations,
          selectedSeason: season,
        },
      });
    } catch {
      Swal.fire(
        t("recommender.alertErrorTitle"),
        t("recommender.alertErrorText"),
        "error"
      );
    }

    setLoading(false);
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${process.env.PUBLIC_URL}/assets/background.jpeg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="crop-recommender-page" style={backgroundStyle}>
      <div className="recommender-container">
        <div className="recommender-header">
          <h1 className="recommender-title">{t("recommender.title")}</h1>
          <p className="recommender-subtitle">
            {t("recommender.subtitle")}
          </p>
        </div>

        <div className="recommender-card">
          <h2 className="form-section-title">
            {t("recommender.sectionTitle")}
          </h2>
          <p className="form-section-subtitle">
            {t("recommender.sectionSubtitle")}
          </p>

          <div className="form-grid">
            <input
              type="text"
              placeholder="City (e.g. Hyderabad)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              type="number"
              name="N"
              placeholder="Nitrogen N (0–140, avg ≈70)"
              value={values.N}
              onChange={handleChange}
            />
            <input
              type="number"
              name="P"
              placeholder="Phosphorus P (5–145, avg ≈75)"
              value={values.P}
              onChange={handleChange}
            />
            <input
              type="number"
              name="K"
              placeholder="Potassium K (5–205, avg ≈100)"
              value={values.K}
              onChange={handleChange}
            />

            <input
              type="number"
              name="temperature"
              placeholder="Temperature °C (8–43, avg ≈26)"
              value={values.temperature}
              onChange={handleChange}
            />
            <input
              type="number"
              name="humidity"
              placeholder="Humidity % (14–99, avg ≈65)"
              value={values.humidity}
              onChange={handleChange}
            />

            <input
              type="number"
              name="ph"
              placeholder="pH (3.5–9.9, ideal ≈6.5)"
              value={values.ph}
              onChange={handleChange}
            />
            <input
              type="number"
              name="rainfall"
              placeholder="Rainfall mm (20–300, avg ≈120)"
              value={values.rainfall}
              onChange={handleChange}
            />

            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option value="">{t("recommender.seasonLabel")}</option>
              <option value="kharif">{t("recommender.seasonKharif")}</option>
              <option value="rabi">{t("recommender.seasonRabi")}</option>
              <option value="all">{t("recommender.seasonAll")}</option>
            </select>
          </div>

          <button className="predict-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="loading-state">
                <ClipLoader size={20} color="#fff" />
                <span>Predicting crops...</span>
              </span>
            ) : (
              t("recommender.predictButton")
            )}
          </button>
          {loading && loadingHint && (
            <p className="loading-hint">
              First request may take 30–60 seconds while the server wakes up. Please wait…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropRecommender;




