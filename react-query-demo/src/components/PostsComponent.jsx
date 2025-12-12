import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import './PostsComponent.css';

// API functions
const fetchPosts = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const createPost = async (newPost) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};

const deletePost = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
  return { id: postId };
};

const PostsComponent = () => {
  const [page, setPage] = useState(1);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const queryClient = useQueryClient();

  // Fetch posts query with caching options
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery(['posts', page], fetchPosts, {
    // Caching and performance options
    cacheTime: 5 * 60 * 1000, // Cache data for 5 minutes
    staleTime: 2 * 60 * 1000, // Data is fresh for 2 minutes
    refetchOnWindowFocus: true, // Refetch when window regains focus
    keepPreviousData: true, // Keep previous data when fetching new data
    retry: 2, // Retry failed requests twice
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Create post mutation
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      // Invalidate and refetch posts query
      queryClient.invalidateQueries('posts');
      setNewPostTitle('');
      setNewPostBody('');
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });

  // Delete post mutation
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      // Invalidate and refetch posts query
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.error('Failed to delete post:', error);
    },
  });

  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPostTitle.trim() && newPostBody.trim()) {
      createMutation.mutate({
        title: newPostTitle,
        body: newPostBody,
        userId: 1,
      });
    }
  };

  const handleDeletePost = (postId) => {
    deleteMutation.mutate(postId);
  };

  // Manual refetch interaction
  const handleManualRefetch = () => {
    refetch();
  };

  // Force refetch ignoring cache
  const handleForceRefetch = () => {
    refetch({ force: true });
  };

  // Clear all cache
  const handleClearCache = () => {
    queryClient.clear();
  };

  // Prefetch next page
  const handlePrefetchNextPage = () => {
    const nextPage = page + 1;
    queryClient.prefetchQuery(['posts', nextPage], fetchPosts, {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <h2>Error loading posts</h2>
        <p>{error.message}</p>
        <button onClick={handleManualRefetch} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <h1>React Query Demo - Posts</h1>
      
      {/* Cache Controls Section */}
      <div className="cache-controls">
        <h2>Cache Controls</h2>
        <div className="cache-info">
          <p><strong>Cache Time:</strong> 5 minutes</p>
          <p><strong>Stale Time:</strong> 2 minutes</p>
          <p><strong>Refetch on Window Focus:</strong> Enabled</p>
          <p><strong>Keep Previous Data:</strong> Enabled</p>
          <p><strong>Status:</strong> {isFetching ? 'Fetching...' : 'Ready'}</p>
        </div>
        
        <div className="cache-buttons">
          <button 
            onClick={handleManualRefetch} 
            disabled={isFetching}
            className="cache-btn"
          >
            {isFetching ? 'Refreshing...' : 'Manual Refetch'}
          </button>
          <button 
            onClick={handleForceRefetch}
            className="cache-btn force-refetch"
          >
            Force Refetch (Ignore Cache)
          </button>
          <button 
            onClick={handleClearCache}
            className="cache-btn clear-cache"
          >
            Clear All Cache
          </button>
          <button 
            onClick={handlePrefetchNextPage}
            disabled={posts?.length < 10}
            className="cache-btn prefetch"
          >
            Prefetch Next Page
          </button>
        </div>
      </div>

      {/* Add Post Form */}
      <div className="add-post-form">
        <h2>Add New Post</h2>
        <form onSubmit={handleAddPost}>
          <div className="form-group">
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Post title"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              placeholder="Post content"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            disabled={createMutation.isLoading}
            className="add-btn"
          >
            {createMutation.isLoading ? 'Adding...' : 'Add Post'}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="posts-header">
        <h2>Posts (Page {page})</h2>
        <div className="actions">
          <button 
            onClick={handleManualRefetch} 
            className="refresh-btn" 
            disabled={isFetching}
          >
            {isFetching ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <button
            onClick={() => queryClient.invalidateQueries('posts')}
            className="invalidate-btn"
          >
            Invalidate Queries
          </button>
        </div>
      </div>

      <div className="posts-list">
        {posts?.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h3>{post.title}</h3>
              <span className="post-id">ID: {post.id}</span>
            </div>
            <p>{post.body}</p>
            <div className="post-meta">
              <span>User ID: {post.userId}</span>
              <span>Page: {page}</span>
            </div>
            <button
              onClick={() => handleDeletePost(post.id)}
              disabled={deleteMutation.isLoading}
              className="delete-btn"
            >
              {deleteMutation.isLoading && deleteMutation.variables === post.id
                ? 'Deleting...'
                : 'Delete'}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="page-btn"
        >
          Previous
        </button>
        <span className="page-info">Page {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={posts?.length < 10}
          className="page-btn"
        >
          Next
        </button>
      </div>

      {/* Cache Demonstration */}
      <div className="demonstration">
        <h3>Cache Demonstration</h3>
        <div className="demo-instructions">
          <p><strong>Try this:</strong></p>
          <ol>
            <li>Click between pages - notice how previous page data loads instantly (keepPreviousData)</li>
            <li>Switch browser tabs and return - data refetches automatically (refetchOnWindowFocus)</li>
            <li>Wait 2 minutes, then click "Refresh Data" - data might be served from cache (staleTime)</li>
            <li>Use "Force Refetch" to get fresh data ignoring cache</li>
            <li>Use "Clear All Cache" to remove all cached data</li>
            <li>Use "Prefetch Next Page" to load next page in background</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PostsComponent;