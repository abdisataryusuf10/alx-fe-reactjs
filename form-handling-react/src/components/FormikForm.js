import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // YUP VALIDATION SCHEMA
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  // FORMIK VALIDATION LOGIC
  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      // Log form values
      console.log('Formik Form Values:', values);
      
      // Mock API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          // In real app, never send plain passwords
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(`Registration successful with Formik!\nWelcome ${values.username}\nUser ID: ${data.id}`);
        resetForm();
      } else {
        throw new Error('Registration failed - Server error');
      }
    } catch (error) {
      setFieldError('submit', 'Error during registration: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="formik-form">
      <h2>Registration Form (Formik with Yup)</h2>
      <p>Using Formik for state management and Yup for validation schema</p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field 
                type="text" 
                id="username" 
                name="username" 
                className={`formik-input ${errors.username && touched.username ? 'error-input' : ''}`}
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            
            <div>
              <label htmlFor="email">Email:</label>
              <Field 
                type="email" 
                id="email" 
                name="email" 
                className={`formik-input ${errors.email && touched.email ? 'error-input' : ''}`}
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            
            <div>
              <label htmlFor="password">Password:</label>
              <Field 
                type="password" 
                id="password" 
                name="password" 
                className={`formik-input ${errors.password && touched.password ? 'error-input' : ''}`}
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                className={`formik-input ${errors.confirmPassword && touched.confirmPassword ? 'error-input' : ''}`}
                placeholder="Confirm password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>
            
            {/* Form values preview */}
            <div className="form-values">
              <h4>Current Form Values:</h4>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
            
            {errors.submit && <div className="error submit-error">{errors.submit}</div>}
            
            <button type="submit" disabled={isSubmitting} className="formik-button">
              {isSubmitting ? 'Registering with Formik...' : 'Register with Formik'}
            </button>
            
            {/* Form status */}
            <div className="form-status">
              <p>Fields touched: {Object.keys(touched).length}</p>
              <p>Validation errors: {Object.keys(errors).length}</p>
            </div>
          </Form>
        )}
      </Formik>
      
      <div className="validation-info">
        <h4>Yup Validation Schema Applied:</h4>
        <ul>
          <li>Username: Required, 3-20 characters</li>
          <li>Email: Required, valid email format</li>
          <li>Password: Required, min 6 chars, uppercase, lowercase, number</li>
          <li>Confirm Password: Required, must match password</li>
        </ul>
      </div>
    </div>
  );
};

export default FormikForm;