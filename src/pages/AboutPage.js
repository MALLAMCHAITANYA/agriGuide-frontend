import { useTranslation } from "react-i18next";
import "./AboutPage.css";

const highlights = [
  {
    icon: "🌱",
    title: "AI Crop Prediction",
    description: "Suggests the top 3 best-suited crops using soil (N,P,K) and live weather data."
  },
  {
    icon: "💰",
    title: "Live Market Prices",
    description: "Fetches real-time commodity prices to keep farmers updated on market value."
  },
  {
    icon: "📊",
    title: "Price History & Trends",
    description: "30-day historical analysis to track crop price movements and peaks."
  },
  {
    icon: "📉",
    title: "Market Advisory",
    description: "Data-driven insights to help decide whether to sell or hold based on trends."
  },
  {
    icon: "🧪",
    title: "Practical Advisory",
    description: "Guidance on fertilizers, seasons, and disease control for selected crops."
  },
  {
    icon: "🌍",
    title: "Multilingual Support",
    description: "Full UI and advisory support in English, Hindi, and Telugu."
  },
  {
    icon: "⚡",
    title: "Fast API Workflow",
    description: "High-performance React + FastAPI experience for seamless farm management."
  }
];

const cropGroups = [
  "🌾 Cereals: Rice, Maize",
  "🫘 Pulses: Chickpea, Lentil, Black Gram, Mung Bean, Pigeon Peas, Kidney Beans, Moth Beans",
  "🥭 Fruits: Mango, Banana, Apple, Orange, Grapes, Papaya, Pomegranate, Watermelon, Muskmelon",
  "☕ Commercial Crops: Cotton, Jute, Coffee, Coconut"
];

const missionPoints = [
  "Help farmers choose suitable crops with data-backed guidance",
  "Reduce avoidable risk through soil-climate matching",
  "Improve farm profitability with price-aware planning",
  "Promote sustainable decisions with practical field recommendations"
];

function AboutPage() {
  const { t } = useTranslation();
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${process.env.PUBLIC_URL}/assets/background.jpeg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat"
  };

  return (
    <div className="about-page" style={backgroundStyle}>
      <section className="about-hero">
        <div className="about-hero-badge">{t("about.badge")}</div>
        <h1>
          <span role="img" aria-label="crop">
            🌾
          </span>{" "}
          {t("about.title")}
        </h1>
        <h2>{t("about.subtitle")}</h2>
        <p>
          {t("about.description")}
        </p>
      </section>

      <section className="about-section">
        <h3>{t("about.whatIsTitle")}</h3>
        <p>
          {t("about.whatIsDesc")}
        </p>
      </section>

      <section className="about-section">
        <h3>{t("about.featuresTitle")}</h3>
        <div className="about-feature-list">
          {highlights.map((item) => (
            <article key={item.title} className="about-feature-row">
              <span className="about-feature-icon">{item.icon}</span>
              <p>
                <strong>{item.title}:</strong> {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h3>{t("about.cropCoverageTitle")}</h3>
        <p>
          {t("about.cropCoverageDesc")}
        </p>
        <ul className="about-list">
          {cropGroups.map((group) => (
            <li key={group}>{group}</li>
          ))}
        </ul>
      </section>

      <section className="about-section">
        <h3>{t("about.technologyTitle")}</h3>
        <ul className="about-list">
          <li>Machine Learning: Random Forest based crop prediction pipeline</li>
          <li>Backend: FastAPI services for inference and market endpoints</li>
          <li>Frontend: React interface focused on simple farmer-friendly flows</li>
          <li>Data Layer: Soil-climate inputs plus curated crop advisory details</li>
        </ul>
      </section>

      <section className="about-section about-mission">
        <h3>{t("about.missionTitle")}</h3>
        <blockquote>
          {t("about.missionQuote")}
        </blockquote>
        <ul className="about-list">
          {missionPoints.map((point) => (
            <li key={point}>✅ {point}</li>
          ))}
        </ul>
      </section>

      <section className="about-section">
        <h3>{t("about.teamVisionTitle")}</h3>
        <p>
          {t("about.teamVisionDesc")}
        </p>
      </section>

      <section className="about-section about-contact">
        <h3>{t("about.contactTitle")}</h3>
        <p>{t("about.contactDesc")}</p>
        <ul className="about-list">
          <li>Email: mallamchaitanya2005@gmail.com</li>
        </ul>
      </section>
    </div>
  );
}

export default AboutPage;
