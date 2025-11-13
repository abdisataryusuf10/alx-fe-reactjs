import useRecipeStore from '../store/recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default RecipeList

import { Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
              </Link>
              <div className="recipe-card-actions">
                <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-edit-small">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'
import { useEffect } from 'react'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes)
  const searchTerm = useRecipeStore((state) => state.searchTerm)
  const selectedDifficulty = useRecipeStore((state) => state.selectedDifficulty)
  const maxPrepTime = useRecipeStore((state) => state.maxPrepTime)
  const filterRecipes = useRecipeStore((state) => state.filterRecipes)

  // Initialize filtered recipes when component mounts
  useEffect(() => {
    filterRecipes()
  }, [filterRecipes])

  // Determine which recipes to display
  const displayRecipes = searchTerm || selectedDifficulty || maxPrepTime 
    ? filteredRecipes 
    : recipes

  const hasActiveFilters = searchTerm || selectedDifficulty || maxPrepTime

  return (
    <div className="recipe-list">
      <div className="recipe-list-header">
        <h2>Recipes</h2>
        {hasActiveFilters && (
          <div className="active-filters-info">
            Showing {displayRecipes.length} of {recipes.length} recipes
            {searchTerm && <span> matching "{searchTerm}"</span>}
          </div>
        )}
      </div>

      {displayRecipes.length === 0 ? (
        <div className="no-recipes">
          <p>
            {hasActiveFilters 
              ? "No recipes match your search criteria. Try adjusting your filters."
              : "No recipes yet. Add your first recipe!"
            }
          </p>
          {hasActiveFilters && (
            <button 
              onClick={() => useRecipeStore.getState().clearFilters()}
              className="btn-clear-filters"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="recipes-grid">
          {displayRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-meta">
                  <span className="difficulty-badge difficulty-{recipe.difficulty?.toLowerCase()}">
                    {recipe.difficulty}
                  </span>
                  <span className="prep-time">
                    ⏱️ {recipe.prepTime} min prep
                  </span>
                </div>
                {recipe.ingredients && (
                  <div className="ingredients-preview">
                    <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
                    {recipe.ingredients.length > 3 && '...'}
                  </div>
                )}
              </Link>
              <div className="recipe-card-actions">
                <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-edit-small">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeList
