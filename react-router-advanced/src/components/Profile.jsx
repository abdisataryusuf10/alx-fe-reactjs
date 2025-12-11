import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p className="profile-subtitle">
          This is a nested route example. Profile Details and Settings are nested routes.
        </p>
      </div>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="user-info-card">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h3>{user?.username}</h3>
              <p className="user-email">{user?.email}</p>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>

          <nav className="profile-navigation">
            <ul>
              <li>
                <NavLink 
                  to="/profile" 
                  end
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="nav-icon">👤</span>
                  <span className="nav-text">Profile Details</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/profile/settings"
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="nav-icon">⚙️</span>
                  <span className="nav-text">Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard"
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">Dashboard</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="sidebar-info">
            <h4>Nested Route Structure:</h4>
            <div className="route-tree">
              <div className="route-item">/profile</div>
              <div className="route-children">
                <div className="route-child">├── /profile (Details)</div>
                <div className="route-child">└── /profile/settings</div>
              </div>
            </div>
            <p className="info-note">
              Nested routes allow you to render components inside parent layouts while maintaining the URL structure.
            </p>
          </div>
        </aside>

        <main className="profile-content">
          <div className="content-header">
            <h2>Profile Content Area</h2>
            <p>This area renders different content based on nested routes.</p>
          </div>
          
          <div className="outlet-container">
            <Outlet />
          </div>

          <div className="route-info">
            <h4>Current Route Information:</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Parent Route:</span>
                <code>/profile</code>
              </div>
              <div className="info-item">
                <span className="info-label">Nested Route:</span>
                <code>{window.location.pathname}</code>
              </div>
              <div className="info-item">
                <span className="info-label">Route Type:</span>
                <span className="info-value nested">Nested Route</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="profile-footer">
        <div className="navigation-demo">
          <h4>Try This:</h4>
          <div className="demo-steps">
            <div className="step">
              <span className="step-number">1</span>
              <span>Click on Profile Details or Settings in the sidebar</span>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <span>Notice how the URL changes but the layout stays the same</span>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <span>Check that the Outlet component renders different content</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;