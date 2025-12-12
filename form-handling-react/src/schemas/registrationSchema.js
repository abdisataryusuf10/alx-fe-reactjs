import * as Yup from 'yup';

export const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be 20 characters or less')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .required('Username is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase, one lowercase, one number and one special character'
    )
    .required('Password is required'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

export const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
};