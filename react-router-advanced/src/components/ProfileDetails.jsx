import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h3>{user.username}</h3>
            <p className="email">{user.email}</p>
            <span className="role-badge">{user.role}</span>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">12</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat">
            <span className="stat-value">45</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat">
            <span className="stat-value">67</span>
            <span className="stat-label">Followers</span>
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="detail-item">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">January 2024</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Active:</span>
            <span className="detail-value">2 hours ago</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email Verified:</span>
            <span className="detail-value verified">✓ Verified</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Account Status:</span>
            <span className="detail-value active">● Active</span>
          </div>
        </div>
      </div>

      <div className="navigation-hint">
        <p>💡 This is a nested route. Check out the Profile Settings!</p>
      </div>
    </div>
  );
};

export default ProfileDetails;