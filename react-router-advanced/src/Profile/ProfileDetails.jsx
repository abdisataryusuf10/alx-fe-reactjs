const ProfileDetails = () => {
  return (
    <div className="profile-details">
      <h1>Profile Details</h1>
      <div className="details-grid">
        <div className="detail-item">
          <label>Full Name:</label>
          <span>John Doe</span>
        </div>
        <div className="detail-item">
          <label>Email:</label>
          <span>john.doe@example.com</span>
        </div>
        <div className="detail-item">
          <label>Member Since:</label>
          <span>January 2024</span>
        </div>
        <div className="detail-item">
          <label>Role:</label>
          <span>Premium User</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;