import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch blog post data based on the dynamic ID
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        
        if (!response.ok) {
          throw new Error('Post not found');
        }
        
        const data = await response.json();
        setPost(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleNavigate = (newId) => {
    navigate(`/blog/${newId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog post {id}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Post</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="home-btn">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <h1>Dynamic Routing Example</h1>
      <p className="subtitle">Current Route: /blog/{id}</p>
      
      <div className="blog-content">
        <h2>{post?.title}</h2>
        <div className="post-meta">
          <span>Post ID: {post?.id}</span>
          <span>User ID: {post?.userId}</span>
          <span>Dynamic Parameter: {id}</span>
        </div>
        <p className="post-body">{post?.body}</p>
      </div>

      <div className="dynamic-demo">
        <h3>Dynamic Routing Demonstration</h3>
        <p>Change the URL parameter to see different content:</p>
        
        <div className="nav-buttons">
          <button onClick={() => handleNavigate(1)} className="demo-btn">
            Go to Blog Post 1
          </button>
          <button onClick={() => handleNavigate(2)} className="demo-btn">
            Go to Blog Post 2
          </button>
          <button onClick={() => handleNavigate(3)} className="demo-btn">
            Go to Blog Post 3
          </button>
          <button onClick={() => handleNavigate(100)} className="demo-btn error">
            Try Invalid Post (100)
          </button>
        </div>

        <div className="url-examples">
          <h4>Try these dynamic URLs:</h4>
          <ul>
            <li><code>/blog/1</code> - First blog post</li>
            <li><code>/blog/5</code> - Fifth blog post</li>
            <li><code>/blog/25</code> - Twenty-fifth blog post</li>
            <li><code>/blog/any-number</code> - Dynamic content based on parameter</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;