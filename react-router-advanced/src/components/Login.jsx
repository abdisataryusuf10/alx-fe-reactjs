import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = login(email, password);
      
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Login failed. Try any email/password.');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('user@example.com');
    setPassword('password');
    login('user@example.com', 'password');
    navigate(from, { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Access Protected Routes</h2>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter any email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter any password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="login-btn"
          >
            {loading ? 'Logging in...' : 'Login & Access Protected Route'}
          </button>
        </form>
        
        <button onClick={handleDemoLogin} className="demo-login-btn">
          Quick Demo Login
        </button>
        
        <div className="protected-route-demo">
          <h3>How Protected Routes Work:</h3>
          <ol>
            <li>Try accessing <strong>/profile</strong> or <strong>/dashboard</strong> without logging in</li>
            <li>The <code>ProtectedRoute</code> component uses <code>useAuth()</code> to check authentication</li>
            <li>If not authenticated, you're redirected to login with the attempted URL saved</li>
            <li>After login, you're redirected back to the protected route</li>
            <li>The <code>ProtectedRoute</code> component renders the protected content</li>
          </ol>
          
          <div className="code-demo">
            <h4>ProtectedRoute Component Code:</h4>
            <pre>
{`const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;