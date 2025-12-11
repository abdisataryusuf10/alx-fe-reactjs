import React from 'react';
import PostsComponent from './components/PostsComponent';
import './App.css';

function App() {
  return (
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
  );
}

export default App;