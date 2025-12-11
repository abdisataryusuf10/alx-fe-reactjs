import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/profile', label: 'Profile Details', end: true },
    { path: '/profile/settings', label: 'Settings', end: false }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p className="profile-subtitle">
          Nested routing example with Profile Details and Settings
        </p>
      </div>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="user-card">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h3>{user?.username}</h3>
              <p className="user-email">{user?.email}</p>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>

          <nav className="profile-nav">
            <ul>
              {navItems.map(item => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    end={item.end}
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-info">
            <h4>Nested Route Info:</h4>
            <p>
              This profile section uses nested routing. The main profile 
              layout contains child routes that render in the outlet below.
            </p>
            <div className="route-structure">
              <code>/profile</code>
              <div className="nested-routes">
                <code>├── /profile</code>
                <code>└── /profile/settings</code>
              </div>
            </div>
          </div>
        </aside>

        <main className="profile-main">
          <div className="profile-content">
            <Outlet />
          </div>

          <div className="profile-actions">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            <button className="edit-profile-btn">
              Edit Profile
            </button>
          </div>

          <div className="routing-info">
            <h4>Current Nested Route:</h4>
            <div className="current-route">
              <code>{window.location.pathname}</code>
            </div>
            <p className="info-note">
              💡 Try clicking between Profile Details and Settings to see 
              nested routing in action. The URL changes but the layout persists.
            </p>
          </div>
        </main>
      </div>

      <div className="profile-footer">
        <div className="tech-demo">
          <h4>Nested Routing Demo Features:</h4>
          <ul>
            <li>✅ Persistent parent layout</li>
            <li>✅ Independent child route rendering</li>
            <li>✅ Nested navigation with active states</li>
            <li>✅ Shared user context</li>
            <li>✅ Nested outlet for child routes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;