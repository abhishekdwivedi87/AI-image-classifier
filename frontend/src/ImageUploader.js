import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as mobilenet from "@tensorflow-models/mobilenet";
import axios from "axios";
import Loader from "./Loader";

function ImageUploader({ onPrediction }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    await tf.setBackend("webgl");
    await tf.ready();

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => (img.onload = resolve));

    const model = await mobilenet.load();
    const predictions = await model.classify(img);

    // ✅ Send all predictions to App.js for Analytics
    if (onPrediction) {
      onPrediction(predictions);
    }

    // ✅ Save top prediction to backend
    const topPrediction = predictions[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("prediction", topPrediction.className);
    formData.append("confidence", topPrediction.probability);

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setResult(response.data);
    setLoading(false);
  }

  return (
    <div>
      <h2>Upload & Classify</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <Loader />}

      {result && (
        <div className="history-item">
          <img
            src={`http://localhost:5000${result.imageUrl}`}
            alt={result.filename}
            className="thumbnail"
          />
          <div className="details">
            <strong>{result.filename}</strong> → {result.prediction} (
            {(result.confidence * 100).toFixed(2)}%)
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
