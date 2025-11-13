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

export default RecipeList
