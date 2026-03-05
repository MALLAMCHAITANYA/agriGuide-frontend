import { useEffect, useState } from "react";
import { apiUrl, fetchWithTimeout } from "../config/api";
import "./LocationMarket.css";

function LocationMarket() {
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const crops = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "maize", label: "Maize" },
    { value: "cotton", label: "Cotton" },
    { value: "jute", label: "Jute" },
    { value: "banana", label: "Banana" },
    { value: "mango", label: "Mango" },
  ];

  const indianStates = [
    "Andhra Pradesh", "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha",
    "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
  ];

  const fetchLocationBasedPrices = async () => {
    if (!selectedCrop) return;
    
    setLoading(true);
    try {
      const res = await fetchWithTimeout(
        apiUrl(`/market/history/${selectedCrop}?days=30`),
        {},
        10000
      );
      
      if (res.ok) {
        const data = await res.json();
        const history = data.history || data || [];
        
        // Parse and group by location
        const locationPrices = {};
        history.forEach(item => {
          const key = `${item.market || 'Unknown'}-${item.district || ''}-${item.state || ''}`;
          if (!locationPrices[key]) {
            locationPrices[key] = {
              market: item.market,
              district: item.district,
              state: item.state,
              prices: [],
              dates: []
            };
          }
          locationPrices[key].prices.push(item.price);
          locationPrices[key].dates.push(item.date);
        });

        // Calculate stats for each location
        const processed = Object.values(locationPrices).map(loc => {
          const prices = loc.prices;
          const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const latestPrice = prices[prices.length - 1];
          
          // Simple 7-day prediction (linear trend)
          const recent7 = prices.slice(-7);
          const trend = recent7.length >= 2 
            ? (recent7[recent7.length - 1] - recent7[0]) / recent7[0] * 100
            : 0;
          const predictedPrice = latestPrice * (1 + (trend / 100));

          return {
            ...loc,
            avgPrice: avgPrice.toFixed(2),
            minPrice: minPrice.toFixed(2),
            maxPrice: maxPrice.toFixed(2),
            latestPrice: latestPrice.toFixed(2),
            trend: trend.toFixed(2),
            predictedPrice: predictedPrice.toFixed(2),
            dataPoints: prices.length
          };
        });

        // Filter by selected location
        let filtered = processed;
        if (selectedState) {
          filtered = filtered.filter(item => 
            item.state && item.state.toLowerCase().includes(selectedState.toLowerCase())
          );
        }
        if (selectedDistrict) {
          filtered = filtered.filter(item =>
            item.district && item.district.toLowerCase().includes(selectedDistrict.toLowerCase())
          );
        }

        // Sort by latest price (descending)
        filtered.sort((a, b) => parseFloat(b.latestPrice) - parseFloat(a.latestPrice));
        
        setMarketData(filtered);
        
        // Calculate overall prediction
        if (filtered.length > 0) {
          const avgCurrentPrice = filtered.reduce((sum, m) => sum + parseFloat(m.latestPrice), 0) / filtered.length;
          const avgPrediction = filtered.reduce((sum, m) => sum + parseFloat(m.predictedPrice), 0) / filtered.length;
          const overallTrend = filtered.reduce((sum, m) => sum + parseFloat(m.trend), 0) / filtered.length;
          
          setPrediction({
            currentAvg: avgCurrentPrice.toFixed(2),
            predictedAvg: avgPrediction.toFixed(2),
            trend: overallTrend.toFixed(2),
            marketsCount: filtered.length
          });
        }
      }
    } catch (err) {
      console.error("Error fetching location prices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationBasedPrices();
  }, [selectedCrop, selectedState, selectedDistrict]);

  return (
    <div className="location-market-container">
      <div className="location-header">
        <h1>📍 Location-Based Market Prices & Predictions</h1>
        <p>Get real-time prices and 7-day forecasts for your area</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Select Crop:</label>
          <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
            {crops.map(crop => (
              <option key={crop.value} value={crop.value}>{crop.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Select State:</label>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">All States</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>District (optional):</label>
          <input
            type="text"
            placeholder="Enter district name"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          />
        </div>

        <button className="refresh-btn" onClick={fetchLocationBasedPrices}>
          🔄 Refresh
        </button>
      </div>

      {/* Prediction Summary */}
      {prediction && (
        <div className="prediction-summary">
          <h2>📊 Price Forecast for {selectedCrop.toUpperCase()}</h2>
          <div className="prediction-cards">
            <div className="pred-card">
              <span className="pred-label">Current Avg Price</span>
              <span className="pred-value">₹{prediction.currentAvg}</span>
              <span className="pred-unit">per quintal</span>
            </div>
            <div className="pred-card highlight">
              <span className="pred-label">7-Day Prediction</span>
              <span className="pred-value prediction-price">₹{prediction.predictedAvg}</span>
              <span className="pred-unit">per quintal</span>
            </div>
            <div className="pred-card">
              <span className="pred-label">Trend</span>
              <span className={`pred-value ${parseFloat(prediction.trend) > 0 ? 'positive' : 'negative'}`}>
                {parseFloat(prediction.trend) > 0 ? '📈' : '📉'} {prediction.trend}%
              </span>
              <span className="pred-unit">7-day change</span>
            </div>
            <div className="pred-card">
              <span className="pred-label">Markets Found</span>
              <span className="pred-value">{prediction.marketsCount}</span>
              <span className="pred-unit">in your area</span>
            </div>
          </div>
          <div className="recommendation">
            {parseFloat(prediction.trend) > 2 && (
              <p className="rec-good">✅ Good time to sell - prices are rising!</p>
            )}
            {parseFloat(prediction.trend) < -2 && (
              <p className="rec-wait">⚠️ Consider holding - prices are falling</p>
            )}
            {parseFloat(prediction.trend) >= -2 && parseFloat(prediction.trend) <= 2 && (
              <p className="rec-stable">➡️ Market is stable - normal trading conditions</p>
            )}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && <div className="loading">📊 Loading market data...</div>}

      {/* Market List */}
      {!loading && marketData.length > 0 && (
        <div className="markets-list">
          <h3>📍 Markets in {selectedState || "All India"}</h3>
          <div className="markets-grid">
            {marketData.map((market, index) => (
              <div key={index} className="market-item">
                <div className="market-header">
                  <h4>{market.market || "Unknown Market"}</h4>
                  <span className="live-badge">🟢 LIVE</span>
                </div>
                <p className="location-info">
                  📍 {market.district}, {market.state}
                </p>
                <div className="price-info">
                  <div className="price-row">
                    <span>Current Price:</span>
                    <strong>₹{market.latestPrice}</strong>
                  </div>
                  <div className="price-row prediction-row">
                    <span>7-Day Forecast:</span>
                    <strong className="predicted">₹{market.predictedPrice}</strong>
                  </div>
                  <div className="price-row">
                    <span>30-Day Range:</span>
                    <span>₹{market.minPrice} - ₹{market.maxPrice}</span>
                  </div>
                  <div className="price-row">
                    <span>Average:</span>
                    <span>₹{market.avgPrice}</span>
                  </div>
                  <div className="trend-indicator">
                    {parseFloat(market.trend) > 0 ? '📈' : '📉'} 
                    <span className={parseFloat(market.trend) > 0 ? 'trend-up' : 'trend-down'}>
                      {market.trend}% trend
                    </span>
                  </div>
                </div>
                <div className="data-points">
                  Based on {market.dataPoints} data points
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && marketData.length === 0 && (
        <div className="no-data">
          <p>No market data found for selected location.</p>
          <p>Try selecting a different state or crop.</p>
        </div>
      )}
    </div>
  );
}

export default LocationMarket;
