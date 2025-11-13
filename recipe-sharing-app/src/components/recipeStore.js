import { create } from 'zustand'

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
  })),
  setRecipes: (recipes) => set({ recipes })
}))

export default useRecipeStore

import { create } from 'zustand'

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Classic Pancakes",
      description: "Fluffy homemade pancakes perfect for breakfast",
      ingredients: ["1 cup flour", "2 tbsp sugar", "1 tbsp baking powder", "1 cup milk", "1 egg", "2 tbsp melted butter"],
      instructions: "Mix dry ingredients. Add wet ingredients. Cook on griddle until bubbles form, then flip."
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry",
      ingredients: ["2 cups mixed vegetables", "2 tbsp soy sauce", "1 tbsp olive oil", "2 cloves garlic", "1 tsp ginger"],
      instructions: "Heat oil, sauté garlic and ginger. Add vegetables and stir fry until tender. Add soy sauce."
    }
  ],
  
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
  })),
  
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  
  setRecipes: (recipes) => set({ recipes }),
  
  getRecipeById: (id) => {
    return useRecipeStore.getState().recipes.find(recipe => recipe.id === parseInt(id))
  }
}))

import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Classic Pancakes",
      description: "Fluffy homemade pancakes perfect for breakfast",
      ingredients: ["1 cup flour", "2 tbsp sugar", "1 tbsp baking powder", "1 cup milk", "1 egg", "2 tbsp melted butter"],
      instructions: "Mix dry ingredients. Add wet ingredients. Cook on griddle until bubbles form, then flip.",
      prepTime: 10,
      cookTime: 15,
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry",
      ingredients: ["2 cups mixed vegetables", "2 tbsp soy sauce", "1 tbsp olive oil", "2 cloves garlic", "1 tsp ginger"],
      instructions: "Heat oil, sauté garlic and ginger. Add vegetables and stir fry until tender. Add soy sauce.",
      prepTime: 15,
      cookTime: 10,
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      description: "Classic homemade chocolate chip cookies",
      ingredients: ["2 1/4 cups flour", "1 tsp baking soda", "1 tsp salt", "1 cup butter", "3/4 cup sugar", "2 eggs", "2 cups chocolate chips"],
      instructions: "Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients. Fold in chocolate chips. Bake at 375°F for 9-11 minutes.",
      prepTime: 20,
      cookTime: 10,
      difficulty: "Medium"
    }
  ],
  
  // Search and filter states
  searchTerm: '',
  selectedDifficulty: '',
  maxPrepTime: '',
  filteredRecipes: [],
  
  // Recipe actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
  })),
  
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  
  setRecipes: (recipes) => set({ recipes }),
  
  // Search and filter actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  
  setMaxPrepTime: (time) => set({ maxPrepTime: time }),
  
  // Filter recipes based on all criteria
  filterRecipes: () => set((state) => {
    const { searchTerm, selectedDifficulty, maxPrepTime, recipes } = state;
    
    let filtered = recipes;
    
    // Filter by search term (title, description, or ingredients)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchLower)
        )
      );
    }
    
    // Filter by difficulty
    if (selectedDifficulty) {
      filtered = filtered.filter(recipe => 
        recipe.difficulty === selectedDifficulty
      );
    }
    
    // Filter by preparation time
    if (maxPrepTime) {
      filtered = filtered.filter(recipe => 
        recipe.prepTime <= parseInt(maxPrepTime)
      );
    }
    
    return { filteredRecipes: filtered };
  }),
  
  // Clear all filters
  clearFilters: () => set({
    searchTerm: '',
    selectedDifficulty: '',
    maxPrepTime: '',
    filteredRecipes: get().recipes
  })
}))

export default useRecipeStore

export default useRecipeStore
