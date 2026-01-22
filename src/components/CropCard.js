import React, { useRef, useState } from "react";
import "./CropCard.css";
import cropData from "../data/cropData";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

function CropCard({ crop, rank, confidence }) {
  const cropInfo = cropData[crop];
  const cardRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  let currentSpeech = null;

  if (!cropInfo) {
    return <p>No crop data available.</p>;
  }

  // 🔊 Voice Toggle
  const speakInfo = () => {
    if (!isSpeaking) {
      const text = `
        Recommendation Rank ${rank}.
        Crop: ${crop.toUpperCase()}.
        Confidence: ${confidence} percent.
        Soil: ${cropInfo.soil}.
        Duration: ${cropInfo.duration}.
        Water need: ${cropInfo.water}.
        Cost per acre: ${cropInfo.cost}.
        Temperature: ${cropInfo.temperature} degree Celsius.
        Humidity: ${cropInfo.humidity} percent.
        Rainfall: ${cropInfo.rainfall} millimeters.
        PH value: ${cropInfo.ph}.
        Fertilizers: ${cropInfo.fertilizers}.
        Disease: ${cropInfo.disease}.
        Control methods: ${cropInfo.disease_control}.
        Top States: ${cropInfo.top_states}.
        Best Season: ${cropInfo.season}.
      `;

      currentSpeech = new SpeechSynthesisUtterance(text);
      currentSpeech.lang = "en-IN";

      speechSynthesis.cancel();
      speechSynthesis.speak(currentSpeech);
      setIsSpeaking(true);

      currentSpeech.onend = () => setIsSpeaking(false);
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // 📄 Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Crop Report: ${crop.toUpperCase()}`, 10, 10);

    const details = [
      `Rank: ${rank}`,
      `Confidence: ${confidence}%`,
      `Soil: ${cropInfo.soil}`,
      `Duration: ${cropInfo.duration}`,
      `Water Need: ${cropInfo.water}`,
      `Cost per Acre: ${cropInfo.cost}`,
      `Temperature: ${cropInfo.temperature}°C`,
      `Humidity: ${cropInfo.humidity}%`,
      `Rainfall: ${cropInfo.rainfall} mm`,
      `pH: ${cropInfo.ph}`,
      `Fertilizers: ${cropInfo.fertilizers}`,
      `Disease: ${cropInfo.disease}`,
      `Control: ${cropInfo.disease_control}`,
      `Top States: ${cropInfo.top_states}`,
      `Season: ${cropInfo.season}`,
    ];

    let y = 25;
    details.forEach((line) => {
      doc.text(line, 10, y);
      y += 8;
    });

    doc.save(`${crop}-report.pdf`);
  };

  // 📸 Save Image
  const downloadImage = () => {
    if (!cardRef.current) return;
    toPng(cardRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${crop}-info.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="crop-card" ref={cardRef}>
      {/* 🌾 Crop Image */}
      <img
        className="crop-img"
        src={`/assets/crops/${crop}.jpg`}
        alt={crop}
      />

      {/* 🏅 Rank Badge */}
      <div className={`rank-badge rank-${rank}`}>
        🏅 Rank {rank}
      </div>

      {/* 🌱 Crop Title */}
      <h2 className="crop-title">{crop.toUpperCase()}</h2>

      {/* 📊 Confidence */}
      <p className="confidence">Confidence: {confidence}%</p>

      {/* 📋 Crop Details */}
      <div className="crop-info">
        <p><span>📍 Soil:</span> {cropInfo.soil}</p>
        <p><span>⏱ Duration:</span> {cropInfo.duration}</p>
        <p><span>💦 Water Need:</span> {cropInfo.water}</p>
        <p><span>💰 Cost per Acre:</span> {cropInfo.cost}</p>
        <p><span>🌡️ Temperature:</span> {cropInfo.temperature}°C</p>
        <p><span>💧 Humidity:</span> {cropInfo.humidity}%</p>
        <p><span>🌦 Rainfall:</span> {cropInfo.rainfall} mm</p>
        <p><span>🧪 pH:</span> {cropInfo.ph}</p>
        <p><span>🌱 Fertilizers:</span> {cropInfo.fertilizers}</p>
        <p><span>🦠 Disease:</span> {cropInfo.disease}</p>
        <p><span>🛡 Control:</span> {cropInfo.disease_control}</p>
        <p><span>📘 Top States:</span> {cropInfo.top_states}</p>
        <p><span>🗓 Season:</span> {cropInfo.season}</p>
      </div>

      {/* 🎯 Action Buttons */}
      <div className="action-buttons">
        <button onClick={speakInfo}>
          {isSpeaking ? "🛑 Stop" : "🔊 Speak"}
        </button>
        <button onClick={downloadPDF}>📄 PDF</button>
        <button onClick={downloadImage}>📸 Image</button>
      </div>
    </div>
  );
}

export default CropCard;
