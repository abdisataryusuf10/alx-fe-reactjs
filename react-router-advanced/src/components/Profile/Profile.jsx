import { Outlet, NavLink } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-sidebar">
        <h2>My Profile</h2>
        <nav className="profile-nav">
          <NavLink to="/profile" end className="profile-nav-link">
            Overview
          </NavLink>
          <NavLink to="/profile/details" className="profile-nav-link">
            Details
          </NavLink>
          <NavLink to="/profile/settings" className="profile-nav-link">
            Settings
          </NavLink>
        </nav>
      </div>
      
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;