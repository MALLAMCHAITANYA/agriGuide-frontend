import React, { useState } from "react";
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
      const response = await fetch("http://127.0.0.1:8000/predict", {
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
              placeholder={t("recommender.cityPlaceholder")}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input type="number" name="N" placeholder={t("recommender.nPlaceholder")} value={values.N} onChange={handleChange} />
            <input type="number" name="P" placeholder={t("recommender.pPlaceholder")} value={values.P} onChange={handleChange} />
            <input type="number" name="K" placeholder={t("recommender.kPlaceholder")} value={values.K} onChange={handleChange} />

            <input type="number" name="temperature" placeholder={t("recommender.tempPlaceholder")} value={values.temperature} onChange={handleChange} />
            <input type="number" name="humidity" placeholder={t("recommender.humidityPlaceholder")} value={values.humidity} onChange={handleChange} />

            <input type="number" name="ph" placeholder={t("recommender.phPlaceholder")} value={values.ph} onChange={handleChange} />
            <input type="number" name="rainfall" placeholder={t("recommender.rainfallPlaceholder")} value={values.rainfall} onChange={handleChange} />

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
            {loading ? <ClipLoader size={20} /> : t("recommender.predictButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CropRecommender;




