import React, { useState } from 'react'
import { useUser } from '../context/UserContext'

const UserProfile = () => {
  const { user, updateUser, updatePreferences, logout, isAuthenticated } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    preferences: {
      cookingSkill: user?.preferences?.cookingSkill || 'beginner',
      dietaryRestrictions: user?.preferences?.dietaryRestrictions || [],
      favoriteCuisines: user?.preferences?.favoriteCuisines || []
    }
  })

  const [newDietaryRestriction, setNewDietaryRestriction] = useState('')
  const [newFavoriteCuisine, setNewFavoriteCuisine] = useState('')

  if (!isAuthenticated) {
    return (
      <div className="user-profile">
        <div className="not-logged-in">
          <h2>User Profile</h2>
          <p>Please log in to view and edit your profile.</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('preferences.')) {
      const prefField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser({
      name: formData.name,
      email: formData.email,
      bio: formData.bio
    })
    updatePreferences(formData.preferences)
    setIsEditing(false)
  }

  const handleAddDietaryRestriction = () => {
    if (newDietaryRestriction.trim() && !formData.preferences.dietaryRestrictions.includes(newDietaryRestriction.trim())) {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          dietaryRestrictions: [...prev.preferences.dietaryRestrictions, newDietaryRestriction.trim()]
        }
      }))
      setNewDietaryRestriction('')
    }
  }

  const handleRemoveDietaryRestriction = (restriction) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        dietaryRestrictions: prev.preferences.dietaryRestrictions.filter(r => r !== restriction)
      }
    }))
  }

  const handleAddFavoriteCuisine = () => {
    if (newFavoriteCuisine.trim() && !formData.preferences.favoriteCuisines.includes(newFavoriteCuisine.trim())) {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          favoriteCuisines: [...prev.preferences.favoriteCuisines, newFavoriteCuisine.trim()]
        }
      }))
      setNewFavoriteCuisine('')
    }
  }

  const handleRemoveFavoriteCuisine = (cuisine) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        favoriteCuisines: prev.preferences.favoriteCuisines.filter(c => c !== cuisine)
      }
    }))
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      preferences: {
        cookingSkill: user?.preferences?.cookingSkill || 'beginner',
        dietaryRestrictions: user?.preferences?.dietaryRestrictions || [],
        favoriteCuisines: user?.preferences?.favoriteCuisines || []
      }
    })
    setIsEditing(false)
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>User Profile</h2>
        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">
              Edit Profile
            </button>
          ) : (
            <button onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
          <button onClick={logout} className="btn btn-logout">
            Logout
          </button>
        </div>
      </div>

      {!isEditing ? (
        <div className="profile-view">
          <div className="profile-info">
            <div className="info-group">
              <label>Name:</label>
              <p>{user.name || 'Not set'}</p>
            </div>
            <div className="info-group">
              <label>Email:</label>
              <p>{user.email || 'Not set'}</p>
            </div>
            <div className="info-group">
              <label>Bio:</label>
              <p>{user.bio || 'No bio provided'}</p>
            </div>
            <div className="info-group">
              <label>Cooking Skill:</label>
              <p className="skill-badge">{user.preferences?.cookingSkill || 'beginner'}</p>
            </div>
          </div>

          <div className="preferences-section">
            <h3>Dietary Restrictions</h3>
            {user.preferences?.dietaryRestrictions?.length > 0 ? (
              <div className="tags-list">
                {user.preferences.dietaryRestrictions.map(restriction => (
                  <span key={restriction} className="tag">
                    {restriction}
                  </span>
                ))}
              </div>
            ) : (
              <p>No dietary restrictions set</p>
            )}

            <h3>Favorite Cuisines</h3>
            {user.preferences?.favoriteCuisines?.length > 0 ? (
              <div className="tags-list">
                {user.preferences.favoriteCuisines.map(cuisine => (
                  <span key={cuisine} className="tag tag-cuisine">
                    {cuisine}
                  </span>
                ))}
              </div>
            ) : (
              <p>No favorite cuisines set</p>
            )}
          </div>

          <div className="account-info">
            <h3>Account Information</h3>
            <p>Member since: {new Date(user.joinedDate).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself and your cooking experience..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cookingSkill">Cooking Skill Level</label>
            <select
              id="cookingSkill"
              name="preferences.cookingSkill"
              value={formData.preferences.cookingSkill}
              onChange={handleInputChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="form-group">
            <label>Dietary Restrictions</label>
            <div className="tags-input-group">
              <div className="tags-list">
                {formData.preferences.dietaryRestrictions.map(restriction => (
                  <span key={restriction} className="tag">
                    {restriction}
                    <button
                      type="button"
                      onClick={() => handleRemoveDietaryRestriction(restriction)}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="tag-input">
                <input
                  type="text"
                  value={newDietaryRestriction}
                  onChange={(e) => setNewDietaryRestriction(e.target.value)}
                  placeholder="Add dietary restriction"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddDietaryRestriction()
                    }
                  }}
                />
                <button type="button" onClick={handleAddDietaryRestriction} className="btn-add-tag">
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Favorite Cuisines</label>
            <div className="tags-input-group">
              <div className="tags-list">
                {formData.preferences.favoriteCuisines.map(cuisine => (
                  <span key={cuisine} className="tag tag-cuisine">
                    {cuisine}
                    <button
                      type="button"
                      onClick={() => handleRemoveFavoriteCuisine(cuisine)}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="tag-input">
                <input
                  type="text"
                  value={newFavoriteCuisine}
                  onChange={(e) => setNewFavoriteCuisine(e.target.value)}
                  placeholder="Add favorite cuisine"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddFavoriteCuisine()
                    }
                  }}
                />
                <button type="button" onClick={handleAddFavoriteCuisine} className="btn-add-tag">
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default UserProfile
