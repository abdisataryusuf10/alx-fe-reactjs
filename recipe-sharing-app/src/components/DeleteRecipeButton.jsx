import { useNavigate } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const navigate = useNavigate()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId)
      if (onDelete) {
        onDelete()
      } else {
        navigate('/')
      }
    }
  }

  return (
    <button onClick={handleDelete} className="btn btn-delete">
      Delete Recipe
    </button>
  )
}

export default DeleteRecipeButton
