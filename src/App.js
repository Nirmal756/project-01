import React from 'react';
import './App.css';

function App() {
  // Mapping .env variables
  const themeColor = process.env.REACT_APP_COLOR || "#2563eb"; 
  const projectName = process.env.REACT_APP_NAME || "DevOps Pipeline";
  const envName = process.env.REACT_APP_ENV || "Unknown";
  const isDebug = process.env.REACT_APP_DEBUG === "true";

  return (
    <div className="App" style={{ backgroundColor: themeColor }}>
      <div className="glass-card">
        <header className="dashboard-header">
          <div className="status-indicator">
            <span className="pulse"></span> System Operational
          </div>
          <h1>{projectName}</h1>
          <p className="env-label">Infrastructure: <strong>{envName}</strong></p>
        </header>

        <section className="metrics-grid">
          <div className="metric">
            <label>Pipeline Status</label>
            <div className="status-text">Healthy</div>
          </div>
          <div className="metric">
            <label>Debug Mode</label>
            <div className={`status-text ${isDebug ? 'debug-on' : ''}`}>
              {isDebug ? "Active" : "Disabled"}
            </div>
          </div>
        </section>

        <div className="deployment-details">
          <h3>Deployment Metadata</h3>
          <ul>
            <li><strong>Registry:</strong> Amazon ECR</li>
            <li><strong>Runner:</strong> Self-Hosted (EC2)</li>
            <li><strong>Orchestration:</strong> Docker Compose</li>
          </ul>
        </div>

        <div className="theme-info">
          <p>Background color driven by <code>REACT_APP_COLOR</code></p>
          <div className="hex-display">{themeColor}</div>
        </div>

        <footer className="footer">
          &copy; 2026 {projectName} | Automated via GitHub Actions
        </footer>
      </div>
    </div>
  );
}

export default App;
