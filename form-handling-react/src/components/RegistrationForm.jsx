import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormikRegistrationForm = () => {
  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', values);
        alert('Registration successful!');
        resetForm();
        setSubmitting(false);
      }, 1000);
    },
  });

  return (
    <div className="registration-form-container">
      <h2>Register with Formik</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className={`form-control ${
              formik.touched.username && formik.errors.username ? 'error' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error-message">{formik.errors.username}</div>
          ) : null}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? 'error' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control ${
              formik.touched.password && formik.errors.password ? 'error' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={`form-control ${
              formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error-message">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="submit-btn"
        >
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Debug info (optional) */}
      <div className="debug-info" style={{ marginTop: '20px' }}>
        <h4>Form State:</h4>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        <h4>Validation Errors:</h4>
        <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
        <h4>Form Status:</h4>
        <p>Valid: {formik.isValid ? 'Yes' : 'No'}</p>
        <p>Dirty: {formik.dirty ? 'Yes' : 'No'}</p>
        <p>Touched: {JSON.stringify(formik.touched)}</p>
      </div>
    </div>
  );
};

export default FormikRegistrationForm;