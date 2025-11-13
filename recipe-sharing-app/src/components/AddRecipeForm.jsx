import { useState } from 'react'
import useRecipeStore from '../store/recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title.trim() && description.trim()) {
      addRecipe({ title, description })
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>Add New Recipe</h2>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          required
        />
      </div>
      <button type="submit">Add Recipe</button>
    </form>
  )
}

export default AddRecipeForm

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }))
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (formData.title.trim() && formData.description.trim()) {
      const cleanedIngredients = formData.ingredients.filter(ing => ing.trim() !== '')
      const newRecipe = {
        ...formData,
        ingredients: cleanedIngredients
      }
      addRecipe(newRecipe)
      setFormData({
        title: '',
        description: '',
        ingredients: [''],
        instructions: ''
      })
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>Add New Recipe</h2>
      
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          required
        />
      </div>
      
      <div className="form-group">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Recipe Description"
          required
        />
      </div>

      <div className="form-group">
        <label>Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-input-group">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
            />
            <button 
              type="button" 
              onClick={() => removeIngredient(index)}
              className="btn-remove"
              disabled={formData.ingredients.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="btn-add">
          Add Ingredient
        </button>
      </div>

      <div className="form-group">
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Cooking Instructions"
          rows="4"
        />
      </div>
      
      <button type="submit">Add Recipe</button>
    </form>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const filterRecipes = useRecipeStore((state) => state.filterRecipes)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    prepTime: '',
    cookTime: '',
    difficulty: 'Easy'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }))
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (formData.title.trim() && formData.description.trim()) {
      const cleanedIngredients = formData.ingredients.filter(ing => ing.trim() !== '')
      const newRecipe = {
        ...formData,
        ingredients: cleanedIngredients,
        prepTime: parseInt(formData.prepTime) || 0,
        cookTime: parseInt(formData.cookTime) || 0
      }
      addRecipe(newRecipe)
      filterRecipes() // Update filtered recipes
      setFormData({
        title: '',
        description: '',
        ingredients: [''],
        instructions: '',
        prepTime: '',
        cookTime: '',
        difficulty: 'Easy'
      })
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>Add New Recipe</h2>
      
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          required
        />
      </div>
      
      <div className="form-group">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Recipe Description"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prepTime">Preparation Time (minutes)</label>
          <input
            type="number"
            id="prepTime"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            min="0"
            placeholder="e.g., 15"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cookTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            min="0"
            placeholder="e.g., 30"
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-input-group">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
            />
            <button 
              type="button" 
              onClick={() => removeIngredient(index)}
              className="btn-remove"
              disabled={formData.ingredients.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="btn-add">
          Add Ingredient
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Step-by-step cooking instructions..."
          rows="4"
        />
      </div>
      
      <button type="submit">Add Recipe</button>
    </form>
  )
}

export default AddRecipeForm
