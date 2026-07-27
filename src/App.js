import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ImageUploader from "./ImageUploader";
import History from "./History";
import Footer from "./Footer";
import Analytics from "./Analytics";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [activeSection, setActiveSection] = useState("upload");
  const [darkMode, setDarkMode] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const [user, setUser] = useState(() => {
    // ✅ Load user from localStorage if logged in
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handlePrediction = (results) => setPredictions(results);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setActiveSection("upload");
  };

  const handleSignup = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setActiveSection("upload");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ clear token too
    setActiveSection("login");
  };

  return (
    <div className={`app-layout ${darkMode ? "dark" : "light"}`}>
      <Sidebar setActiveSection={setActiveSection} />
      <div className="main-content">
        {/* ✅ Show welcome banner when logged in */}
        {user && (
          <div className="welcome-banner">
            <h3>Welcome, {user.email}</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        {!user ? (
          <>
            {activeSection === "login" && <Login onLogin={handleLogin} />}
            {activeSection === "signup" && <Signup onSignup={handleSignup} />}
            {activeSection !== "login" && activeSection !== "signup" && (
              <h3>Please login or signup to continue.</h3>
            )}
          </>
        ) : (
          <>
            {activeSection === "upload" && (
              <ImageUploader onPrediction={handlePrediction} />
            )}
            {activeSection === "history" && <History />}
            {activeSection === "analytics" && (
              <Analytics predictions={predictions} />
            )}
          </>
        )}
      </div>
      <Footer />
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

export default App;
