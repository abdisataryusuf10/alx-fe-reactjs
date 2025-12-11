import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    newsletter: false,
    darkMode: false,
    language: 'en'
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    updateUser({ settings });
    alert('Settings saved successfully!');
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      
      <div className="settings-card">
        <div className="settings-section">
          <h3>Notification Settings</h3>
          <div className="setting-item">
            <span className="setting-label">Email Notifications</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
              <span className="slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <span className="setting-label">Newsletter</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.newsletter}
                onChange={() => handleToggle('newsletter')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="setting-item">
            <span className="setting-label">Dark Mode</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <span className="slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <span className="setting-label">Language</span>
            <select
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="language-select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
        
        <div className="settings-actions">
          <button onClick={handleSave} className="save-btn">
            Save Settings
          </button>
        </div>
      </div>
      
      <div className="nested-route-info">
        <p>
          <strong>💡 This is another nested route!</strong> This component is also 
          rendered inside the Profile component's Outlet. The URL is /profile/settings.
        </p>
      </div>
    </div>
  );
};

export default ProfileSettings;