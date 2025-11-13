import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetail from './components/RecipeDetail'
import EditRecipeForm from './components/EditRecipeForm'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import UserProfile from './components/UserProfile'
import LoginForm from './components/LoginForm'
import './App.css'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <h1>Recipe Sharing App</h1>
              <nav className="main-nav">
                <a href="/" className="nav-link">Home</a>
                <a href="/#profile" className="nav-link">Profile</a>
              </nav>
            </div>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={
                <div className="app-layout">
                  <div className="sidebar">
                    <LoginForm />
                    <AddRecipeForm />
                    <FilterPanel />
                    <FavoritesList />
                  </div>
                  <div className="main-content">
                    <SearchBar />
                    <RecommendationsList />
                    <RecipeList />
                  </div>
                </div>
              } />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/edit-recipe/:id" element={<EditRecipeForm />} />
              <Route path="/profile" element={
                <div className="profile-page">
                  <UserProfile />
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  )
}
import Navbar from './components/Navbar';
function App() {
    return (
        <Router>
            <Navbar />  {/* ← This is where Navbar gets placed */}
            <Routes>
                // ... routes
            </Routes>
        </Router>
    );
}

import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Recipe Sharing App</h1>
      </header>
      <main className="app-main">
        <AddRecipeForm />
        <RecipeList />
      </main>
    </div>
  );
}

export default App;
