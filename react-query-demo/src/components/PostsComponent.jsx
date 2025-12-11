import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const handleDeletePost = (postId) => {
    // In a real app, you would make a DELETE request here
    console.log('Delete post:', postId);
    alert(`Post ${postId} would be deleted in a real application`);
  };

  const handleUpdatePost = (post) => {
    // In a real app, you would make a PUT request here
    console.log('Update post:', post);
    alert(`Post ${post.id} would be updated in a real application`);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts from JSONPlaceholder API</h2>
        <div className="posts-controls">
          <button onClick={refetch} disabled={isFetching}>
            {isFetching ? 'Refreshing...' : 'Refresh Posts'}
          </button>
          <span className="cache-info">
            Data is cached and will persist for 10 minutes
          </span>
        </div>
      </div>

      <div className="stats">
        <p>Total Posts: {posts?.length || 0}</p>
        <p>Status: {isFetching ? 'Fetching...' : 'Ready'}</p>
      </div>

      <div className="posts-grid">
        {posts?.slice(0, 12).map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-id">#{post.id}</span>
              <span className="post-user">User: {post.userId}</span>
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
            <div className="post-actions">
              <button
                onClick={() => handleUpdatePost(post)}
                className="action-btn update-btn"
              >
                Update
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="action-btn delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="query-info">
        <h3>React Query Features Demonstrated:</h3>
        <ul>
          <li>✅ Automatic data caching</li>
          <li>✅ Background refetching on window focus</li>
          <li>✅ Error handling and retries</li>
          <li>✅ Loading states management</li>
          <li>✅ Manual refetching capability</li>
          <li>✅ Optimistic updates (simulated)</li>
        </ul>
        <p className="tip">
          💡 Try navigating away and coming back - the data loads instantly from cache!
        </p>
      </div>
    </div>
  );
};

export default PostsComponent;