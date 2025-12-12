import { useState } from 'react';

const RegistrationForm = () => {
  // State for controlled components
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // BASIC VALIDATION LOGIC
  const validateForm = () => {
    const newErrors = {};
    
    // Username validation - basic check for empty field
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation - basic check for empty field
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation - basic check for empty field
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setSuccessMessage('');
    
    // Validate form using basic validation logic
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password // Note: In real app, never send plain passwords
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Registration successful! Welcome ${username}`);
        
        // Reset form
        setUsername('');
        setEmail('');
        setPassword('');
        setErrors({});
        
        // Log to console for demonstration
        console.log('Registration data:', { username, email, id: data.id });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setErrors({ submit: 'Error during registration: ' + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    switch(field) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration Form (Controlled Components)</h2>
      <p>Using basic validation logic with controlled components</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className={errors.username ? 'error-input' : ''}
            placeholder="Enter username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'error-input' : ''}
            placeholder="Enter email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={errors.password ? 'error-input' : ''}
            placeholder="Enter password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        
        {errors.submit && <div className="error submit-error">{errors.submit}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <div className="validation-info">
        <h4>Basic Validation Applied:</h4>
        <ul>
          <li>Username: Required, min 3 characters</li>
          <li>Email: Required, valid format</li>
          <li>Password: Required, min 6 characters</li>
        </ul>
      </div>
    </div>
  );
};

export default RegistrationForm;