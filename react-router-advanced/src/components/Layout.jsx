import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAuth } from '../components/Layout';


const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            Protected Routes Demo
          </Link>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            
            <Link to="/blog/1" className="nav-link">Dynamic Route: /blog/1</Link>
            
            {/* Protected Route Links */}
            {isAuthenticated ? (
              <>
                <button onClick={goToProfile} className="nav-link profile-btn">
                  Protected Route: /profile
                </button>
                
                <button onClick={goToDashboard} className="nav-link dashboard-btn">
                  Protected Route: /dashboard
                </button>
                
                <div className="user-info">
                  <span>Logged in as: {user?.email}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="nav-link login-btn">
                Login to Access /profile and /dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <h3>Protected Route: <code>/profile</code></h3>
          <p>This application demonstrates protected routes using React Router.</p>
          <div className="route-demo">
            <p><strong>Try this:</strong></p>
            <ol>
              <li>Click "Login to Access /profile and /dashboard"</li>
              <li>Login with any credentials</li>
              <li>Click "Protected Route: /profile"</li>
              <li>You'll access the protected <code>/profile</code> route</li>
            </ol>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout