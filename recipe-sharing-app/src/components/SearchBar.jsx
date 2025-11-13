import React from 'react'
import { useRecipeStore } from './recipeStore'

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm)
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm)
  const filterRecipes = useRecipeStore(state => state.filterRecipes)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    // Trigger filtering after a short delay to improve performance
    setTimeout(() => {
      filterRecipes()
    }, 300)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes by title, description, or ingredients..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
