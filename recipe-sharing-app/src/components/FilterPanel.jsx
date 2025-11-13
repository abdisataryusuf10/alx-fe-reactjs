import React from 'react'
import { useRecipeStore } from './recipeStore'

const FilterPanel = () => {
  const selectedDifficulty = useRecipeStore(state => state.selectedDifficulty)
  const setSelectedDifficulty = useRecipeStore(state => state.setSelectedDifficulty)
  const maxPrepTime = useRecipeStore(state => state.maxPrepTime)
  const setMaxPrepTime = useRecipeStore(state => state.setMaxPrepTime)
  const filterRecipes = useRecipeStore(state => state.filterRecipes)
  const clearFilters = useRecipeStore(state => state.clearFilters)

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value)
    setTimeout(() => {
      filterRecipes()
    }, 100)
  }

  const handlePrepTimeChange = (e) => {
    setMaxPrepTime(e.target.value)
    setTimeout(() => {
      filterRecipes()
    }, 100)
  }

  const handleClearFilters = () => {
    clearFilters()
  }

  return (
    <div className="filter-panel">
      <h3>Filter Recipes</h3>
      
      <div className="filter-group">
        <label htmlFor="difficulty">Difficulty:</label>
        <select 
          id="difficulty"
          value={selectedDifficulty} 
          onChange={handleDifficultyChange}
          className="filter-select"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="prepTime">Max Preparation Time (minutes):</label>
        <select 
          id="prepTime"
          value={maxPrepTime} 
          onChange={handlePrepTimeChange}
          className="filter-select"
        >
          <option value="">Any Time</option>
          <option value="10">10 minutes or less</option>
          <option value="15">15 minutes or less</option>
          <option value="30">30 minutes or less</option>
          <option value="60">60 minutes or less</option>
        </select>
      </div>

      <button 
        onClick={handleClearFilters}
        className="btn-clear-filters"
      >
        Clear All Filters
      </button>
    </div>
  )
}

export default FilterPanel
