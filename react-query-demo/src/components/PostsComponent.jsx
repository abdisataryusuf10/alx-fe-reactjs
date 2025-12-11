import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PostCard from './PostCard';
import './PostsComponent.css';

// Fetch function for React Query
const fetchPosts = async ({ queryKey }) => {
  console.log('Fetching posts from API...');
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

const PostsComponent = () => {
  const [showPosts, setShowPosts] = useState(true);
  const [postCount, setPostCount] = useState(10);
  const [refetchCount, setRefetchCount] = useState(0);
  const [cacheStatus, setCacheStatus] = useState('Checking...');
  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  // React Query hook with complete caching configuration
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    dataUpdatedAt,
    isStale,
    isPreviousData,
    isRefetching,
    status,
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: fetchPosts,
    
    // CACHING CONFIGURATION
    cacheTime: 5 * 60 * 1000, // 5 minutes - data stays in cache for 5 minutes
    staleTime: 30 * 1000,     // 30 seconds - data is fresh for 30 seconds
    
    // CACHING BEHAVIOR
    refetchOnWindowFocus: true, // Refetch when window regains focus
    keepPreviousData: true,     // Keep previous data while fetching new data
    refetchOnMount: true,       // Refetch when component mounts
    refetchOnReconnect: true,   // Refetch when internet reconnects
    
    // RETRY CONFIGURATION
    retry: 3,                    // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Update cache status based on query state
  useEffect(() => {
    if (isFetching && !isPreviousData) {
      setCacheStatus('🔄 Fetching from API...');
    } else if (dataUpdatedAt) {
      const timeSinceUpdate = Date.now() - dataUpdatedAt;
      const timeInCache = Date.now() - (dataUpdatedAt - (staleTime || 0));
      
      if (timeSinceUpdate < (staleTime || 0)) {
        setCacheStatus('✅ Fresh (from cache)');
      } else if (timeInCache < (cacheTime || 0)) {
        setCacheStatus('🔄 Stale (can refetch)');
      } else {
        setCacheStatus('⏰ Expired (needs fresh data)');
      }
    }
  }, [isFetching, dataUpdatedAt, isPreviousData]);

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

  // DATA REFETCH INTERACTION - Multiple refetch strategies
  const handleRefetch = () => {
    setRefetchCount(prev => prev + 1);
    refetch();
  };

  const handleForceRefetch = () => {
    setRefetchCount(prev => prev + 1);
    refetch({ cancelRefetch: false });
  };

  const handleRefetchWithNewCache = () => {
    setRefetchCount(prev => prev + 1);
    refetch({ throwOnError: true });
  };

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  const clearCacheAndRefetch = () => {
    // In a real app, you would use queryClient.invalidateQueries()
    setRefetchCount(prev => prev + 1);
    refetch();
  };

  if (isLoading && !isPreviousData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Loading posts...</h2>
        <p>Fetching data from JSONPlaceholder API</p>
        <div className="loading-details">
          <p><strong>cacheTime:</strong> 5 minutes</p>
          <p><strong>staleTime:</strong> 30 seconds</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <h2>Error Loading Posts</h2>
        <p className="error-message">{error.message}</p>
        <div className="error-actions">
          <button onClick={() => refetch()} className="retry-button">
            Retry (3 attempts configured)
          </button>
          <button onClick={() => window.location.reload()} className="reload-button">
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="control-panel">
        <h2>React Query Cache & Refetch Demo</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Cache Configuration</h3>
            <div className="config-values">
              <div className="config-item">
                <span className="config-label">cacheTime:</span>
                <span className="config-value">5 minutes</span>
              </div>
              <div className="config-item">
                <span className="config-label">staleTime:</span>
                <span className="config-value">30 seconds</span>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Current Status</h3>
            <p className={`status ${status}`}>
              {status === 'loading' ? '🔄 Loading' : 
               status === 'error' ? '❌ Error' : 
               isFetching ? '🔄 Refetching' : 
               isStale ? '🔄 Stale' : '✅ Fresh'}
            </p>
            <div className="status-details">
              <span className={`detail ${isStale ? 'stale' : 'fresh'}`}>
                {isStale ? 'Data is stale' : 'Data is fresh'}
              </span>
              <span className={`detail ${isPreviousData ? 'previous' : 'current'}`}>
                {isPreviousData ? 'Showing previous data' : 'Showing current data'}
              </span>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Cache Status</h3>
            <p className="cache-status">{cacheStatus}</p>
            <div className="cache-details">
              <p>Updated: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'Never'}</p>
              <p>Age: {dataUpdatedAt ? Math.floor((Date.now() - dataUpdatedAt) / 1000) : 0}s</p>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Interaction Stats</h3>
            <p className="refetch-count">Refetches: {refetchCount}</p>
            <div className="interaction-details">
              <p>Page: {page} of {totalPages}</p>
              <p>Keep Previous: {keepPreviousData ? '✓' : '✗'}</p>
            </div>
          </div>
        </div>

        <div className="refetch-section">
          <h3>Data Refetch Interaction</h3>
          <div className="refetch-buttons">
            <button 
              onClick={handleRefetch} 
              disabled={isFetching}
              className={`refetch-button primary ${isFetching ? 'fetching' : ''}`}
            >
              {isFetching ? '🔄 Refetching...' : '🔄 Normal Refetch'}
            </button>
            
            <button 
              onClick={handleForceRefetch}
              disabled={isFetching}
              className="refetch-button secondary"
            >
              ⚡ Force Refetch
            </button>
            
            <button 
              onClick={clearCacheAndRefetch}
              disabled={isFetching}
              className="refetch-button tertiary"
            >
              🗑️ Clear & Refetch
            </button>
            
            <button 
              onClick={handleRefetchWithNewCache}
              disabled={isFetching}
              className="refetch-button quaternary"
            >
              🔄 Refetch with Options
            </button>
          </div>
          
          <div className="refetch-info">
            <p><strong>refetchOnWindowFocus:</strong> {refetchOnWindowFocus ? '✓ Enabled' : '✗ Disabled'}</p>
            <p><strong>keepPreviousData:</strong> {keepPreviousData ? '✓ Enabled' : '✗ Disabled'}</p>
            <p><strong>isRefetching:</strong> {isRefetching ? '✓ Yes' : '✗ No'}</p>
            <p><strong>isPreviousData:</strong> {isPreviousData ? '✓ Yes' : '✗ No'}</p>
          </div>
        </div>

        <div className="cache-controls">
          <h3>Cache & Display Controls</h3>
          <div className="control-grid">
            <div className="control-group">
              <label>Toggle Posts Display:</label>
              <button onClick={togglePosts} className="toggle-button">
                {showPosts ? '🙈 Hide Posts' : '👁️ Show Posts'}
              </button>
              <small>Test: Hide/show to see cache behavior</small>
            </div>
            
            <div className="control-group">
              <label>Pagination:</label>
              <div className="pagination">
                <button 
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1 || isFetching}
                  className="page-button"
                >
                  ← Previous
                </button>
                <span className="page-info">Page {page} of {totalPages}</span>
                <button 
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages || isFetching}
                  className="page-button"
                >
                  Next →
                </button>
              </div>
              <small>keepPreviousData keeps old data during fetch</small>
            </div>
            
            <div className="control-group">
              <label>Posts Per Page:</label>
              <div className="count-buttons">
                {[5, 10, 20].map(count => (
                  <button
                    key={count}
                    onClick={() => {
                      setPostCount(count);
                      setPage(1);
                    }}
                    className={`count-button ${postCount === count ? 'active' : ''}`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="cache-demo-instructions">
          <h3>🎯 Cache Demonstration Instructions</h3>
          <div className="instructions-grid">
            <div className="instruction">
              <h4>1. Test Cache Persistence</h4>
              <p>Click "Hide Posts" → Wait → Click "Show Posts"</p>
              <small>Result: Data loads instantly from cache</small>
            </div>
            <div className="instruction">
              <h4>2. Test Stale Data</h4>
              <p>Wait 30+ seconds → Check cache status</p>
              <small>Result: Status changes from "Fresh" to "Stale"</small>
            </div>
            <div className="instruction">
              <h4>3. Test Window Focus</h4>
              <p>Switch browser tabs → Return to this tab</p>
              <small>Result: Auto-refetches if stale (refetchOnWindowFocus)</small>
            </div>
            <div className="instruction">
              <h4>4. Test keepPreviousData</h4>
              <p>Click between pages quickly</p>
              <small>Result: Old data stays visible while new data loads</small>
            </div>
          </div>
        </div>
      </div>

      {showPosts && (
        <div className="posts-section">
          <div className="section-header">
            <h2>Posts ({currentPosts.length} displayed)</h2>
            <div className="section-status">
              <span className={`fetching-indicator ${isFetching ? 'active' : ''}`}>
                {isFetching ? '🔄 Fetching...' : '✅ Ready'}
              </span>
              <span className="cache-indicator">
                Cache: {isStale ? '🔄 Stale' : '✅ Fresh'}
              </span>
            </div>
          </div>
          
          {isPreviousData && (
            <div className="previous-data-notice">
              ⚡ Showing previous data while fetching new page...
            </div>
          )}
          
          <div className="posts-grid">
            {currentPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {posts.length > postCount && (
            <div className="pagination-footer">
              <p>Showing posts {((page - 1) * postsPerPage) + 1} to {Math.min(page * postsPerPage, posts.length)} of {posts.length}</p>
            </div>
          )}
        </div>
      )}

      <div className="technical-details">
        <h3>⚙️ Technical Cache Configuration</h3>
        <div className="config-display">
          <div className="code-block">
            <h4>React Query Configuration:</h4>
            <pre>
{`useQuery({
  queryKey: ['posts', page],
  queryFn: fetchPosts,
  cacheTime: 300000,     // 5 minutes
  staleTime: 30000,      // 30 seconds
  refetchOnWindowFocus: true,
  keepPreviousData: true,
  retry: 3,
  refetchOnMount: true,
  refetchOnReconnect: true
})`}
            </pre>
          </div>
          
          <div className="feature-grid">
            <div className="feature">
              <h4>cacheTime: 5 minutes</h4>
              <p>How long unused data stays in cache</p>
            </div>
            <div className="feature">
              <h4>staleTime: 30 seconds</h4>
              <p>How long data is considered fresh</p>
            </div>
            <div className="feature">
              <h4>refetchOnWindowFocus: true</h4>
              <p>Auto-refetch when window regains focus</p>
            </div>
            <div className="feature">
              <h4>keepPreviousData: true</h4>
              <p>Keep old data during new fetches</p>
            </div>
          </div>
        </div>
        
        <div className="network-monitor">
          <h4>🔍 Network Monitoring Tips:</h4>
          <ol>
            <li>Open DevTools → Network tab</li>
            <li>Toggle posts visibility → Watch network requests</li>
            <li>Switch browser tabs → Observe auto-refetch</li>
            <li>Click refetch buttons → See new requests</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PostsComponent;