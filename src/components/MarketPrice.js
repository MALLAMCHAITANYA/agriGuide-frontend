import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiUrl, fetchWithTimeout } from "../config/api";
import "./MarketPrice.css";

function MarketPrice({ crop }) {
  const [priceData, setPriceData] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");
  const { t } = useTranslation();

  const fetchMarketData = useCallback(async () => {
    setLoading(true);
    try {
      const priceRes = await fetchWithTimeout(apiUrl(`/market/price/${crop}`), {}, 8000);
      if (!priceRes.ok) {
        throw new Error("Failed to fetch current price");
      }
      const currentPriceData = await priceRes.json();
      setPriceData(currentPriceData);
      setLoading(false);

      const [historyRes, statsRes, trendRes] = await Promise.allSettled([
        fetchWithTimeout(apiUrl(`/market/history/${crop}?days=30`), {}, 10000),
        fetchWithTimeout(apiUrl(`/market/stats/${crop}`), {}, 10000),
        fetchWithTimeout(apiUrl(`/market/trend/${crop}`), {}, 10000),
      ]);

      if (historyRes.status === "fulfilled" && historyRes.value.ok) {
        const historyData = await historyRes.value.json();
        const safeHistory =
          historyData && Array.isArray(historyData.history)
            ? historyData.history
            : Array.isArray(historyData)
            ? historyData
            : [];
        setHistory(safeHistory);
      } else {
        setHistory([]);
      }

      if (statsRes.status === "fulfilled" && statsRes.value.ok) {
        const statsData = await statsRes.value.json();
        setStats(statsData);
      } else {
        setStats(null);
      }

      if (trendRes.status === "fulfilled" && trendRes.value.ok) {
        const trendData = await trendRes.value.json();
        setTrend(trendData);
      } else {
        setTrend(null);
      }
    } catch (error) {
      console.error("Error fetching market data:", error);
      setLoading(false);
      setPriceData(null);
      setHistory([]);
      setStats(null);
      setTrend(null);
    }
  }, [crop]);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  if (loading) {
    return (
      <div className="market-price-container">
        <div className="loading">📊 {t("priceChart.loading")}</div>
      </div>
    );
  }

  // Simple chart using divs
  const maxPrice = Math.max(...history.map((h) => h.price));
  const minPrice = Math.min(...history.map((h) => h.price));
  const range = maxPrice - minPrice || 1;

  return (
    <div className="market-price-container">
      <h2 className="market-title">
        💹 {t("priceChart.title", { crop: crop.toUpperCase() })}
      </h2>

      {/* Current Price Section */}
      <div className="current-price-section">
        <div className="price-card current-price-card">
          <p className="price-label">{t("priceChart.currentPrice")}</p>
          <p className="price-value">₹{priceData?.current_price?.toFixed(2)}</p>
          <p className="price-unit">{t("priceChart.unitPerQuintal")}</p>
          <p
            className={`price-change ${
              priceData?.variation > 0 ? "up" : priceData?.variation < 0 ? "down" : ""
            }`}
          >
            {priceData?.variation > 0 ? "📈" : priceData?.variation < 0 ? "📉" : "➡️"}{" "}
            {priceData?.variation}%
          </p>
          {priceData?.source && (
            <p className="price-unit">{t("priceChart.source")}: {priceData.source}</p>
          )}
          {priceData?.market && priceData?.district && priceData?.state && (
            <p className="price-unit">
              {priceData.market}, {priceData.district}, {priceData.state}
            </p>
          )}
          {priceData?.last_updated && (
            <p className="price-unit">{t("priceChart.updated")}: {priceData.last_updated}</p>
          )}
        </div>

        {stats && (
          <>
            <div className="price-card stats-card">
              <p className="stat-label">{t("priceChart.highestPrice")}</p>
              <p className="stat-value">₹{stats.max_price}</p>
            </div>

            <div className="price-card stats-card">
              <p className="stat-label">{t("priceChart.lowestPrice")}</p>
              <p className="stat-value">₹{stats.min_price}</p>
            </div>

            <div className="price-card stats-card">
              <p className="stat-label">{t("priceChart.averagePrice")}</p>
              <p className="stat-value">₹{stats.avg_price}</p>
            </div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "current" ? "active" : ""}`}
          onClick={() => setActiveTab("current")}
        >
          📊 {t("priceChart.tabChart")}
        </button>
        <button
          className={`tab-btn ${activeTab === "trend" ? "active" : ""}`}
          onClick={() => setActiveTab("trend")}
        >
          📈 {t("priceChart.tabTrend")}
        </button>
      </div>

      {/* Price Chart */}
      {activeTab === "current" && history.length > 0 && (
        <div className="price-chart-section">
          <h3>📉 {t("priceChart.historyTitle")}</h3>
          <div className="simple-chart">
            {history.map((item, index) => {
              const height = ((item.price - minPrice) / range) * 200 + 20;
              return (
                <div key={index} className="chart-bar" title={`${item.date}: ₹${item.price}`}>
                  <div className="bar" style={{ height: `${height}px` }}>
                    <span className="bar-tooltip">{t("priceChart.barTooltip", { price: item.price })}</span>
                  </div>
                  {index % 5 === 0 && (
                    <span className="chart-date">{item.date.slice(5)}</span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="chart-note">{t("priceChart.chartNote")}</p>
        </div>
      )}

      {/* Market Trend */}
      {activeTab === "trend" && trend && (
        <div className="trend-section">
          <div className="trend-card">
            <h3>{trend.trend}</h3>
            <p>
              <strong>{t("marketTrend.change")}:</strong> {trend.change_percent}%
            </p>
            <p>
              <strong>{t("marketTrend.forecast")}:</strong> {trend.forecast}
            </p>
            <div className="trend-advice">
              {trend.trend.includes("Rising") && (
                <p className="advice-good">
                  ✅ {t("marketTrend.adviceGood")}
                </p>
              )}
              {trend.trend.includes("Falling") && (
                <p className="advice-caution">
                  ⚠️ {t("marketTrend.adviceCaution")}
                </p>
              )}
              {trend.trend.includes("Stable") && (
                <p className="advice-neutral">
                  ➡️ {t("marketTrend.adviceNeutral")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <button className="refresh-btn" onClick={fetchMarketData}>
        🔄 {t("priceChart.refresh")}
      </button>
    </div>
  );
}

export default MarketPrice;
