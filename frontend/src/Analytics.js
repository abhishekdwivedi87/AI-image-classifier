import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Analytics({ predictions }) {
  // ✅ Use correct keys from MobileNet: className + probability
  const labels = predictions.map((p) => p.className);
  const dataValues = predictions.map((p) => Math.round(p.probability * 100));

  const data = {
    labels,
    datasets: [
      {
        label: "Prediction Confidence (%)",
        data: dataValues,
        backgroundColor: "rgba(0, 206, 201, 0.8)",
        borderColor: "#00cec9",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Image Classification Analytics" },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  return (
    <div className="analytics-section">
      {predictions.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <h3>No predictions yet. Upload an image!</h3>
      )}
    </div>
  );
}

export default Analytics;
