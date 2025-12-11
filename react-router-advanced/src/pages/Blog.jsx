import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data.slice(0, 9)); // Get first 9 posts
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-error">
        <h3>Error loading posts</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="blog">
      <div className="blog-header">
        <h1>Blog</h1>
        <p className="blog-subtitle">
          Dynamic routing with URL parameters. Click any post to see dynamic routing in action.
        </p>
      </div>

      <div className="dynamic-route-info">
        <div className="info-card">
          <h3>How Dynamic Routing Works:</h3>
          <p>
            Each blog post has a unique ID in the URL. When you click a post, 
            React Router extracts the <code>:postId</code> parameter and loads 
            the corresponding content dynamically.
          </p>
          <div className="route-example">
            <code>/blog/1</code> → <strong>Post #1</strong>
          </div>
          <div className="route-example">
            <code>/blog/2</code> → <strong>Post #2</strong>
          </div>
          <div className="route-example">
            <code>/blog/3</code> → <strong>Post #3</strong>
          </div>
        </div>
      </div>

      <div className="posts-grid">
        {posts.map(post => (
          <Link to={`/blog/${post.id}`} key={post.id} className="post-card-link">
            <div className="post-card">
              <div className="post-number">#{post.id}</div>
              <h3 className="post-title">
                {post.title.length > 50 
                  ? post.title.substring(0, 50) + '...' 
                  : post.title}
              </h3>
              <p className="post-excerpt">
                {post.body.length > 100 
                  ? post.body.substring(0, 100) + '...' 
                  : post.body}
              </p>
              <div className="post-footer">
                <span className="post-user">User #{post.userId}</span>
                <span className="read-more">Read more →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="routing-demo">
        <h2>Dynamic Routing Demo</h2>
        <div className="demo-steps">
          <div className="demo-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Click a Post</h3>
              <p>Click any blog post above to navigate to its dynamic route</p>
            </div>
          </div>
          
          <div className="demo-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>URL Parameter Extraction</h3>
              <p>React Router extracts the postId from the URL</p>
            </div>
          </div>
          
          <div className="demo-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Dynamic Content Loading</h3>
              <p>The BlogPost component uses useParams() to get the ID and fetch data</p>
            </div>
          </div>
          
          <div className="demo-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Component Rendering</h3>
              <p>The component renders content based on the dynamic parameter</p>
            </div>
          </div>
        </div>
      </div>

      <div className="try-it">
        <h3>Try It Yourself:</h3>
        <p>
          Manually navigate to <code>/blog/5</code> or <code>/blog/8</code> 
          in the URL bar to see different posts.
        </p>
        <div className="quick-navigation">
          <Link to="/blog/1" className="quick-nav-link">Post 1</Link>
          <Link to="/blog/2" className="quick-nav-link">Post 2</Link>
          <Link to="/blog/3" className="quick-nav-link">Post 3</Link>
          <Link to="/blog/4" className="quick-nav-link">Post 4</Link>
          <Link to="/blog/5" className="quick-nav-link">Post 5</Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;