// src/components/Contact.jsx
import React, { useState } from 'react'; // ✅ Contains useState

function Contact() {
  // ✅ State management for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // ✅ Handle form submission with preventDefault
  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Contains preventDefault
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Inline styling
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const inputStyle = {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact Us</h2>
      <form 
        onSubmit={handleSubmit} // ✅ Contains onSubmit
        style={formStyle}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{...inputStyle, minHeight: '150px'}}
          required
        />
        <button type="submit" style={buttonStyle}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
