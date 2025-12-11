import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    twoFactorAuth: false,
    language: 'en'
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelectChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
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
          <h3>Account Settings</h3>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Email Notifications</span>
              <span className="setting-description">Receive email updates</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Dark Mode</span>
              <span className="setting-description">Toggle dark theme</span>
            </div>
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
            <div className="setting-info">
              <span className="setting-label">Two-Factor Authentication</span>
              <span className="setting-description">Extra security layer</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Preferences</h3>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Language</span>
              <span className="setting-description">Interface language</span>
            </div>
            <select
              value={settings.language}
              onChange={handleSelectChange}
              className="language-select"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <div className="settings-actions">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
          <button className="reset-btn" onClick={() => setSettings({
            emailNotifications: true,
            darkMode: false,
            twoFactorAuth: false,
            language: 'en'
          })}>
            Reset to Defaults
          </button>
        </div>
      </div>

      <div className="navigation-hint">
        <p>🔧 These settings are saved in the Auth Context</p>
      </div>
    </div>
  );
};

export default ProfileSettings;