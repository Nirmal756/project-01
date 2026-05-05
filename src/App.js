import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <span className="icon">🚀</span> 
          {process.env.REACT_APP_NAME || "DevOps Deployment Portal"}
        </div>
        <div className="nav-links">
          <span>Documentation</span>
          <span className="profile-circle">JS</span>
        </div>
      </nav>

      <main className="container">
        <header className="hero-section">
          <h1>System Overview</h1>
          <p>Real-time status of your containerized infrastructure.</p>
        </header>

        <section className="status-grid">
          {/* Environment Card */}
          <div className="card">
            <h3>Environment</h3>
            <div className="value-box">
              <span className="status-dot"></span>
              {process.env.REACT_APP_ENV || "Local"}
            </div>
          </div>

          {/* Debug Mode Card */}
          <div className="card">
            <h3>Debug Mode</h3>
            <div className={`tag ${process.env.REACT_APP_DEBUG === "true" ? "debug-on" : "debug-off"}`}>
              {process.env.REACT_APP_DEBUG || "false"}
            </div>
          </div>

          {/* Theme Color Card */}
          <div className="card theme-card" style={{ borderTop: `4px solid ${process.env.REACT_APP_COLOR || "#61dafb"}` }}>
            <h3>Theme Configuration</h3>
            <p>Current Active Brand Color:</p>
            <code style={{ color: process.env.REACT_APP_COLOR || "#61dafb" }}>
              {process.env.REACT_APP_COLOR || "N/A"}
            </code>
            <div 
              className="color-preview" 
              style={{ backgroundColor: process.env.REACT_APP_COLOR || "#61dafb" }}
            ></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        © 2026 {process.env.REACT_APP_NAME || "Major Project"} | Automated via GitHub Actions
      </footer>
    </div>
  );
}

export default App;
