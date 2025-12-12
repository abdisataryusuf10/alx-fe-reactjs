import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/profile');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">Advanced Router</NavLink>
      </div>
      
      <div className="navbar-menu">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/blog" className="nav-link">Blog</NavLink>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
      </div>
      
      <div className="navbar-actions">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="btn btn-logout">Logout</button>
        ) : (
          <button onClick={handleLogin} className="btn btn-login">Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;