import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch post details
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });

    // Fetch comments for this post
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => setComments(data.slice(0, 3)))
      .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="error-container">
        <h3>Post not found</h3>
        <p>The post you're looking for doesn't exist.</p>
        <Link to="/blog" className="back-link">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <Link to="/blog" className="back-link">
        ← Back to all posts
      </Link>

      <article className="blog-post">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="post-author">User #{post.userId}</span>
            <span className="post-id">Post ID: {post.id}</span>
          </div>
        </header>

        <div className="post-content">
          <p>{post.body}</p>
          <p className="post-excerpt">
            This is a dynamically loaded post using the post ID from the URL parameter.
            The data is fetched from JSONPlaceholder API.
          </p>
        </div>

        <div className="post-extra">
          <div className="tags">
            <span className="tag">Dynamic Routing</span>
            <span className="tag">API Integration</span>
            <span className="tag">React Router</span>
          </div>
        </div>
      </article>

      {comments.length > 0 && (
        <div className="comments-section">
          <h3>Comments ({comments.length})</h3>
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <strong>{comment.name}</strong>
                  <span className="comment-email">{comment.email}</span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dynamic-info">
        <h4>Dynamic Routing Information:</h4>
        <ul>
          <li><strong>URL Parameter (postId):</strong> {postId}</li>
          <li><strong>Dynamic Path:</strong> /blog/:postId</li>
          <li><strong>API Endpoint:</strong> https://jsonplaceholder.typicode.com/posts/{postId}</li>
          <li><strong>Route Type:</strong> Dynamic Route with useParams()</li>
        </ul>
      </div>
    </div>
  );
};

export default BlogPost;