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
      difficulty: "Easy",
      category: "Breakfast",
      tags: ["breakfast", "sweet", "quick"]
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry",
      ingredients: ["2 cups mixed vegetables", "2 tbsp soy sauce", "1 tbsp olive oil", "2 cloves garlic", "1 tsp ginger"],
      instructions: "Heat oil, sauté garlic and ginger. Add vegetables and stir fry until tender. Add soy sauce.",
      prepTime: 15,
      cookTime: 10,
      difficulty: "Easy",
      category: "Dinner",
      tags: ["healthy", "vegetarian", "quick", "asian"]
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      description: "Classic homemade chocolate chip cookies",
      ingredients: ["2 1/4 cups flour", "1 tsp baking soda", "1 tsp salt", "1 cup butter", "3/4 cup sugar", "2 eggs", "2 cups chocolate chips"],
      instructions: "Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients. Fold in chocolate chips. Bake at 375°F for 9-11 minutes.",
      prepTime: 20,
      cookTime: 10,
      difficulty: "Medium",
      category: "Dessert",
      tags: ["dessert", "sweet", "baking", "cookies"]
    },
    {
      id: 4,
      title: "Greek Salad",
      description: "Fresh and healthy Greek salad with feta cheese",
      ingredients: ["2 cucumbers", "4 tomatoes", "1 red onion", "200g feta cheese", "kalamata olives", "olive oil", "lemon juice", "oregano"],
      instructions: "Chop vegetables, combine with olives and feta. Dress with olive oil, lemon juice, and oregano.",
      prepTime: 15,
      cookTime: 0,
      difficulty: "Easy",
      category: "Lunch",
      tags: ["healthy", "vegetarian", "salad", "mediterranean"]
    },
    {
      id: 5,
      title: "Spaghetti Carbonara",
      description: "Creamy Italian pasta dish with eggs and cheese",
      ingredients: ["400g spaghetti", "200g pancetta", "4 eggs", "100g parmesan", "black pepper", "salt"],
      instructions: "Cook pasta. Fry pancetta. Mix eggs and cheese. Combine everything while hot. Add pepper.",
      prepTime: 10,
      cookTime: 15,
      difficulty: "Medium",
      category: "Dinner",
      tags: ["pasta", "italian", "creamy", "dinner"]
    }
  ],
  
  // Search and filter states
  searchTerm: '',
  selectedDifficulty: '',
  maxPrepTime: '',
  filteredRecipes: [],
  
  // Favorites and recommendations
  favorites: [],
  recommendations: [],
  
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
  }),
  
  // Favorites actions
  addFavorite: (recipeId) => set((state) => { 
    // Check if recipe is already in favorites
    if (!state.favorites.includes(recipeId)) {
      const newFavorites = [...state.favorites, recipeId];
      // Generate recommendations when favorites change
      setTimeout(() => {
        get().generateRecommendations();
      }, 0);
      return { favorites: newFavorites };
    }
    return state;
  }),
  
  removeFavorite: (recipeId) => set((state) => {
    const newFavorites = state.favorites.filter(id => id !== recipeId);
    // Generate recommendations when favorites change
    setTimeout(() => {
      get().generateRecommendations();
    }, 0);
    return { favorites: newFavorites };
  }),
  
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },
  
  // Recommendations actions
  generateRecommendations: () => set((state) => {
    const { favorites, recipes } = state;
    
    if (favorites.length === 0) {
      // If no favorites, show random recipes
      const shuffled = [...recipes].sort(() => 0.5 - Math.random());
      return { recommendations: shuffled.slice(0, 3) };
    }
    
    // Get favorite recipes
    const favoriteRecipes = favorites.map(id => 
      recipes.find(recipe => recipe.id === id)
    ).filter(Boolean);
    
    // Extract categories and tags from favorites
    const favoriteCategories = [...new Set(favoriteRecipes.map(recipe => recipe.category))];
    const favoriteTags = [...new Set(favoriteRecipes.flatMap(recipe => recipe.tags || []))];
    const favoriteDifficulties = [...new Set(favoriteRecipes.map(recipe => recipe.difficulty))];
    
    // Score recipes based on similarity to favorites
    const scoredRecipes = recipes
      .filter(recipe => !favorites.includes(recipe.id)) // Exclude favorites
      .map(recipe => {
        let score = 0;
        
        // Score based on category match
        if (favoriteCategories.includes(recipe.category)) {
          score += 3;
        }
        
        // Score based on tag matches
        const matchingTags = (recipe.tags || []).filter(tag => 
          favoriteTags.includes(tag)
        ).length;
        score += matchingTags;
        
        // Score based on difficulty match
        if (favoriteDifficulties.includes(recipe.difficulty)) {
          score += 2;
        }
        
        // Bonus for similar prep time (within 10 minutes)
        const avgFavoritePrepTime = favoriteRecipes.reduce((sum, fav) => sum + fav.prepTime, 0) / favoriteRecipes.length;
        if (Math.abs(recipe.prepTime - avgFavoritePrepTime) <= 10) {
          score += 1;
        }
        
        return { ...recipe, score };
      })
      .filter(recipe => recipe.score > 0) // Only include recipes with some similarity
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 4); // Take top 4 recommendations
    
    // If we don't have enough recommendations, add some random ones
    if (scoredRecipes.length < 4) {
      const remainingSlots = 4 - scoredRecipes.length;
      const nonFavoriteRecipes = recipes.filter(recipe => !favorites.includes(recipe.id));
      const randomRecipes = [...nonFavoriteRecipes]
        .sort(() => 0.5 - Math.random())
        .slice(0, remainingSlots);
      return { recommendations: [...scoredRecipes, ...randomRecipes] };
    }
    
    return { recommendations: scoredRecipes };
  })
}))

export default useRecipeStore
