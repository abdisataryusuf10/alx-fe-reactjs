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