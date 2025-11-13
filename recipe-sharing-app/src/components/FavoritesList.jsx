import React from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites)
  const recipes = useRecipeStore(state => state.recipes)
  const removeFavorite = useRecipeStore(state => state.removeFavorite)
  
  // Get favorite recipe objects
  const favoriteRecipes = favorites.map(id => 
    recipes.find(recipe => recipe.id === id)
  ).filter(Boolean)

  const handleRemoveFavorite = (recipeId, event) => {
    event.preventDefault()
    event.stopPropagation()
    removeFavorite(recipeId)
  }

  if (favoriteRecipes.length === 0) {
    return (
      <div className="favorites-list">
        <h2>⭐ My Favorites</h2>
        <div className="no-favorites">
          <p>You haven't added any favorites yet.</p>
          <p>Click the heart icon on any recipe to add it to your favorites!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-list">
      <h2>⭐ My Favorites ({favoriteRecipes.length})</h2>
      <div className="favorites-grid">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card favorite-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <div className="favorite-header">
                <h3>{recipe.title}</h3>
                <button 
                  onClick={(e) => handleRemoveFavorite(recipe.id, e)}
                  className="btn-favorite btn-favorite-remove"
                  title="Remove from favorites"
                >
                  ❤️
                </button>
              </div>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-meta">
                <span className={`difficulty-badge difficulty-${recipe.difficulty?.toLowerCase()}`}>
                  {recipe.difficulty}
                </span>
                <span className="prep-time">
                  ⏱️ {recipe.prepTime} min prep
                </span>
              </div>
              <div className="category-tag">
                {recipe.category}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesList
