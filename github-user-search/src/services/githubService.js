import axios from 'axios';

// Create axios instance with base configuration
const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

/**
 * Fetches user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise} User data object
 */
export const fetchUserData = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    } else if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    } else {
      throw new Error('Failed to fetch user data. Please try again.');
    }
  }
};

// Optional: Export the API instance for other potential uses
export default githubAPI;

import axios from 'axios';

// Create axios instance with base configuration
const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Add rate limiting awareness
githubAPI.interceptors.response.use(
  (response) => {
    const remaining = response.headers['x-ratelimit-remaining'];
    const reset = response.headers['x-ratelimit-reset'];
    
    if (remaining && parseInt(remaining) < 10) {
      console.warn(`GitHub API rate limit low: ${remaining} requests remaining`);
    }
    
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      const resetTime = error.response.headers['x-ratelimit-reset'];
      if (resetTime) {
        const resetDate = new Date(parseInt(resetTime) * 1000);
        error.message = `API rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}`;
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Fetches user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise} User data object
 */
export const fetchUserData = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    } else if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    } else {
      throw new Error('Failed to fetch user data. Please try again.');
    }
  }
};

/**
 * Advanced search for GitHub users with multiple criteria
 * @param {Object} params - Search parameters
 * @param {string} params.username - Username to search for
 * @param {string} params.location - Location filter
 * @param {string} params.minRepos - Minimum repositories
 * @param {string} params.language - Programming language
 * @param {string} params.sort - Sort field (followers, repositories, joined)
 * @param {string} params.order - Sort order (asc, desc)
 * @param {number} page - Page number (default: 1)
 * @returns {Promise} Search results
 */
export const advancedSearchUsers = async (params, page = 1) => {
  try {
    const queryParts = [];
    
    // Build query string based on provided parameters
    if (params.username) {
      queryParts.push(`${params.username} in:login`);
    }
    if (params.location) {
      queryParts.push(`location:"${params.location}"`);
    }
    if (params.minRepos) {
      queryParts.push(`repos:>=${params.minRepos}`);
    }
    if (params.language) {
      queryParts.push(`language:"${params.language}"`);
    }
    
    // Default query if no specific criteria provided
    if (queryParts.length === 0) {
      queryParts.push('type:user');
    }
    
    const query = queryParts.join(' ');
    
    // Build search URL
    let url = `/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=30`;
    
    // Add sorting parameters if specified (excluding 'best-match')
    if (params.sort && params.sort !== 'best-match') {
      url += `&sort=${params.sort}&order=${params.order || 'desc'}`;
    }
    
    const response = await githubAPI.get(url);
    
    // Fetch detailed information for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userDetails = await fetchUserData(user.login);
          return userDetails;
        } catch (error) {
          // Return basic user info if detailed fetch fails
          return user;
        }
      })
    );
    
    return {
      ...response.data,
      items: usersWithDetails
    };
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
    } else if (error.response?.status === 422) {
      throw new Error('Invalid search parameters. Please adjust your search criteria.');
    } else {
      throw new Error('Failed to search users. Please check your connection and try again.');
    }
  }
};

/**
 * Search users by multiple criteria (legacy function for backward compatibility)
 */
export const searchUsers = async (query, page = 1) => {
  return advancedSearchUsers({ username: query }, page);
};

export default githubAPI;
