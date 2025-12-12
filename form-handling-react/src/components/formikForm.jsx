import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegistrationForm.css';

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Yup validation schema with string().required() for each field
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    
    email: Yup.string()
      .required('Email is required')  // string().required() directly after string()
      .email('Invalid email address'),
    
    password: Yup.string()
      .required('Password is required')  // string().required() directly after string()
      .min(6, 'Password must be at least 6 characters'),
    
    confirmPassword: Yup.string()
      .required('Confirm password is required')  // string().required() directly after string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  // Formik validation logic
  const validateForm = (values) => {
    const errors = {};
    
    if (!values.username) {
      errors.username = 'Username is required';
    } else if (values.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
    
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      // Mock API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password
        }),
      });
      
      if (response.ok) {
        setStatus({ type: 'success', message: 'Registration successful!' });
        resetForm();
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error: ' + error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>User Registration (Formik)</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="registration-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="form-field"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-field"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-field"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-field"
              />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            
            {status && (
              <div className={`submit-message ${status.type}`}>
                {status.message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;