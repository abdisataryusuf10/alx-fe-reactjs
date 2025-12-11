import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Advanced Routing Demo</h1>
        <p className="subtitle">
          Explore nested routes, protected routes, and dynamic routing
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Protected Routes</h3>
          <p>Authentication-based route protection with redirects</p>
          <Link to="/login" className="feature-link">
            Try Login →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📁</div>
          <h3>Nested Routes</h3>
          <p>Hierarchical routing with nested layouts</p>
          <Link to="/profile" className="feature-link">
            View Profile →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Dynamic Routes</h3>
          <p>URL parameters for dynamic content loading</p>
          <Link to="/blog" className="feature-link">
            Explore Blog →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧭</div>
          <h3>Advanced Navigation</h3>
          <p>Programmatic navigation and route guards</p>
          <Link to="/dashboard" className="feature-link">
            Visit Dashboard →
          </Link>
        </div>
      </div>

      <div className="quick-links">
        <h2>Quick Navigation</h2>
        <div className="links-grid">
          <Link to="/about" className="quick-link">About Page</Link>
          <Link to="/blog/1" className="quick-link">Blog Post #1</Link>
          <Link to="/blog/2" className="quick-link">Blog Post #2</Link>
          <Link to="/blog/3" className="quick-link">Blog Post #3</Link>
          <Link to="/profile/settings" className="quick-link">Profile Settings</Link>
          <Link to="/dashboard" className="quick-link">Dashboard</Link>
        </div>
      </div>

      <div className="tech-info">
        <h3>Technologies Used:</h3>
        <ul>
          <li>React Router DOM v6</li>
          <li>Context API for Auth</li>
          <li>Dynamic Route Parameters</li>
          <li>Nested Route Structure</li>
          <li>Protected Route Components</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;