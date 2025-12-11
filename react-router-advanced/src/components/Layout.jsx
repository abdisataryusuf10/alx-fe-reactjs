import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/">Advanced Router</Link>
          </div>
          
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            
            {user ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                  <Link to="/profile">
                    Profile ({user.username})
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </nav>

      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            {/* Dynamic breadcrumbs would go here */}
          </ol>
        </nav>
      </div>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>Advanced Routing Demo • Nested Routes • Protected Routes • Dynamic Routes</p>
        <div className="route-info">
          <span className="info-item">👤 Authentication: {user ? 'Logged In' : 'Guest'}</span>
          <span className="info-item">📍 Current Route: {window.location.pathname}</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;