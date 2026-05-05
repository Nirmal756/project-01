import React from 'react';
import './App.css';

function App() {
  // Pulling variables from your .env.dev
  const themeColor = process.env.REACT_APP_COLOR || "#3b82f6"; // Defaults to Blue if .env fails
  const isDebug = process.env.REACT_APP_DEBUG === "true";

  return (
    <div className="App">
      {/* Dynamic Header Sidebar-style accent */}
      <nav className="side-accent" style={{ backgroundColor: themeColor }}></nav>

      <div className="main-layout">
        <header className="business-header">
          <div className="brand">
            <span className="brand-icon">🌐</span>
            <div>
              <h1>{process.env.REACT_APP_NAME || "Enterprise Logistics"}</h1>
              <span className="env-badge" style={{ color: themeColor, borderColor: themeColor }}>
                {process.env.REACT_APP_ENV} MODE
              </span>
            </div>
          </div>
          <div className="user-profile">
            <p>System Administrator</p>
            <div className="avatar">AD</div>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="metrics-row">
            <div className="metric-card">
              <label>Active Shipments</label>
              <h2>1,284</h2>
              <span className="trend positive">↑ 12% vs last month</span>
            </div>
            <div className="metric-card">
              <label>Fleet Efficiency</label>
              <h2>94.2%</h2>
              <span className="trend">Optimal Performance</span>
            </div>
            <div className="metric-card">
              <label>Revenue (MTD)</label>
              <h2>$4.2M</h2>
              <span className="trend positive">↑ 5.4%</span>
            </div>
          </div>

          <section className="info-section">
            <div className="details-panel">
              <h3>System Configuration</h3>
              <table className="config-table">
                <tbody>
                  <tr>
                    <td>Instance Identifier</td>
                    <td>{process.env.REACT_APP_NAME}</td>
                  </tr>
                  <tr>
                    <td>Deployment Environment</td>
                    <td style={{ fontWeight: 'bold', color: themeColor }}>{process.env.REACT_APP_ENV}</td>
                  </tr>
                  <tr>
                    <td>Diagnostic Debugging</td>
                    <td>
                      <span className={`status-pill ${isDebug ? 'on' : 'off'}`}>
                        {isDebug ? "ENABLED" : "DISABLED"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="color-panel" style={{ borderLeft: `8px solid ${themeColor}` }}>
              <h3>Brand Identity</h3>
              <p>This module's UI is currently rendered using the environment-specific branding color:</p>
              <div className="color-hex" style={{ color: themeColor }}>{themeColor}</div>
              <div className="visual-sample" style={{ backgroundColor: themeColor }}></div>
            </div>
          </section>
        </main>

        <footer className="business-footer">
          <p>© 2026 Global Logistics Corp | Infrastructure: <strong>{process.env.REACT_APP_ENV}</strong></p>
        </footer>
      </div>
    </div>
  );
}

export default App;
