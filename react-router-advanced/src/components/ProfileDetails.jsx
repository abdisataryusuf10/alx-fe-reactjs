import React from 'react';

const ProfileDetails = () => {
  return (
    <div className="profile-details">
      <h2>Profile Details (Nested Route)</h2>
      <p>This is a nested route component inside Profile.</p>
      
      <div className="details-card">
        <h3>User Information</h3>
        <div className="detail">
          <span className="label">Name:</span>
          <span className="value">John Doe</span>
        </div>
        <div className="detail">
          <span className="label">Email:</span>
          <span className="value">john@example.com</span>
        </div>
        <div className="detail">
          <span className="label">Location:</span>
          <span className="value">New York, USA</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;