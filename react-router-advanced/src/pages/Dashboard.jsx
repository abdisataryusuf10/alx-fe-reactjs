import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Visits', value: '1,234', change: '+12%' },
    { label: 'Active Users', value: '567', change: '+8%' },
    { label: 'Page Views', value: '8,901', change: '+23%' },
    { label: 'Conversion Rate', value: '4.5%', change: '+2%' }
  ];

  const recentActivities = [
    { id: 1, action: 'Logged in', time: '2 minutes ago', user: 'You' },
    { id: 2, action: 'Updated profile', time: '1 hour ago', user: 'John Doe' },
    { id: 3, action: 'Created new post', time: '3 hours ago', user: 'Jane Smith' },
    { id: 4, action: 'Commented on blog', time: '5 hours ago', user: 'Bob Wilson' },
    { id: 5, action: 'Logged out', time: '1 day ago', user: 'Alice Brown' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="welcome-message">
          Welcome back, <strong>{user?.username}</strong>! Here's what's happening.
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <h3>{stat.label}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
            <div className="stat-icon">
              {index === 0 && '📊'}
              {index === 1 && '👥'}
              {index === 2 && '👁️'}
              {index === 3 && '📈'}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-column">
          <div className="card">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">⚡</div>
                  <div className="activity-details">
                    <div className="activity-action">
                      <strong>{activity.user}</strong> {activity.action}
                    </div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-column">
          <div className="card">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">✏️</span>
                <span className="action-text">Create Post</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">⚙️</span>
                <span className="action-text">Settings</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">👤</span>
                <span className="action-text">Profile</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📊</span>
                <span className="action-text">Analytics</span>
              </button>
            </div>
          </div>

          <div className="card">
            <h2>Route Information</h2>
            <div className="route-info-card">
              <div className="info-item">
                <span className="info-label">Current Route:</span>
                <code>/dashboard</code>
              </div>
              <div className="info-item">
                <span className="info-label">Route Type:</span>
                <span className="info-value protected">Protected Route</span>
              </div>
              <div className="info-item">
                <span className="info-label">User Role:</span>
                <span className="info-value role">{user?.role}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Auth Status:</span>
                <span className="info-value authenticated">Authenticated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <div className="note">
          <strong>Note:</strong> This is a protected route. Only authenticated users can see this content.
          Try logging out and accessing this page again to see the redirect.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;