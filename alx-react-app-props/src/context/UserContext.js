// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// ✅ Create Context
const UserContext = createContext();

// ✅ Context Provider Component
export const UserProvider = ({ children }) => {
  // ✅ State management for user data
  const [user, setUser] = useState({
    name: '',
    email: '',
    isLoggedIn: false
  });

  // ✅ Functions to update user data
  const login = (userData) => {
    setUser({
      ...userData,
      isLoggedIn: true
    });
  };

  const logout = () => {
    setUser({
      name: '',
      email: '',
      isLoggedIn: false
    });
  };

  const updateProfile = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }));
  };

  // ✅ Context value
  const value = {
    user,
    login,
    logout,
    updateProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook for using context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// ✅ Default export
export default UserContext;
