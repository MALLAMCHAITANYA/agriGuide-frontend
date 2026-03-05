import "./AboutPage.css";

const highlights = [
  {
    icon: "🌱",
    title: "Crop Recommendation Engine",
    description: "Top crop matches from soil and climate inputs"
  },
  {
    icon: "🧪",
    title: "Practical Farm Advisory",
    description: "Season, fertilizer, disease, and control guidance"
  },
  {
    icon: "📈",
    title: "Market Price Signals",
    description: "Price trends and quick market decision support"
  },
  {
    icon: "🌍",
    title: "Multilingual Experience",
    description: "Accessible recommendations in multiple languages"
  },
  {
    icon: "⚡",
    title: "Fast API Workflow",
    description: "Fast React + FastAPI experience for users"
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
        <div className="about-hero-badge">About Our Platform</div>
        <h1>
          <span role="img" aria-label="crop">
            🌾
          </span>{" "}
          AgriGuide
        </h1>
        <h2>AI-Assisted Farming Decisions for Better Outcomes</h2>
        <p>
          AgriGuide helps farmers and agri learners turn soil, climate, and crop intelligence into practical action.
          From selecting crops to reviewing market direction, the platform is built to support confident farm planning.
        </p>
      </section>

      <section className="about-section">
        <h3>What is AgriGuide?</h3>
        <p>
          AgriGuide is a smart agriculture assistant that combines machine learning predictions with field-oriented crop
          information. The goal is simple: make complex farm data easier to understand so users can take timely,
          informed decisions.
        </p>
      </section>

      <section className="about-section">
        <h3>Key Features</h3>
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
        <h3>Supported Crop Coverage</h3>
        <p>
          The recommendation model and crop intelligence layer cover 22+ crops commonly grown across India, including:
        </p>
        <ul className="about-list">
          {cropGroups.map((group) => (
            <li key={group}>{group}</li>
          ))}
        </ul>
      </section>

      <section className="about-section">
        <h3>Technology Behind AgriGuide</h3>
        <ul className="about-list">
          <li>Machine Learning: Random Forest based crop prediction pipeline</li>
          <li>Backend: FastAPI services for inference and market endpoints</li>
          <li>Frontend: React interface focused on simple farmer-friendly flows</li>
          <li>Data Layer: Soil-climate inputs plus curated crop advisory details</li>
        </ul>
      </section>

      <section className="about-section about-mission">
        <h3>Our Mission</h3>
        <blockquote>
          "Make reliable agricultural guidance accessible so every farming decision can be smarter, safer, and more
          sustainable."
        </blockquote>
        <ul className="about-list">
          {missionPoints.map((point) => (
            <li key={point}>✅ {point}</li>
          ))}
        </ul>
      </section>

      <section className="about-section">
        <h3>Team & Vision</h3>
        <p>
          AgriGuide is being developed as a practical agri-tech project that blends software engineering, machine
          learning, and agriculture-focused thinking. The roadmap is centered on real usability, continuous
          improvement, and measurable farm impact.
        </p>
      </section>

      <section className="about-section about-contact">
        <h3>Get in Touch</h3>
        <p>Questions, feedback, or collaboration ideas are always welcome.</p>
        <ul className="about-list">
          <li>Email: mallamchaitanya2005@gmail.com</li>
        </ul>
      </section>
    </div>
  );
}

export default AboutPage;
