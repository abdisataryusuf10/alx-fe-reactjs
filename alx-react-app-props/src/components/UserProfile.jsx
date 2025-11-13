// src/components/UserProfile.jsx
import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; // ✅ Import UserContext

function UserProfile() {
  // ✅ Use useContext hook to consume context
  const { user, login, logout, updateProfile } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  });

  const handleLogin = () => {
    login({
      name: 'John Doe',
      email: 'john@example.com'
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Inline styling
  const containerStyle = {
    padding: '1rem',
    margin: '1rem 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    margin: '0.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h2>User Profile</h2>
      
      {!user.isLoggedIn ? (
        <div>
          <p>Please log in</p>
          <button onClick={handleLogin} style={buttonStyle}>
            Login as Demo User
          </button>
        </div>
      ) : (
        <div>
          {!editMode ? (
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button 
                onClick={() => setEditMode(true)} 
                style={buttonStyle}
              >
                Edit Profile
              </button>
              <button 
                onClick={logout} 
                style={{...buttonStyle, backgroundColor: '#dc3545'}}
              >
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
                />
              </div>
              <button type="submit" style={buttonStyle}>
                Save Changes
              </button>
              <button 
                type="button" 
                onClick={() => setEditMode(false)}
                style={{...buttonStyle, backgroundColor: '#6c757d'}}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
