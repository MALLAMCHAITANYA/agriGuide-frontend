import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCrop } from "../contexts/CropContext";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { apiUrl, fetchWithTimeout } from "../config/api";
import "./CropRecommender.css";

function CropRecommender() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { recommendationData, updateRecommendationData } = useCrop();

  const [values, setValues] = useState(recommendationData.values);
  const [city, setCity] = useState(recommendationData.city);
  const [loading, setLoading] = useState(false);
  const [loadingHint, setLoadingHint] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoadingHint(false);
      return;
    }
    const timer = setTimeout(() => setLoadingHint(true), 4000);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    fetch(apiUrl("/"), { method: "GET" }).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCityBlur = async () => {
    if (!city.trim()) return;
    
    setWeatherLoading(true);
    
    try {
      // Get the API key from your .env file
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      
      if (!API_KEY) {
        Swal.fire({
          title: "API Key Missing",
          text: "Please add your OpenWeatherMap API key to .env file as REACT_APP_WEATHER_API_KEY",
          icon: "error",
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000
        });
        setWeatherLoading(false);
        return;
      }

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();
      
      if (weatherData.cod !== 200) {
        Swal.fire({
          title: "City not found",
          text: weatherData.message || "Could not find weather data for this city.",
          icon: "warning",
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        setWeatherLoading(false);
        return;
      }
      
      setCity(weatherData.name);
      
      // OpenWeatherMap only provides rain data if it's currently raining (in mm/h)
      // Otherwise, it doesn't include the 'rain' object.
      let currentRain = 0;
      if (weatherData.rain) {
        currentRain = weatherData.rain['1h'] || weatherData.rain['3h'] || 0;
      }
      
      setValues(prev => ({
        ...prev,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        // We only overwrite rainfall if it's actually raining, because agricultural
        // ML models usually expect average seasonal rainfall, not momentary rain.
        rainfall: currentRain !== 0 ? currentRain : prev.rainfall
      }));
      
      Swal.fire({
        title: "Weather Updated!",
        text: `Fetched real-time weather from OpenWeatherMap for ${weatherData.name}`,
        icon: "success",
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setWeatherLoading(false);
    }
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

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();

      updateRecommendationData({
        recommendations: data.recommendations,
        values: values,
        city: city
      });

      navigate("/results");
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
            <div className="input-group">
              <label>🌆 {t("recommender.cityPlaceholder").replace('🌆', '').trim()}</label>
              <div className="city-input-container">
                <input
                  type="text"
                  autoComplete="off"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={handleCityBlur}
                />
                {weatherLoading && (
                  <span className="weather-spinner">
                    <ClipLoader size={16} color="#16a34a" />
                  </span>
                )}
              </div>
            </div>

            <div className="input-group">
              <label>🌿 Nitrogen (N) <span className="range-badge">0-140</span></label>
              <input
                type="number"
                name="N"
                value={values.N}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>🧪 Phosphorus (P) <span className="range-badge">5-145</span></label>
              <input
                type="number"
                name="P"
                value={values.P}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>🧂 Potassium (K) <span className="range-badge">5-205</span></label>
              <input
                type="number"
                name="K"
                value={values.K}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>🌡 Temperature <span className="range-badge">8.8-43.7°C</span></label>
              <input
                type="number"
                name="temperature"
                step="0.01"
                value={values.temperature}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>💧 Humidity <span className="range-badge">14.3-100%</span></label>
              <input
                type="number"
                name="humidity"
                step="0.01"
                value={values.humidity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>⚗️ pH Value <span className="range-badge">3.5-9.9</span></label>
              <input
                type="number"
                name="ph"
                step="0.01"
                value={values.ph}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>🌧 Rainfall <span className="range-badge">20.2-298.6mm</span></label>
              <input
                type="number"
                name="rainfall"
                step="0.01"
                value={values.rainfall}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="predict-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="loading-state">
                <ClipLoader size={20} color="#fff" />
                <span>{t("recommender.loadingPredicting")}</span>
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




