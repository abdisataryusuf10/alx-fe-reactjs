import { useState } from 'react';

const ProfileSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    twoFactorAuth: false,
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="profile-settings">
      <h1>Profile Settings</h1>
      
      <div className="settings-section">
        <h2>Notification Settings</h2>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
            Email Notifications
          </label>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Appearance</h2>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
            Dark Mode
          </label>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Security</h2>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={() => handleToggle('twoFactorAuth')}
            />
            Two-Factor Authentication
          </label>
        </div>
      </div>
      
      <button className="save-button">Save Changes</button>
    </div>
  );
};

export default ProfileSettings;