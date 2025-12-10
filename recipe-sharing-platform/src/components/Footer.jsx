import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">RecipeShare</h3>
            <p className="text-gray-400">
              A community of food lovers sharing their favorite recipes from around the world.
            </p>
            <div className="flex gap-4 mt-6">
              <FaFacebook className="text-xl hover:text-blue-400 cursor-pointer" />
              <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="text-xl hover:text-pink-400 cursor-pointer" />
              <FaYoutube className="text-xl hover:text-red-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Browse Recipes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Featured Chefs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cooking Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Seasonal Recipes</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Vegetarian</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Quick Meals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Family Favorites</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Holiday Specials</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for new recipes weekly!</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 RecipeShare. All rights reserved. Made with ❤️ by food lovers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;