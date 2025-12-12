import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="profile-posts">
      <h2>My Posts</h2>
      
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
            <div className="post-actions">
              <Link to={`/posts/${post.id}`} className="view-btn">
                View Post
              </Link>
              <span className="post-meta">ID: {post.id}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="all-posts-link">
        <Link to="/posts">View all posts →</Link>
      </div>
    </div>
  );
};

export default ProfilePosts;