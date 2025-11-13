import { useParams, Link, useNavigate } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === parseInt(id))
  )
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h2>Recipe not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipe.id)
      navigate('/')
    }
  }

  return (
    <div className="recipe-details">
      <Link to="/" className="back-link">← Back to Recipes</Link>
      
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-actions">
          <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-edit">
            Edit Recipe
          </Link>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete Recipe
          </button>
        </div>
      </div>

      <div className="recipe-content">
        <section className="recipe-section">
          <h3>Description</h3>
          <p>{recipe.description}</p>
        </section>

        <section className="recipe-section">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className="recipe-section">
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </section>
      </div>
    </div>
  )
}

export default RecipeDetails

import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'
import FavoriteButton from './FavoriteButton'

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === parseInt(id))
  )
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)

  if (!recipe) {
    return (
      <div className="recipe-detail">
        <h2>Recipe not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipe.id)
      navigate('/')
    }
  }

  return (
    <div className="recipe-detail">
      <Link to="/" className="back-link">← Back to Recipes</Link>
      
      <div className="recipe-header">
        <div className="recipe-title-section">
          <h1>{recipe.title}</h1>
          <FavoriteButton recipeId={recipe.id} size="large" />
        </div>
        <div className="recipe-actions">
          <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-edit">
            Edit Recipe
          </Link>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete Recipe
          </button>
        </div>
      </div>

      <div className="recipe-content">
        <div className="recipe-meta-large">
          <span className={`difficulty-badge difficulty-${recipe.difficulty?.toLowerCase()}`}>
            {recipe.difficulty}
          </span>
          <span className="prep-time-large">
            ⏱️ Preparation: {recipe.prepTime} minutes
          </span>
          <span className="cook-time">
            🔥 Cooking: {recipe.cookTime} minutes
          </span>
          {recipe.category && (
            <span className="category-badge">
              {recipe.category}
            </span>
          )}
        </div>

        <section className="recipe-section">
          <h3>Description</h3>
          <p>{recipe.description}</p>
        </section>

        <section className="recipe-section">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className="recipe-section">
          <h3>Instructions</h3>
          <div className="instructions-text">
            {recipe.instructions}
          </div>
        </section>

        {recipe.tags && recipe.tags.length > 0 && (
          <section className="recipe-section">
            <h3>Tags</h3>
            <div className="tags-container">
              {recipe.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default RecipeDetail
