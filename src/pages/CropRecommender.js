import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CropRecommender.css";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";

function CropRecommender() {
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (Object.values(values).some((v) => v === "")) {
      Swal.fire("Missing Values", "Please fill all fields!", "warning");
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
        state: { recommendations: data.recommendations },
      });
    } catch {
      Swal.fire("Error", "Backend not responding!", "error");
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
          <h1 className="recommender-title">🌾 Crop Recommendation</h1>
          <p className="recommender-subtitle">
            Enter your soil and climate data to get AI-powered crop recommendations
          </p>
        </div>

        <div className="recommender-card">
          <h2 className="form-section-title">Enter Your Data</h2>
          <p className="form-section-subtitle">
            Provide soil and climate information to get personalized crop recommendations
          </p>

          <div className="form-grid">
            <input
              type="text"
              placeholder="🌆 City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input type="number" name="N" placeholder="🌿 Nitrogen (N)" value={values.N} onChange={handleChange} />
            <input type="number" name="P" placeholder="🧪 Phosphorus (P)" value={values.P} onChange={handleChange} />
            <input type="number" name="K" placeholder="🧂 Potassium (K)" value={values.K} onChange={handleChange} />

            <input type="number" name="temperature" placeholder="🌡 Temperature (°C)" value={values.temperature} onChange={handleChange} />
            <input type="number" name="humidity" placeholder="💧 Humidity (%)" value={values.humidity} onChange={handleChange} />

            <input type="number" name="ph" placeholder="⚗️ pH Value" value={values.ph} onChange={handleChange} />
            <input type="number" name="rainfall" placeholder="🌧 Rainfall (mm)" value={values.rainfall} onChange={handleChange} />
          </div>

          <button className="predict-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? <ClipLoader size={20} /> : "🌱 Predict Best Crops"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CropRecommender;




