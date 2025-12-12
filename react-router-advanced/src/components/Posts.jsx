import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
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
    <div className="posts-container">
      <h1>Dynamic Routing Demo</h1>
      <p>Each post has a dynamic route: /posts/:id</p>
      
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
            <Link to={`/posts/${post.id}`} className="view-link">
              View Details (Dynamic Route: /posts/{post.id})
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading post {id}...</div>;
  }

  if (!post) {
    return (
      <div className="error">
        <h2>Post not found</h2>
        <p>Post with ID {id} does not exist.</p>
        <button onClick={() => navigate('/posts')} className="back-btn">
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <h1>Dynamic Route: /posts/{id}</h1>
      <p>This page is loaded dynamically based on the URL parameter: {id}</p>
      
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <div className="post-meta">
          <span>Post ID: {post.id}</span>
          <span>User ID: {post.userId}</span>
        </div>
      </div>

      <div className="dynamic-nav">
        <h3>Try these dynamic routes:</h3>
        <div className="nav-buttons">
          <button onClick={() => navigate('/posts/1')} className="nav-btn">
            Go to Post 1
          </button>
          <button onClick={() => navigate('/posts/2')} className="nav-btn">
            Go to Post 2
          </button>
          <button onClick={() => navigate('/posts/3')} className="nav-btn">
            Go to Post 3
          </button>
          <button onClick={() => navigate('/posts/100')} className="nav-btn">
            Try Invalid Post (100)
          </button>
        </div>
      </div>
    </div>
  );
};

export { Posts, PostDetail };