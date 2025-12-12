import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Dashboard (Protected Route)</h1>
      <p>This route is protected and requires authentication.</p>
      <p>You are logged in as: <strong>{user?.email}</strong></p>
      
      <div className="dashboard-content">
        <h2>Protected Route Implementation</h2>
        <div className="info-card">
          <h3>Route: <code>/profile</code></h3>
          <p>This route is protected using the <code>ProtectedRoute</code> component.</p>
          <p>Accessing <code>/profile</code> without authentication redirects to login.</p>
        </div>
        
        <div className="info-card">
          <h3>How Protected Routes Work:</h3>
          <ol>
            <li>Try accessing <code>/profile</code> without logging in</li>
            <li>The <code>ProtectedRoute</code> component checks authentication</li>
            <li>If not authenticated, redirects to <code>/login</code></li>
            <li>After login, returns to <code>/profile</code></li>
          </ol>
        </div>
        
        <div className="info-card">
          <h3>Current Routes:</h3>
          <ul>
            <li><code>/profile</code> - Protected route (requires login)</li>
            <li><code>/dashboard</code> - Another protected route</li>
            <li><code>/blog/:id</code> - Dynamic route (no login required)</li>
            <li><code>/</code> - Home page (public)</li>
            <li><code>/login</code> - Login page (public)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;