import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ 
            backgroundColor: '#333', 
            padding: '1rem',
            marginBottom: '20px'
        }}>
            <Link 
                to="/" 
                style={{ 
                    color: 'white', 
                    margin: '0 15px', 
                    textDecoration: 'none',
                    fontSize: '18px'
                }}
            >
                Home
            </Link>
            <Link 
                to="/about" 
                style={{ 
                    color: 'white', 
                    margin: '0 15px', 
                    textDecoration: 'none',
                    fontSize: '18px'
                }}
            >
                About
            </Link>
            <Link 
                to="/services" 
                style={{ 
                    color: 'white', 
                    margin: '0 15px', 
                    textDecoration: 'none',
                    fontSize: '18px'
                }}
            >
                Services
            </Link>
            <Link 
                to="/contact" 
                style={{ 
                    color: 'white', 
                    margin: '0 15px', 
                    textDecoration: 'none',
                    fontSize: '18px'
                }}
            >
                Contact
            </Link>
        </nav>
    );
}

// src/components/Navbar.jsx
import React from 'react';

function Navbar() {
  // ✅ Inline styling with display and justifyContent
  const navStyle = {
    display: 'flex', // ✅ Contains display
    justifyContent: 'space-between', // ✅ Contains justifyContent
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  const navLinksStyle = {
    display: 'flex', // ✅ Additional display property
    justifyContent: 'center', // ✅ Additional justifyContent
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        Recipe App
      </div>
      <ul style={navLinksStyle}>
        <li>
          <a href="/" style={linkStyle}>Home</a>
        </li>
        <li>
          <a href="/recipes" style={linkStyle}>Recipes</a>
        </li>
        <li>
          <a href="/contact" style={linkStyle}>Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
