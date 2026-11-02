import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as mobilenet from "@tensorflow-models/mobilenet";
import axios from "axios";
import Loader from "./Loader";
import { apiUrl, assetUrl } from "./api";

function ImageUploader({ onPrediction }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");
    const imageUrl = URL.createObjectURL(file);

    try {
      await tf.setBackend("webgl");
      await tf.ready();

      const img = document.createElement("img");
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("The selected image could not be loaded."));
      });

      const model = await mobilenet.load();
      const predictions = await model.classify(img);

      if (onPrediction) {
        onPrediction(predictions);
      }

      const topPrediction = predictions[0];
      if (!topPrediction) {
        throw new Error("The model did not return a prediction.");
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("prediction", topPrediction.className);
      formData.append("confidence", topPrediction.probability);

      const response = await axios.post(apiUrl("/upload"), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError);
      setError(
        uploadError.response?.data?.error ||
          uploadError.message ||
          "Unable to classify or upload the image."
      );
    } finally {
      URL.revokeObjectURL(imageUrl);
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Upload & Classify</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <Loader />}
      {error && <p role="alert">{error}</p>}

      {result && (
        <div className="history-item">
          <img
            src={assetUrl(result.imageUrl)}
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
