import React from "react";
import "./App.css"; // make sure spinner CSS is in App.css

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Classifying image...</p>
    </div>
  );
}

export default Loader;
