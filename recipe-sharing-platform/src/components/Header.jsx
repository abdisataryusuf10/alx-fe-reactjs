import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaUtensils } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FaUtensils className="text-3xl text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">RecipeShare</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for recipes, ingredients, or chefs..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/recipes" className="text-gray-700 hover:text-blue-600 font-medium">
              Recipes
            </Link>
            <Link to="/add-recipe" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors font-medium">
              Add Recipe
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaUser className="text-xl text-gray-600" />
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center gap-6 mt-4 md:hidden">
          <button className="text-sm text-gray-600 hover:text-blue-600">🍕 Italian</button>
          <button className="text-sm text-gray-600 hover:text-blue-600">🥗 Healthy</button>
          <button className="text-sm text-gray-600 hover:text-blue-600">🍰 Dessert</button>
          <button className="text-sm text-gray-600 hover:text-blue-600">🌶️ Spicy</button>
        </div>
      </div>
    </header>
  );
};


// In the navigation section, update the Add Recipe link
<Link 
  to="/add-recipe" 
  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors font-medium"
>
  Add Recipe
</Link>

export default Header;