import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <div className="details-card">
        <div className="section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Username:</span>
              <span className="value">{user?.username}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Role:</span>
              <span className="value role">{user?.role}</span>
            </div>
          </div>
        </div>
        
        <div className="section">
          <h3>Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Member Since:</span>
              <span className="value">January 2024</span>
            </div>
            <div className="info-item">
              <span className="label">Account Status:</span>
              <span className="value active">Active</span>
            </div>
            <div className="info-item">
              <span className="label">Last Login:</span>
              <span className="value">Today at 10:30 AM</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="nested-route-info">
        <p>
          <strong>💡 This is a nested route!</strong> This component is rendered 
          inside the Profile component's Outlet. The URL is /profile.
        </p>
      </div>
    </div>
  );
};

export default ProfileDetails;