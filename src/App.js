import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{process.env.REACT_APP_NAME || "Student Major Project"}</h1>
        <div className="status-card">
          <p><strong>Environment:</strong> {process.env.REACT_APP_ENV || "Local"}</p>
          <p><strong>Debug Mode:</strong> {process.env.REACT_APP_DEBUG || "false"}</p>
          <p style={{ color: process.env.REACT_APP_COLOR || "white" }}>
            <strong>Current Theme Color:</strong> {process.env.REACT_APP_COLOR || "N/A"}
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
