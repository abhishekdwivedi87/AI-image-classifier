import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';   // default React styles
import App from './App'; // ✅ must match App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
