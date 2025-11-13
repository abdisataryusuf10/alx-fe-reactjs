import React, { createContext, useContext, useState, useEffect } from 'react'

// Create the UserContext
const UserContext = createContext()

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('recipeAppUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('recipeAppUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('recipeAppUser')
    }
  }, [user])

  // Login function
  const login = (userData) => {
    const userWithId = {
      ...userData,
      id: Date.now(),
      joinedDate: new Date().toISOString(),
      preferences: userData.preferences || {
        dietaryRestrictions: [],
        favoriteCuisines: [],
        cookingSkill: 'beginner'
      }
    }
    setUser(userWithId)
  }

  // Logout function
  const logout = () => {
    setUser(null)
  }

  // Update user profile
  const updateUser = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }))
  }

  // Update user preferences
  const updatePreferences = (preferences) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        ...preferences
      }
    }))
  }

  // Add dietary restriction
  const addDietaryRestriction = (restriction) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        dietaryRestrictions: [
          ...(prevUser.preferences.dietaryRestrictions || []),
          restriction
        ].filter((item, index, array) => array.indexOf(item) === index) // Remove duplicates
      }
    }))
  }

  // Remove dietary restriction
  const removeDietaryRestriction = (restriction) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        dietaryRestrictions: (prevUser.preferences.dietaryRestrictions || [])
          .filter(item => item !== restriction)
      }
    }))
  }

  // Add favorite cuisine
  const addFavoriteCuisine = (cuisine) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        favoriteCuisines: [
          ...(prevUser.preferences.favoriteCuisines || []),
          cuisine
        ].filter((item, index, array) => array.indexOf(item) === index) // Remove duplicates
      }
    }))
  }

  // Remove favorite cuisine
  const removeFavoriteCuisine = (cuisine) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        favoriteCuisines: (prevUser.preferences.favoriteCuisines || [])
          .filter(item => item !== cuisine)
      }
    }))
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    updatePreferences,
    addDietaryRestriction,
    removeDietaryRestriction,
    addFavoriteCuisine,
    removeFavoriteCuisine,
    isAuthenticated: !!user
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export default UserContext
