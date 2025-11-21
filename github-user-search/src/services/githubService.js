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

import axios from 'axios';

// Create axios instance with base configuration
const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Add environment variable for token if needed
const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
if (token) {
  githubAPI.defaults.headers.common['Authorization'] = `token ${token}`;
}

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
 * Advanced search for GitHub users with multiple criteria using the search/users endpoint
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
    // Build query parts for GitHub Search API
    const queryParts = [];
    
    // Add type filter to ensure we only get users
    queryParts.push('type:user');
    
    // Add username filter
    if (params.username) {
      queryParts.push(`${params.username} in:login`);
    }
    
    // Add location filter
    if (params.location) {
      queryParts.push(`location:${params.location}`);
    }
    
    // Add repository count filter
    if (params.minRepos) {
      queryParts.push(`repos:>=${params.minRepos}`);
    }
    
    // Add language filter
    if (params.language) {
      queryParts.push(`language:${params.language}`);
    }

    // Construct the final query string
    const query = queryParts.join(' ');
    
    // Build the search URL with all parameters
    const searchParams = new URLSearchParams({
      q: query,
      page: page.toString(),
      per_page: '30'
    });

    // Add sorting parameters if specified (excluding 'best-match')
    if (params.sort && params.sort !== 'best-match') {
      searchParams.append('sort', params.sort);
      searchParams.append('order', params.order || 'desc');
    }

    const url = `/search/users?${searchParams.toString()}`;
    console.log('GitHub API Request:', url); // For debugging

    const response = await githubAPI.get(url);
    
    // If we have results, fetch detailed information for each user
    if (response.data.items && response.data.items.length > 0) {
      const usersWithDetails = await Promise.all(
        response.data.items.map(async (user) => {
          try {
            const userDetails = await fetchUserData(user.login);
            return {
              ...user,
              ...userDetails // Merge basic and detailed info
            };
          } catch (error) {
            console.warn(`Could not fetch details for user ${user.login}:`, error.message);
            return user; // Return basic info if detailed fetch fails
          }
        })
      );
      
      return {
        ...response.data,
        items: usersWithDetails
      };
    }
    
    return response.data;
  } catch (error) {
    console.error('GitHub API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 403) {
      const resetTime = error.response.headers['x-ratelimit-reset'];
      if (resetTime) {
        const resetDate = new Date(parseInt(resetTime) * 1000);
        throw new Error(`GitHub API rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}`);
      }
      throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
    } else if (error.response?.status === 422) {
      throw new Error('Invalid search parameters. Please adjust your search criteria.');
    } else if (error.response?.status === 404) {
      throw new Error('No users found matching your criteria.');
    } else {
      throw new Error('Failed to search users. Please check your connection and try again.');
    }
  }
};

/**
 * Search users by username (simplified version)
 */
export const searchUsers = async (query, page = 1) => {
  return advancedSearchUsers({ username: query }, page);
};

/**
 * Get user repositories
 */
export const getUserRepos = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}/repos?sort=updated&per_page=10`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user repositories');
  }
};

export default githubAPI;
