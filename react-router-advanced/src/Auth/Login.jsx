import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password, role);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleDemoLogin = (demoRole = 'user') => {
    setEmail(`${demoRole}@example.com`);
    setPassword('password123');
    setRole(demoRole);
    
    setTimeout(() => {
      login(`${demoRole}@example.com`, 'password123', demoRole);
      navigate(from, { replace: true });
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Login Required</h2>
          <p>You need to login to access protected routes</p>
          {from !== '/' && (
            <p className="redirect-info">
              Redirecting to: <code>{from}</code>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Login As</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-select"
            >
              <option value="user">Regular User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-logins">
          <h4>Quick Demo Logins:</h4>
          <div className="demo-buttons">
            <button onClick={() => handleDemoLogin('user')} className="demo-button user">
              Login as User
            </button>
            <button onClick={() => handleDemoLogin('admin')} className="demo-button admin">
              Login as Admin
            </button>
          </div>
          <p className="demo-note">
            Demo credentials will be auto-filled and login will be simulated
          </p>
        </div>

        <div className="protected-routes-info">
          <h4>Protected Routes in This App:</h4>
          <ul className="protected-list">
            <li>
              <strong>/profile</strong> - User profile with nested routes
            </li>
            <li>
              <strong>/dashboard</strong> - User dashboard
            </li>
            <li>
              <strong>/admin</strong> - Admin panel (admin role required)
            </li>
          </ul>
          
          <div className="code-example">
            <h5>Protected Route Implementation:</h5>
            <pre>
{`<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

<ProtectedRoute requiredRole="admin">
  <Admin />
</ProtectedRoute>`}
            </pre>
          </div>
        </div>
        
        <div className="login-footer">
          <p>
            <strong>Note:</strong> This is a demo. No real authentication is performed.
          </p>
          <button onClick={() => navigate('/')} className="back-home">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;