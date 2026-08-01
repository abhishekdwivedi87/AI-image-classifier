import React from "react";
import { FaUpload, FaHistory, FaChartBar } from "react-icons/fa";
import "./App.css";



function Sidebar({ setActiveSection }) {
  return (
    <div className="sidebar">
      <h2>AI Dashboard</h2>
      <ul>
        <li onClick={() => setActiveSection("upload")}>📤 Upload</li>
        <li onClick={() => setActiveSection("history")}>🔄 History</li>
        <li onClick={() => setActiveSection("analytics")}>📊 Analytics</li>
        <li onClick={() => setActiveSection("login")}>🔐 Login</li>
        <li onClick={() => setActiveSection("signup")}>📝 Signup</li>
      </ul>
    </div>
  );
}

export default Sidebar;

