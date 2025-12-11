import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>Advanced Routing Demo • React Router v6 • Authentication</p>
        <div className="route-status">
          <span className="status-item">
            Authentication: {user ? '✅ Logged In' : '🔒 Guest'}
          </span>
          <span className="status-item">
            Current Route: {window.location.pathname}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;