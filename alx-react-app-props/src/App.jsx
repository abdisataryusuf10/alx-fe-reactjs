import WelcomeMessage from './components/WelcomeMessage.jsx'
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



import ProfilePage from './ProfilePage';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return <ProfilePage userData={userData} />;
}


// src/App.jsx
import React from 'react';
import { UserProvider } from './context/UserContext'; // ✅ Import UserContext Provider
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Contact from './components/Contact';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  return (
    // ✅ Wrap components with UserContext.Provider
    <UserProvider>
      <div className="app">
        <Navbar />
        <header className="app-header">
          <h1>Recipe Sharing App</h1>
        </header>
        <main className="app-main">
          <UserProfile /> {/* Component that uses context */}
          <Contact />
          <AddRecipeForm />
          <RecipeList />
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
