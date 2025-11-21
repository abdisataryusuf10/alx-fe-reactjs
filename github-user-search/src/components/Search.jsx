import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !username.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Conditional Rendering */}
      {loading && (
        <div className="message loading">
          Loading...
        </div>
      )}

      {error && (
        <div className="message error">
          {error}
        </div>
      )}

      {userData && (
        <div className="user-card">
          <div className="user-avatar">
            <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          </div>
          <div className="user-info">
            <h2 className="user-name">{userData.name || userData.login}</h2>
            <p className="user-login">@{userData.login}</p>
            {userData.bio && <p className="user-bio">{userData.bio}</p>}
            <div className="user-stats">
              <div className="stat">
                <strong>{userData.public_repos}</strong>
                <span>Repositories</span>
              </div>
              <div className="stat">
                <strong>{userData.followers}</strong>
                <span>Followers</span>
              </div>
              <div className="stat">
                <strong>{userData.following}</strong>
                <span>Following</span>
              </div>
            </div>
            <div className="user-links">
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                View GitHub Profile
              </a>
              {userData.blog && (
                <a 
                  href={userData.blog} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="blog-link"
                >
                  Website
                </a>
              )}
            </div>
            {userData.location && (
              <p className="user-location">📍 {userData.location}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

          import { useState } from 'react';
import { advancedSearchUsers } from '../services/githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: '',
    sort: 'best-match',
    order: 'desc'
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    await performSearch(1);
  };

  const handleLoadMore = async () => {
    await performSearch(page + 1);
  };

  const performSearch = async (pageNumber) => {
    setLoading(true);
    setError(null);

    try {
      const data = await advancedSearchUsers(searchParams, pageNumber);
      
      if (pageNumber === 1) {
        setUsers(data.items);
      } else {
        setUsers(prev => [...prev, ...data.items]);
      }
      
      setPage(pageNumber);
      setHasMore(data.items.length === 30); // GitHub API returns max 30 items per page
    } catch (err) {
      setError(err.message || 'Failed to search users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchParams({
      username: '',
      location: '',
      minRepos: '',
      language: '',
      sort: 'best-match',
      order: 'desc'
    });
    setUsers([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GitHub User Search
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find GitHub users with advanced filtering by location, repositories, programming languages, and more.
          </p>
        </div>

        {/* Advanced Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={searchParams.username}
                  onChange={handleInputChange}
                  placeholder="e.g., octocat"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Minimum Repositories */}
              <div>
                <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                  Min Repositories
                </label>
                <input
                  type="number"
                  id="minRepos"
                  name="minRepos"
                  value={searchParams.minRepos}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Programming Language */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Programming Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={searchParams.language}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Sort By */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={searchParams.sort}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="best-match">Best Match</option>
                  <option value="followers">Followers</option>
                  <option value="repositories">Repositories</option>
                  <option value="joined">Joined Date</option>
                </select>
              </div>

              {/* Order */}
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <select
                  id="order"
                  name="order"
                  value={searchParams.order}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
              <button
                type="button"
                onClick={clearSearch}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  'Search Users'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Loading State */}
          {loading && page === 1 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-6 py-3 bg-blue-100 text-blue-700 rounded-lg">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching GitHub users...
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="text-red-700 font-medium text-lg mb-2">
                Search Failed
              </div>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Results Grid */}
          {users.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results ({users.length} users found)
                </h2>
                {hasMore && (
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>

              {/* Load More Button at Bottom */}
              {hasMore && (
                <div className="text-center pt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {loading ? 'Loading More Users...' : 'Load More Users'}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && !error && users.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No users found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria to find GitHub users.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced User Card Component
const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-16 h-16 rounded-full border-2 border-gray-100 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user.name || user.login}
            </h3>
            <p className="text-gray-500 text-sm">@{user.login}</p>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-3">
          {/* Bio */}
          {user.bio && (
            <p className="text-gray-700 text-sm line-clamp-2">
              {user.bio}
            </p>
          )}

          {/* Location */}
          {user.location && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {user.location}
            </div>
          )}

          {/* Company */}
          {user.company && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {user.company}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.public_repos || 0}</div>
              <div className="text-xs text-gray-500">Repos</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.followers || 0}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{user.following || 0}</div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Profile
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Search;

import { useState, useEffect } from 'react';
import { advancedSearchUsers, fetchUserData } from '../services/githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: '',
    sort: 'best-match',
    order: 'desc'
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Build query display string
  const getQueryDisplay = () => {
    const parts = [];
    if (searchParams.username) parts.push(`user: ${searchParams.username}`);
    if (searchParams.location) parts.push(`location: ${searchParams.location}`);
    if (searchParams.minRepos) parts.push(`repos ≥ ${searchParams.minRepos}`);
    if (searchParams.language) parts.push(`language: ${searchParams.language}`);
    return parts.join(', ');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!searchParams.username && !searchParams.location && !searchParams.minRepos && !searchParams.language) {
      setError('Please enter at least one search criteria');
      return;
    }

    setPage(1);
    await performSearch(1, true);
  };

  const handleLoadMore = async () => {
    await performSearch(page + 1, false);
  };

  const performSearch = async (pageNumber, isNewSearch) => {
    setLoading(true);
    setError(null);

    try {
      const data = await advancedSearchUsers(searchParams, pageNumber);
      
      if (isNewSearch) {
        setUsers(data.items || []);
        setTotalCount(data.total_count || 0);
      } else {
        setUsers(prev => [...prev, ...(data.items || [])]);
      }
      
      setPage(pageNumber);
      // GitHub API returns max 1000 results and 30 items per page
      setHasMore(data.items && data.items.length === 30 && pageNumber * 30 < Math.min(data.total_count, 1000));
      
      if (data.items && data.items.length === 0 && isNewSearch) {
        setError('No users found matching your search criteria. Try adjusting your filters.');
      }
    } catch (err) {
      setError(err.message || 'Failed to search users. Please try again.');
      if (isNewSearch) {
        setUsers([]);
        setTotalCount(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchParams({
      username: '',
      location: '',
      minRepos: '',
      language: '',
      sort: 'best-match',
      order: 'desc'
    });
    setUsers([]);
    setError(null);
    setTotalCount(0);
    setPage(1);
    setHasMore(false);
  };

  // Load more when scrolling (optional enhancement)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore || loading) {
        return;
      }
      handleLoadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GitHub User Search
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced search for GitHub users with filters by location, repositories, programming languages, and more.
          </p>
        </div>

        {/* Advanced Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={searchParams.username}
                  onChange={handleInputChange}
                  placeholder="e.g., octocat"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>

              {/* Minimum Repositories */}
              <div>
                <label htmlFor="minRepos" className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Repositories
                </label>
                <input
                  type="number"
                  id="minRepos"
                  name="minRepos"
                  value={searchParams.minRepos}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>

              {/* Programming Language */}
              <div>
                <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-2">
                  Programming Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={searchParams.language}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>

              {/* Sort By */}
              <div>
                <label htmlFor="sort" className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={searchParams.sort}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                >
                  <option value="best-match">Best Match</option>
                  <option value="followers">Followers</option>
                  <option value="repositories">Repositories</option>
                  <option value="joined">Joined Date</option>
                </select>
              </div>

              {/* Order */}
              <div>
                <label htmlFor="order" className="block text-sm font-semibold text-gray-700 mb-2">
                  Order
                </label>
                <select
                  id="order"
                  name="order"
                  value={searchParams.order}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                {totalCount > 0 && `Found ${totalCount.toLocaleString()} users`}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg flex items-center justify-center min-w-[140px]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    'Search Users'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Query Display */}
          {users.length > 0 && getQueryDisplay() && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="text-sm text-blue-800">
                <strong>Search query:</strong> {getQueryDisplay()}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && page === 1 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-6 py-4 bg-white rounded-xl shadow-lg border border-gray-200">
                <svg className="animate-spin mr-3 h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-700 font-medium">Searching GitHub users...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="text-red-800 font-medium text-lg mb-2">
                Search Failed
              </div>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Results Grid */}
          {users.length > 0 && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Search Results
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Showing {users.length} of {totalCount > 1000 ? '1000+' : totalCount.toLocaleString()} users
                  </p>
                </div>
                {hasMore && (
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm flex items-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      'Load More Users'
                    )}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <EnhancedUserCard key={user.id} user={user} />
                ))}
              </div>

              {/* Load More Button at Bottom */}
              {hasMore && (
                <div className="text-center pt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
                  >
                    {loading ? 'Loading More Users...' : 'Load More Users'}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && !error && users.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Search
                </h3>
                <p className="text-gray-600 mb-6">
                  Enter your search criteria above to find GitHub users.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>💡 <strong>Tips:</strong> Use location filters for local developers</p>
                  <p>💡 Filter by language to find specialists</p>
                  <p>💡 Set minimum repos to find experienced developers</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced User Card Component with more details
const EnhancedUserCard = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300">
      <div className="p-6">
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-16 h-16 rounded-full border-2 border-gray-100 flex-shrink-0 shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {user.name || user.login}
            </h3>
            <p className="text-gray-500 text-sm">@{user.login}</p>
            {user.email && (
              <p className="text-blue-600 text-sm truncate">{user.email}</p>
            )}
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-3">
          {/* Bio */}
          {user.bio && (
            <p className="text-gray-700 text-sm line-clamp-2">
              {user.bio}
            </p>
          )}

          {/* Location and Company */}
          <div className="space-y-2">
            {user.location && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {user.location}
              </div>
            )}

            {user.company && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {user.company}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{user.public_repos || 0}</div>
              <div className="text-xs text-gray-500 font-medium">Repos</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{user.followers || 0}</div>
              <div className="text-xs text-gray-500 font-medium">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{user.following || 0}</div>
              <div className="text-xs text-gray-500 font-medium">Following</div>
            </div>
          </div>

          {/* Additional Details */}
          {showDetails && (
            <div className="pt-3 border-t border-gray-100 space-y-2">
              {user.blog && (
                <div className="flex items-center text-sm text-blue-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <a href={user.blog} target="_blank" rel="noopener noreferrer" className="truncate">
                    {user.blog}
                  </a>
                </div>
              )}
              {user.created_at && (
                <div className="text-xs text-gray-500">
                  Joined {new Date(user.created_at).toLocaleDateString()}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            {showDetails ? 'Less' : 'More'} Details
          </button>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
          >
            View Profile
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Search;
