import React from 'react';
import { Link } from 'react-router-dom';

const ProfileOverview = () => {
  return (
    <div className="profile-overview">
      <h2>Profile Overview</h2>
      
      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">Posts Created</div>
          <Link to="posts" className="stat-link">View all →</Link>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">156</div>
          <div className="stat-label">Profile Views</div>
          <div className="stat-subtext">This month</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">42</div>
          <div className="stat-label">Days Active</div>
          <div className="stat-subtext">Account age</div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="details" className="action-btn">
            Edit Profile
          </Link>
          <Link to="settings" className="action-btn secondary">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;