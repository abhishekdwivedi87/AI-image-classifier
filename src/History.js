import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, assetUrl } from "./api";

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await axios.get(apiUrl("/history"));
        setHistory(response.data);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.error ||
            fetchError.message ||
            "Unable to load prediction history."
        );
      }
    }
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>History</h2>
      {error && <p role="alert">{error}</p>}
      <ul className="history-list">
        {history.map((item) => (
          <li key={item._id} className="history-item">
            <img
              src={assetUrl(item.imageUrl)}
              alt={item.filename}
              className="thumbnail"
            />
            <div className="details">
              <strong>{item.filename}</strong> → {item.prediction} (
              {(item.confidence * 100).toFixed(2)}%)
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
