import React from 'react'
import { useRecipeStore } from './recipeStore'

const FavoriteButton = ({ recipeId, size = 'medium' }) => {
  const addFavorite = useRecipeStore(state => state.addFavorite)
  const removeFavorite = useRecipeStore(state => state.removeFavorite)
  const isFavorite = useRecipeStore(state => state.isFavorite)

  const handleToggleFavorite = (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }

  const buttonClass = `btn-favorite ${isFavorite(recipeId) ? 'btn-favorite-active' : 'btn-favorite-inactive'} ${size}`

  return (
    <button 
      onClick={handleToggleFavorite}
      className={buttonClass}
      title={isFavorite(recipeId) ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite(recipeId) ? '❤️' : '🤍'}
    </button>
  )
}

export default FavoriteButton
