import { useEffect, useMemo, useState } from "react";
import { apiUrl, fetchWithTimeout } from "../config/api";
import "./MarketDashboard.css";

function MarketDashboard() {
  const [marketData, setMarketData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const crops = [
    "rice", "wheat", "maize", "cotton", "jute", "coffee", "banana", "mango",
    "potato", "onion", "tomato", "mustard", "soybean", "sugarcane", "garlic", "turmeric", "ginger",
    "pomegranate", "grapes", "apple", "orange", "papaya"
  ];

  const getDemandLevel = (price, avgPrice) => {
    if (!avgPrice) return "Moderate";
    const diff = ((price - avgPrice) / avgPrice) * 100;
    if (diff > 10) return "High";
    if (diff < -10) return "Low";
    return "Moderate";
  };

  const getTrend = (priceHistory) => {
    if (!priceHistory || priceHistory.length < 7) return "Stable";
    const last7 = priceHistory.slice(-7);
    const prices = last7.map(h => h.price);
    const avg_first_3 = prices.slice(0, 3).reduce((a, b) => a + b) / 3;
    const avg_last_3 = prices.slice(-3).reduce((a, b) => a + b) / 3;
    const change = ((avg_last_3 - avg_first_3) / avg_first_3) * 100;
    
    if (change > 2) return "Rising";
    if (change < -2) return "Falling";
    return "Stable";
  };

  const fetchAllMarketData = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        crops.map(async (crop) => {
          try {
            const priceRes = await fetchWithTimeout(apiUrl(`/market/price/${crop}`), {}, 8000);
            if (!priceRes.ok) return null;
            const priceData = await priceRes.json();

            const historyRes = await fetchWithTimeout(apiUrl(`/market/history/${crop}?days=30`), {}, 8000);
            let history = [];
            if (historyRes.ok) {
              const historyData = await historyRes.json();
              history = historyData.history || historyData || [];
            }

            return {
              crop,
              data: {
                ...priceData,
                history,
                trend: getTrend(history),
                demand: getDemandLevel(priceData.current_price, priceData.base_price),
              }
            };
          } catch (e) {
            console.error(`Failed to fetch ${crop}:`, e);
            return null;
          }
        })
      );

      const combinedData = {};
      results.forEach((res) => {
        if (res) combinedData[res.crop] = res.data;
      });

      setMarketData(combinedData);
    } catch (err) {
      setError("Failed to fetch market data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMarketData();
    const interval = setInterval(fetchAllMarketData, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const filteredCrops = useMemo(() => {
    return Object.entries(marketData).filter(([cropName]) =>
      cropName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [marketData, searchTerm]);

  if (loading) {
    return (
      <div className="market-dashboard-container">
        <div className="loading-state">
           <div className="loader"></div>
           <p>📊 Analyzing Live Commodity Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="market-dashboard-container">
        <div className="error-state">
          <span>❌</span>
          <p>{error}</p>
          <button onClick={fetchAllMarketData}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="market-dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h2>🌾 Live Commodity Market</h2>
          <p>Real-time data and trends for major crops in India</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search crops..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="refresh-dashboard-btn" onClick={fetchAllMarketData}>
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="market-cards-grid">
        {filteredCrops.length > 0 ? (
          filteredCrops.map(([cropName, data]) => (
            <div key={cropName} className="market-card-premium">
              <div className="card-top">
                <div className="crop-badge">{cropName.toUpperCase()}</div>
                <span className={`source-status ${data.source === "data.gov.in" ? "live" : "msp"}`}>
                  {data.source === "data.gov.in" ? "🟢 LIVE" : "📊 MSP"}
                </span>
              </div>

              <div className="card-price-section">
                <span className="price-label">Current Market Price</span>
                <div className="price-main">
                  <span className="currency">₹</span>
                  <span className="amount">{data.current_price?.toLocaleString('en-IN')}</span>
                  <span className="unit">/qtl</span>
                </div>
                {data.variation !== undefined && (
                  <div className={`price-variation ${data.variation >= 0 ? "positive" : "negative"}`}>
                    {data.variation >= 0 ? "▲" : "▼"} {Math.abs(data.variation)}%
                  </div>
                )}
              </div>

              <div className="card-metrics">
                <div className="metric-box">
                  <span className="metric-label">Trend</span>
                  <span className={`metric-value trend-${data.trend.toLowerCase()}`}>
                    {data.trend === "Rising" && "📈"}
                    {data.trend === "Falling" && "📉"}
                    {data.trend === "Stable" && "➡️"}
                    {data.trend}
                  </span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Demand</span>
                  <span className="metric-value demand-high">{data.demand}</span>
                </div>
              </div>

              {data.market && (
                <div className="card-location">
                  <span className="loc-icon">📍</span>
                  <span className="loc-text">{data.market}, {data.district}, {data.state}</span>
                </div>
              )}

              <div className="card-footer">
                <span className="last-updated">
                   Update: {data.last_updated || "Today"}
                </span>
                <span className="data-source">
                   via {data.source}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No crops found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketDashboard;
