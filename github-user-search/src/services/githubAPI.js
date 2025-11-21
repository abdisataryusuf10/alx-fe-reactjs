import axios from 'axios';

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance with common config
const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Add environment variable for token if needed
const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
if (token) {
  githubAPI.defaults.headers.common['Authorization'] = `token ${token}`;
}

// API service functions
export const githubService = {
  // Search for users
  searchUsers: async (query) => {
    try {
      const response = await githubAPI.get(`/search/users?q=${query}&per_page=10`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  // Get user details
  getUser: async (username) => {
    try {
      const response = await githubAPI.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Get user repositories
  getUserRepos: async (username) => {
    try {
      const response = await githubAPI.get(`/users/${username}/repos?sort=updated&per_page=10`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user repos:', error);
      throw error;
    }
  },
};

export default githubService;