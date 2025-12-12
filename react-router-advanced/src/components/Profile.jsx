import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <div className="user-info">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="profile-layout">
        {/* Sidebar Navigation */}
        <div className="profile-sidebar">
          <nav className="profile-nav">
            <Link 
              to="details" 
              className={`nav-link ${location.pathname.includes('details') ? 'active' : ''}`}
            >
              Profile Details
            </Link>
            
            <Link 
              to="settings" 
              className={`nav-link ${location.pathname.includes('settings') ? 'active' : ''}`}
            >
              Profile Settings
            </Link>
            
            <Link 
              to="posts" 
              className={`nav-link ${location.pathname.includes('posts') ? 'active' : ''}`}
            >
              My Posts
            </Link>
          </nav>
        </div>

        {/* Nested Routes Container */}
        <div className="profile-content">
          <Routes>
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="posts" element={<div>My Posts Component</div>} />
            <Route path="*" element={<ProfileDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;