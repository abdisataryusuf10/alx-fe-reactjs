import React, { useState } from 'react';

const ProfileSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings (Nested Route)</h2>
      <p>This is another nested route component inside Profile.</p>
      
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
            />
            Dark Mode
          </label>
        </div>
        
        <div className="form-group">
          <label>Language:</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        
        <button type="submit" className="save-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;