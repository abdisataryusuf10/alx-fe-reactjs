import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';
import './App.css';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>React Query Demo</h1>
          <p className="subtitle">
            Advanced Data Fetching, Caching, and State Management
          </p>
        </header>
        <main>
          <PostsComponent />
        </main>
        <footer className="App-footer">
          <p>
            Using JSONPlaceholder API • React Query • Caching Strategy
          </p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;