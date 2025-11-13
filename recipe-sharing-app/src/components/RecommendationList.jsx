import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations)
  const favorites = useRecipeStore(state => state.favorites)
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations)
  const addFavorite = useRecipeStore(state => state.addFavorite)
  const removeFavorite = useRecipeStore(state => state.removeFavorite)
  const isFavorite = useRecipeStore(state => state.isFavorite)

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations()
  }, [favorites, generateRecommendations])

  const handleToggleFavorite = (recipeId, event) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <h2>💡 Recommendations</h2>
        <div className="no-recommendations">
          <p>Add some recipes to your favorites to get personalized recommendations!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="recommendations-list">
      <h2>💡 Personalized Recommendations</h2>
      <p className="recommendations-subtitle">
        Based on your favorite recipes
      </p>
      <div className="recommendations-grid">
        {recommendations.map((recipe) => (
          <div key={recipe.id} className="recipe-card recommendation-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <div className="recommendation-header">
                <h3>{recipe.title}</h3>
                <button 
                  onClick={(e) => handleToggleFavorite(recipe.id, e)}
                  className={`btn-favorite ${isFavorite(recipe.id) ? 'btn-favorite-active' : 'btn-favorite-inactive'}`}
                  title={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite(recipe.id) ? '❤️' : '🤍'}
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
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="tags-preview">
                  {recipe.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationsList
