import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registrationSchema, initialValues } from '../schemas/registrationSchema';

const FormikForm = ({ onSubmit, customInitialValues }) => {
  // Use custom initial values if provided, otherwise use defaults
  const formInitialValues = customInitialValues || initialValues;

  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      await onSubmit(values);
      resetForm();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={registrationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ 
        isSubmitting, 
        errors, 
        touched, 
        values, 
        handleChange, 
        handleBlur,
        isValid,
        dirty
      }) => (
        <Form className="formik-form">
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username *
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${
                touched.username && errors.username ? 'error-border' : ''
              }`}
              placeholder="Enter username"
              autoComplete="username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${
                touched.email && errors.email ? 'error-border' : ''
              }`}
              placeholder="Enter email"
              autoComplete="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${
                touched.password && errors.password ? 'error-border' : ''
              }`}
              placeholder="Enter password"
              autoComplete="new-password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password *
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${
                touched.confirmPassword && errors.confirmPassword ? 'error-border' : ''
              }`}
              placeholder="Confirm password"
              autoComplete="new-password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error-message"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <Field
                type="checkbox"
                name="terms"
                className="checkbox-input"
              />
              <span className="checkbox-text">
                I accept the terms and conditions
              </span>
            </label>
            <ErrorMessage
              name="terms"
              component="div"
              className="error-message"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
            className={`submit-btn ${
              isSubmitting || !isValid || !dirty ? 'disabled' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>

          {/* Form-level error */}
          {errors.submit && (
            <div className="form-error-message">
              {errors.submit}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;