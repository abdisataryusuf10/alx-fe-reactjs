import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const [refetchCount, setRefetchCount] = useState(0);
  
  const { 
    data: posts, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const handleRefetch = () => {
    setRefetchCount(prev => prev + 1);
    refetch();
  };

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="posts-container">
      <div className="controls">
        <button onClick={handleRefetch} disabled={isFetching}>
          {isFetching ? 'Refreshing...' : 'Refresh Posts'}
        </button>
        <span className="refetch-count">Refetched: {refetchCount} times</span>
        <span className="cache-info">
          {isFetching ? 'Fetching from API...' : 'Loaded from cache'}
        </span>
      </div>
      
      <div className="posts-grid">
        {posts?.slice(0, 10).map(post => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
            <div className="post-meta">
              <span>Post ID: {post.id}</span>
              <span>User ID: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="stats">
        <p>Total Posts: {posts?.length}</p>
        <p>Showing: 10 posts</p>
        <p>Cache Status: {isFetching ? 'Updating' : 'Current'}</p>
      </div>
    </div>
  );
};

export default PostsComponent;