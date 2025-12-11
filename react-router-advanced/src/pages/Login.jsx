import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    // Mock authentication
    const success = await login(credentials.username, credentials.password);
    
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials. Try: admin / password123');
    }
  };

  const handleDemoLogin = (type) => {
    const demoUsers = {
      admin: { username: 'admin', password: 'password123' },
      user: { username: 'john_doe', password: 'password123' },
      guest: { username: 'guest_user', password: 'password123' }
    };

    setCredentials(demoUsers[type]);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <p className="login-subtitle">
          {from !== '/' ? `Redirecting to: ${from}` : 'Access protected routes'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({
                ...credentials,
                username: e.target.value
              })}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({
                ...credentials,
                password: e.target.value
              })}
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="demo-logins">
          <p>Try demo logins:</p>
          <div className="demo-buttons">
            <button
              onClick={() => handleDemoLogin('admin')}
              className="demo-btn admin"
            >
              Admin
            </button>
            <button
              onClick={() => handleDemoLogin('user')}
              className="demo-btn user"
            >
              Regular User
            </button>
            <button
              onClick={() => handleDemoLogin('guest')}
              className="demo-btn guest"
            >
              Guest
            </button>
          </div>
        </div>

        <div className="login-info">
          <p className="info-note">
            💡 After login, you'll be redirected to your previous location or home page.
          </p>
          <p className="info-note">
            🔒 Protected routes like Dashboard and Profile will become accessible.
          </p>
        </div>

        <div className="login-footer">
          <Link to="/" className="back-home">
            ← Back to Home
          </Link>
          <span className="test-credentials">
            All demo accounts use password: <strong>password123</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;