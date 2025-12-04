import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaClock, 
  FaFire, 
  FaStar, 
  FaUser, 
  FaUtensils, 
  FaList, 
  FaArrowLeft,
  FaBookmark,
  FaShareAlt,
  FaPrint,
  FaRegClock
} from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('/data.json');
        const recipes = await response.json();
        const foundRecipe = recipes.find(r => r.id === parseInt(id));
        
        if (foundRecipe) {
          // Add more detailed data for the recipe
          const detailedRecipe = {
            ...foundRecipe,
            description: `A delicious ${foundRecipe.title.toLowerCase()} that will impress your family and friends. This recipe has been perfected over years and is guaranteed to satisfy.`,
            ingredients: [
              { name: 'Main Ingredients', items: [
                '500g pasta or protein',
                '2 tablespoons olive oil',
                '3 cloves garlic, minced',
                '1 onion, finely chopped',
                '2 cups diced tomatoes'
              ]},
              { name: 'Seasonings', items: [
                'Salt and pepper to taste',
                '1 teaspoon dried oregano',
                '1/2 teaspoon red pepper flakes',
                'Fresh herbs for garnish'
              ]},
              { name: 'For the sauce', items: [
                '1 cup heavy cream',
                '1/2 cup grated cheese',
                '2 tablespoons butter',
                '1/4 cup white wine (optional)'
              ]}
            ],
            instructions: [
              {
                step: 1,
                title: 'Prepare Ingredients',
                description: 'Chop all vegetables and measure out your ingredients. Having everything ready makes the cooking process smoother.'
              },
              {
                step: 2,
                title: 'Cook the Base',
                description: 'Heat oil in a large pan over medium heat. Add onions and garlic, sauté until fragrant and translucent.'
              },
              {
                step: 3,
                title: 'Add Main Components',
                description: 'Add the main protein or vegetables and cook until browned. Season with salt and pepper.'
              },
              {
                step: 4,
                title: 'Create the Sauce',
                description: 'Pour in tomatoes and any liquid ingredients. Simmer for 15-20 minutes until sauce thickens.'
              },
              {
                step: 5,
                title: 'Final Touches',
                description: 'Stir in cream, cheese, and herbs. Adjust seasoning to taste and serve immediately.'
              }
            ],
            nutrition: {
              calories: 450,
              protein: '25g',
              carbs: '45g',
              fat: '18g',
              fiber: '6g'
            },
            tips: [
              'For a spicier version, add extra chili flakes',
              'Can be made vegetarian by substituting protein with mushrooms',
              'Leftovers taste even better the next day',
              'Freezes well for up to 3 months'
            ],
            chef: {
              name: 'Chef Maria Rodriguez',
              bio: 'Professional chef with 15 years of experience specializing in Mediterranean cuisine',
              recipes: 42,
              rating: 4.9
            },
            prepTime: foundRecipe.prepTime || '20 min',
            cookTime: foundRecipe.cookTime || '30 min',
            servings: 4,
            difficulty: foundRecipe.difficulty || 'Medium'
          };
          setRecipe(detailedRecipe);
        } else {
          navigate('/');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading recipe:', error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h2>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft />
          Back to Recipes
        </button>
      </div>

      {/* Recipe Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Recipe Image */}
          <div className="relative h-96 md:h-[500px]">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="flex items-center gap-2 font-semibold">
                <FaStar className="text-yellow-500" />
                {recipe.rating} ★
              </span>
            </div>
            <div className="absolute bottom-6 right-6 flex gap-3">
              <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100">
                <FaBookmark className="text-gray-600" />
              </button>
              <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100">
                <FaShareAlt className="text-gray-600" />
              </button>
              <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100">
                <FaPrint className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Recipe Title and Info */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  {recipe.title}
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  {recipe.description}
                </p>
                
                {/* Recipe Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <FaClock className="text-3xl text-blue-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Prep Time</div>
                    <div className="text-xl font-bold text-gray-800">{recipe.prepTime}</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <FaFire className="text-3xl text-orange-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Cook Time</div>
                    <div className="text-xl font-bold text-gray-800">{recipe.cookTime}</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <FaUser className="text-3xl text-green-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Servings</div>
                    <div className="text-xl font-bold text-gray-800">{recipe.servings}</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <GiCookingPot className="text-3xl text-purple-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Difficulty</div>
                    <div className="text-xl font-bold text-gray-800">{recipe.difficulty}</div>
                  </div>
                </div>
              </div>

              {/* Chef Card */}
              <div className="lg:w-80 bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{recipe.chef.name}</h3>
                    <p className="text-gray-600 text-sm">Professional Chef</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {recipe.chef.bio}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{recipe.chef.recipes} recipes</span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    {recipe.chef.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredients & Instructions */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                className={`px-6 py-3 font-medium text-lg ${
                  activeTab === 'ingredients'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('ingredients')}
              >
                <FaList className="inline mr-2" />
                Ingredients
              </button>
              <button
                className={`px-6 py-3 font-medium text-lg ${
                  activeTab === 'instructions'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('instructions')}
              >
                <FaUtensils className="inline mr-2" />
                Instructions
              </button>
            </div>

            {/* Ingredients Tab */}
            {activeTab === 'ingredients' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Ingredients for {recipe.servings} servings
                </h2>
                {recipe.ingredients.map((section, index) => (
                  <div key={index} className="mb-8 last:mb-0">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      {section.name}
                    </h3>
                    <ul className="space-y-3">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h4 className="font-bold text-blue-800 mb-2">Shopping List</h4>
                  <p className="text-blue-700">
                    Click the print button above to print this shopping list.
                  </p>
                </div>
              </div>
            )}

            {/* Instructions Tab */}
            {activeTab === 'instructions' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Cooking Instructions
                </h2>
                <div className="space-y-8">
                  {recipe.instructions.map((instruction) => (
                    <div key={instruction.step} className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                          {instruction.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {instruction.title}
                        </h3>
                        <p className="text-gray-600">
                          {instruction.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-green-50 rounded-xl">
                  <h4 className="font-bold text-green-800 mb-2">Pro Tip</h4>
                  <p className="text-green-700">
                    Let the dish rest for 5 minutes before serving to allow flavors to meld together.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Nutrition & Tips */}
          <div className="space-y-8">
            {/* Nutrition Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Nutrition Facts
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Calories</span>
                  <span className="font-bold text-gray-800">{recipe.nutrition.calories}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-bold text-gray-800">{recipe.nutrition.protein}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Carbohydrates</span>
                  <span className="font-bold text-gray-800">{recipe.nutrition.carbs}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Fat</span>
                  <span className="font-bold text-gray-800">{recipe.nutrition.fat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fiber</span>
                  <span className="font-bold text-gray-800">{recipe.nutrition.fiber}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                *Per serving. Values are approximate.
              </p>
            </div>

            {/* Tips Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Chef's Tips
              </h2>
              <ul className="space-y-4">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timing Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaRegClock className="text-blue-500" />
                Total Time
              </h2>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {(() => {
                    const prep = parseInt(recipe.prepTime);
                    const cook = parseInt(recipe.cookTime);
                    return prep + cook;
                  })()} min
                </div>
                <p className="text-gray-600">Total preparation and cooking time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Recipes Section */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((related) => (
            <div key={related} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt="Related"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  Similar {recipe.title.split(' ')[0]} Recipe
                </h3>
                <p className="text-gray-600 mb-4">
                  Another delicious take on this classic dish
                </p>
                <Link 
                  to={`/recipe/${parseInt(id) + related}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print & Share Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Love this recipe?</h3>
              <p>Save, print, or share it with friends!</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center gap-2">
                <FaBookmark />
                Save Recipe
              </button>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center gap-2">
                <FaShareAlt />
                Share
              </button>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center gap-2">
                <FaPrint />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;