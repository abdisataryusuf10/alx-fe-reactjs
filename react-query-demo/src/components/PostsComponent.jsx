import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

const fetchPosts = async () => {
  console.log('Fetching posts from API...');
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
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
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

  const handleForceRefetch = () => {
    console.log('Manually triggering refetch...');
    refetch();
  };

  const handleInvalidateAndRefetch = () => {
    // This would invalidate the cache and refetch
    console.log('Invalidating cache and refetching...');
    refetch();
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
          <button 
            onClick={handleForceRefetch} 
            disabled={isFetching}
            className="refetch-btn"
          >
            {isFetching ? 'Refreshing...' : 'Refresh Posts'}
          </button>
          <button 
            onClick={handleInvalidateAndRefetch}
            className="invalidate-btn"
          >
            Invalidate Cache & Refetch
          </button>
          <span className="cache-info">
            Data is cached and will persist for 10 minutes
          </span>
        </div>
      </div>

      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Total Posts:</span>
          <span className="stat-value">{posts?.length || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Status:</span>
          <span className="stat-value">{isFetching ? 'Fetching...' : 'Ready'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Last Updated:</span>
          <span className="stat-value">
            {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'Never'}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Cache Status:</span>
          <span className="stat-value cached">Cached ✓</span>
        </div>
      </div>

      <div className="cache-demo-section">
        <h3>Caching Demonstration</h3>
        <div className="demo-instructions">
          <p>
            <strong>Try this:</strong> Click "Refresh Posts" multiple times. 
            Notice that after the first fetch, subsequent clicks don't trigger 
            network requests (check Network tab in DevTools) because the data 
            is served from cache.
          </p>
          <p>
            <strong>Caching Behavior:</strong> Data remains fresh for 5 minutes (staleTime). 
            After 5 minutes, if you revisit this page, React Query will refetch 
            in the background.
          </p>
          <div className="cache-features">
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>Automatic caching</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔄</span>
              <span>Background refetching</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📦</span>
              <span>Cache persistence</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <span>Smart refetching</span>
            </div>
          </div>
        </div>
      </div>

      <div className="posts-grid">
        {posts?.slice(0, 6).map((post) => (
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
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>QueryClient and QueryClientProvider setup</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>useQuery hook for data fetching</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>Automatic caching and stale data handling</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>Loading and error states</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>Manual refetching with refetch() function</span>
          </div>
          <div className="feature-item">
            <span className="feature-check">✅</span>
            <span>Cache invalidation demonstration</span>
          </div>
        </div>
        
        <div className="technical-details">
          <h4>Technical Implementation:</h4>
          <pre className="code-snippet">
{`const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    },
  },
});

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>`}
          </pre>
        </div>

        <div className="tip">
          <strong>💡 Pro Tip:</strong> Open browser DevTools → Network tab and observe:
          <ul>
            <li>First load: Network request to fetch posts</li>
            <li>Subsequent clicks on "Refresh Posts": No network requests (cached)</li>
            <li>Click "Invalidate Cache & Refetch": Forces a new network request</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostsComponent;