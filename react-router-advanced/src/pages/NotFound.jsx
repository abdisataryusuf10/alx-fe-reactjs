import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p className="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="error-details">
          <div className="detail-card">
            <h3>Possible reasons:</h3>
            <ul>
              <li>The URL might be incorrect</li>
              <li>The page might have been removed</li>
              <li>You might not have permission to view this page</li>
              <li>There might be a typo in the URL</li>
            </ul>
          </div>
          
          <div className="detail-card">
            <h3>What you can do:</h3>
            <ul>
              <li>Check the URL for typos</li>
              <li>Go back to the previous page</li>
              <li>Navigate to the home page</li>
              <li>Use the navigation menu to find what you need</li>
            </ul>
          </div>
        </div>

        <div className="navigation-actions">
          <Link to="/" className="nav-button primary">
            ← Go to Home
          </Link>
          <button onClick={() => window.history.back()} className="nav-button secondary">
            ← Go Back
          </button>
        </div>

        <div className="route-info">
          <h4>Current Route Information:</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Pathname:</span>
              <code>{window.location.pathname}</code>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className="info-value error">404 Not Found</span>
            </div>
            <div className="info-item">
              <span className="info-label">Time:</span>
              <span className="info-value">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="quick-links">
          <h4>Quick Navigation:</h4>
          <div className="links-grid">
            <Link to="/" className="quick-link">Home</Link>
            <Link to="/about" className="quick-link">About</Link>
            <Link to="/blog" className="quick-link">Blog</Link>
            <Link to="/login" className="quick-link">Login</Link>
            <Link to="/dashboard" className="quick-link">Dashboard</Link>
            <Link to="/profile" className="quick-link">Profile</Link>
          </div>
        </div>

        <div className="dev-note">
          <p>
            <strong>Note to Developers:</strong> This 404 page is rendered by 
            React Router's catch-all route (<code>path="*"</code>). Make sure 
            this route is always the last route in your configuration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;