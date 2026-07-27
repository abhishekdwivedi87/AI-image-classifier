import React, { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const response = await axios.get("http://localhost:5000/history");
      setHistory(response.data);
    }
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>History</h2>
      <ul className="history-list">
        {history.map((item) => (
          <li key={item._id} className="history-item">
            <img
              src={`http://localhost:5000${item.imageUrl}`}
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
