import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaFire, FaStar } from 'react-icons/fa';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load recipes from data.json
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading recipes:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Discover Amazing Recipes
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our collection of delicious recipes shared by food lovers around the world. 
            Find your next favorite dish!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              🍕 Italian
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              🥗 Healthy
            </span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              🍰 Dessert
            </span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              🌶️ Spicy
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              ⏱️ Quick
            </span>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Featured Recipes
          </h2>
          <div className="text-gray-600">
            Showing {recipes.length} recipes
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div 
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              {/* Recipe Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="flex items-center gap-1 text-sm font-semibold">
                    <FaStar className="text-yellow-500" />
                    {recipe.rating}
                  </span>
                </div>
              </div>

              {/* Recipe Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {recipe.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {recipe.summary}
                </p>

                {/* Recipe Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaClock className="text-blue-500" />
                    <span className="text-sm">{recipe.prepTime} prep</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaFire className="text-orange-500" />
                    <span className="text-sm">{recipe.cookTime} cook</span>
                  </div>
                  <div className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100">
                    {recipe.difficulty}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link 
                    to={`/recipe/${recipe.id}`}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-300"
                  >
                    View Recipe
                  </Link>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="container mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Breakfast', count: '24 recipes', color: 'bg-orange-50', icon: '🥞' },
            { name: 'Lunch', count: '42 recipes', color: 'bg-green-50', icon: '🥗' },
            { name: 'Dinner', count: '38 recipes', color: 'bg-blue-50', icon: '🍝' },
            { name: 'Dessert', count: '19 recipes', color: 'bg-pink-50', icon: '🍰' },
          ].map((category, index) => (
            <div key={index} className={`${category.color} rounded-xl p-6 hover:shadow-lg transition-shadow duration-300`}>
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Share Your Own Recipe
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of food lovers and share your culinary creations with the world!
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
            Add Recipe Now
          </button>
        </div>
      </div>
    </div>
  );
};

    // In the Action Buttons section, update the Link component
<Link 
  to={`/recipe/${recipe.id}`}
  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-300"
>
  View Recipe
</Link>
export default HomePage;