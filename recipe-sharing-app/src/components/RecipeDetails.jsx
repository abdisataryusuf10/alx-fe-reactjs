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
