import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch post details using the dynamic parameter
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
        </div>

        <div className="dynamic-route-info">
          <h3>Dynamic Route Information:</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">URL Parameter:</span>
              <code>:postId = {postId}</code>
            </div>
            <div className="info-item">
              <span className="info-label">Full Path:</span>
              <code>/blog/{postId}</code>
            </div>
            <div className="info-item">
              <span className="info-label">Component:</span>
              <span>BlogPost</span>
            </div>
            <div className="info-item">
              <span className="info-label">Hook Used:</span>
              <code>useParams()</code>
            </div>
          </div>
        </div>

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

        <div className="navigation-links">
          <h4>Try Dynamic Routing:</h4>
          <div className="post-links">
            <Link to="/blog/1" className="post-link">Post 1</Link>
            <Link to="/blog/2" className="post-link">Post 2</Link>
            <Link to="/blog/3" className="post-link">Post 3</Link>
            <Link to="/blog/4" className="post-link">Post 4</Link>
            <Link to="/blog/5" className="post-link">Post 5</Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;