import React, { useState } from 'react'
import { useUser } from '../context/UserContext'

const LoginForm = () => {
  const { login, isAuthenticated, user } = useUser()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      // Simple login - in a real app, you'd validate credentials
      login({
        name: formData.name,
        email: formData.email
      })
    } else {
      // Sign up
      login({
        name: formData.name,
        email: formData.email
      })
    }
    setFormData({ name: '', email: '', password: '' })
  }

  if (isAuthenticated) {
    return (
      <div className="login-status">
        <h3>Welcome back, {user.name}!</h3>
        <p>You are logged in as {user.email}</p>
      </div>
    )
  }

  return (
    <div className="login-form">
      <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email address"
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p className="auth-toggle">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          type="button" 
          onClick={() => setIsLogin(!isLogin)}
          className="btn-link"
        >
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
    </div>
  )
}

export default LoginForm
