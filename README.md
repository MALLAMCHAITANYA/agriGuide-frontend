**Frontend `README.md`**

# agriGuide Frontend (React)

The **agriGuide Frontend** is a React single‑page application that provides an intuitive UI for AI‑driven crop recommendations, comparison, and basic market insights for farmers.

---

## Features

- **Landing Page**
  - Introduces the agriGuide concept: AI‑powered, data‑driven farming.
  - Call‑to‑action to start the crop recommendation flow.

- **Crop Recommender Form**
  - Inputs:
    - City (optional, for context)
    - N, P, K values
    - Temperature, Humidity
    - Soil pH
    - Rainfall (mm)
  - Optional **Season filter**:
    - Kharif (Monsoon)
    - Rabi (Winter)
    - All seasons

- **Results Page**
  - Shows **top recommended crops** returned by the backend.
  - Each crop uses a detailed **CropCard** with:
    - Soil type
    - Duration
    - Water need
    - Cost per acre
    - Recommended temperature, humidity, rainfall
    - pH range
    - Fertilizer suggestions
    - Common diseases & control
    - Top Indian states
    - Best season
  - **Confidence / Suitability bar**:
    - Visual progress bar based on model probability.
    - Caption: “Higher bar = better match for your soil & climate”.

  - **Comparison section**:
    - Side‑by‑side comparison table for the recommended crops.
    - Factors: duration, water need, cost/acre, best season, top states.

  - **Filtering**
    - Season filter (from the form) is displayed and applied.
    - **Region filter** – dropdown of top states extracted from crop data.

  - **Market Price section**
    - Uses backend `/market` APIs to show current price and related info
      for the top crop.

- **Extra interactions**
  - Text‑to‑speech: button to read crop details aloud.
  - Download crop report as **PDF**.
  - Download crop card as **image**.

---

## Tech Stack

- **Framework:** React (Create React App)
- **Routing:** `react-router-dom`
- **Styling:** CSS (green, agriculture‑themed UI, glassmorphism cards)
- **Charts / UI helpers:** plain CSS + components
- **API:** Fetch calls to the FastAPI backend at `http://127.0.0.1:8000`

---

## Project Structure

frontend/
├── public/
│   ├── index.html
│   └── assets/
│       ├── background.jpeg
│       └── crops/           # crop images (rice.jpg, maize.jpg, etc.)
├── src/
│   ├── App.js               # main app + routes
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── data/
│   │   └── cropData.js      # detailed crop info used in cards/comparison
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── CropCard.js
│   │   ├── CropCard.css
│   │   ├── MarketPrice.js
│   │   └── MarketPrice.css
│   └── pages/
│       ├── LandingPage.js
│       ├── LandingPage.css
│       ├── CropRecommender.js
│       ├── CropRecommender.css
│       ├── ResultsPage.js
│       └── ResultsPage.css
├── package.json
├── package-lock.json
├── .gitignore
└── README.md


---

## Setup & Installation

## Setup & Installation

1. **Clone the repository**

git clone https://github.com/<your-username>/agriGuide-frontend.git
cd agriGuide-frontend

2.Install dependencies
npm install
Running the App
npm start
Development server: http://localhost:3000
The app will automatically reload when you change code.
Make sure the backend API is running at http://127.0.0.1:8000 so that crop recommendations and market data work correctly.

Configuration
If needed, you can centralize API base URLs (for example, in a config file or environment variable), but by default the app expects:
Backend API: http://127.0.0.1:8000

Available Scripts
In the project directory, you can run:
npm start – Run the app in development mode.
npm test – Launch the test runner.
npm run build – Create a production build in the build/ folder.
npm run eject – Eject CRA configuration (advanced use).

Running with Backend Locally
From the backend repo: uvicorn main:app --reload --host 127.0.0.1 --port 8000
From the frontend repo: npm start
Open http://localhost:3000 in your browser.

License
This frontend is built for educational and demonstration purposes.
You are free to extend, restyle, or integrate it into your own projects.


git clone https://github.com/<your-username>/agriGuide-frontend.git
cd agriGuide-frontend
