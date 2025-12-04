import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlus, 
  FaMinus, 
  FaClock, 
  FaUser, 
  FaList, 
  FaUtensils,
  FaImage,
  FaArrowLeft
} from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '4',
    difficulty: 'Medium',
    category: 'Main Course',
    image: '',
  });

  const [ingredients, setIngredients] = useState(['', '']);
  const [instructions, setInstructions] = useState(['']);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Categories for dropdown
  const categories = [
    'Main Course',
    'Appetizer',
    'Salad',
    'Soup',
    'Dessert',
    'Breakfast',
    'Snack',
    'Beverage'
  ];

  // Difficulty levels
  const difficulties = ['Easy', 'Medium', 'Hard'];

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle ingredient changes
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  // Add new ingredient field
  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  // Remove ingredient field
  const removeIngredient = (index) => {
    if (ingredients.length > 2) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  // Handle instruction changes
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  // Add new instruction field
  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  // Remove instruction field
  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      const newInstructions = [...instructions];
      newInstructions.splice(index, 1);
      setInstructions(newInstructions);
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.prepTime) newErrors.prepTime = 'Preparation time is required';
    if (!formData.cookTime) newErrors.cookTime = 'Cooking time is required';
    
    // Ingredients validation
    const validIngredients = ingredients.filter(ing => ing.trim() !== '');
    if (validIngredients.length < 2) {
      newErrors.ingredients = 'Please add at least 2 ingredients';
    }

    // Instructions validation
    const validInstructions = instructions.filter(inst => inst.trim() !== '');
    if (validInstructions.length === 0) {
      newErrors.instructions = 'Please add at least 1 instruction step';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstError = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Prepare recipe data
      const recipeData = {
        ...formData,
        ingredients: ingredients.filter(ing => ing.trim() !== ''),
        instructions: instructions.filter(inst => inst.trim() !== '').map((inst, idx) => ({
          step: idx + 1,
          description: inst
        })),
        rating: 0,
        chef: {
          name: 'You',
          bio: 'Home cook and recipe creator'
        }
      };

      console.log('Recipe submitted:', recipeData);
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      prepTime: '',
      cookTime: '',
      servings: '4',
      difficulty: 'Medium',
      category: 'Main Course',
      image: '',
    });
    setIngredients(['', '']);
    setInstructions(['']);
    setErrors({});
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Recipe Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Your recipe has been successfully added to our collection. 
            Thank you for sharing your culinary creation!
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
              >
                <FaArrowLeft />
                Back
              </button>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Share Your Recipe
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Fill out the form below to add your delicious recipe to our community collection.
                Your culinary creation will inspire home cooks around the world!
              </p>
            </div>
            <div className="hidden lg:block">
              <GiCookingPot className="text-8xl opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 -mt-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex justify-center items-center gap-4">
            {['Recipe Info', 'Ingredients', 'Instructions', 'Review'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {index + 1}
                </div>
                <span className="ml-2 font-medium hidden sm:inline">{step}</span>
                {index < 3 && (
                  <div className="w-16 h-1 bg-gray-200 mx-4 hidden md:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Recipe Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <GiCookingPot className="text-blue-500" />
                  Recipe Information
                </h2>
                
                {/* Recipe Title */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Recipe Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Creamy Garlic Parmesan Pasta"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Recipe Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Describe your recipe. What makes it special? What should people expect?"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Recipe Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaClock className="text-blue-500" />
                      Prep Time (minutes) *
                    </label>
                    <input
                      type="number"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 15"
                      min="1"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.prepTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.prepTime && (
                      <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaClock className="text-orange-500" />
                      Cook Time (minutes) *
                    </label>
                    <input
                      type="number"
                      name="cookTime"
                      value={formData.cookTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 30"
                      min="1"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cookTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cookTime && (
                      <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaUser className="text-green-500" />
                      Servings
                    </label>
                    <select
                      name="servings"
                      value={formData.servings}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'serving' : 'servings'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Difficulty Level
                    </label>
                    <div className="flex gap-2">
                      {difficulties.map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({...formData, difficulty: level})}
                          className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                            formData.difficulty === level
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category and Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaImage className="text-purple-500" />
                      Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/recipe-image.jpg"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Ingredients Card */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaList className="text-green-500" />
                    Ingredients *
                  </h2>
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 flex items-center gap-2"
                  >
                    <FaPlus />
                    Add Ingredient
                  </button>
                </div>

                {errors.ingredients && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600">{errors.ingredients}</p>
                  </div>
                )}

                <div className="space-y-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => handleIngredientChange(index, e.target.value)}
                          placeholder={`Ingredient ${index + 1} (e.g., 2 cups flour, 1 tsp salt)`}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors.ingredients && !ingredient.trim() 
                              ? 'border-red-500' 
                              : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {ingredients.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    💡 Tip: Be specific with measurements and include any preparation notes
                    (e.g., "2 cloves garlic, minced", "1 onion, finely chopped").
                  </p>
                </div>
              </div>

              {/* Instructions Card */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUtensils className="text-orange-500" />
                    Preparation Steps *
                  </h2>
                  <button
                    type="button"
                    onClick={addInstruction}
                    className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-medium hover:bg-orange-200 flex items-center gap-2"
                  >
                    <FaPlus />
                    Add Step
                  </button>
                </div>

                {errors.instructions && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600">{errors.instructions}</p>
                  </div>
                )}

                <div className="space-y-6">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={instruction}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                          rows="2"
                          placeholder={`Step ${index + 1} - Describe what to do in this step...`}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.instructions && !instruction.trim() 
                              ? 'border-red-500' 
                              : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {instructions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInstruction(index)}
                          className="flex-shrink-0 px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 self-start"
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    ✨ Pro Tip: Be clear and concise. Break down complex steps and include 
                    timing, temperature, and visual cues (e.g., "cook until golden brown").
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Preview & Actions */}
            <div className="space-y-8">
              {/* Preview Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Recipe Preview
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Title</div>
                    <div className="font-semibold truncate">
                      {formData.title || "Your recipe title will appear here"}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Prep Time</div>
                      <div className="font-semibold">
                        {formData.prepTime ? `${formData.prepTime} min` : '--'}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Servings</div>
                      <div className="font-semibold">{formData.servings}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Ingredients Count</div>
                    <div className="font-semibold">
                      {ingredients.filter(ing => ing.trim() !== '').length} items
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Steps</div>
                    <div className="font-semibold">
                      {instructions.filter(inst => inst.trim() !== '').length} steps
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">📋 Checklist</h4>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li className={`flex items-center gap-2 ${formData.title ? 'line-through' : ''}`}>
                      {formData.title ? '✓' : '○'} Recipe title
                    </li>
                    <li className={`flex items-center gap-2 ${formData.description ? 'line-through' : ''}`}>
                      {formData.description ? '✓' : '○'} Description
                    </li>
                    <li className={`flex items-center gap-2 ${formData.prepTime && formData.cookTime ? 'line-through' : ''}`}>
                      {formData.prepTime && formData.cookTime ? '✓' : '○'} Timing
                    </li>
                    <li className={`flex items-center gap-2 ${ingredients.filter(ing => ing.trim() !== '').length >= 2 ? 'line-through' : ''}`}>
                      {ingredients.filter(ing => ing.trim() !== '').length >= 2 ? '✓' : '○'} 2+ ingredients
                    </li>
                    <li className={`flex items-center gap-2 ${instructions.filter(inst => inst.trim() !== '').length >= 1 ? 'line-through' : ''}`}>
                      {instructions.filter(inst => inst.trim() !== '').length >= 1 ? '✓' : '○'} 1+ step
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Submit Recipe
                </h3>
                
                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Recipe'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-3 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Reset Form
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="w-full py-3 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    By submitting, you agree that your recipe is original 
                    and you have the right to share it.
                  </p>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span>📷</span>
                    <span>Add a photo to make your recipe stand out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>⏱️</span>
                    <span>Be accurate with timing for best results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📝</span>
                    <span>Include helpful tips and variations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;