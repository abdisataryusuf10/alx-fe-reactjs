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

import WelcomeMessage from './components/WelcomeMessage';
import './App.css';

function App() {
  return (
    <div className="App">
      <WelcomeMessage />
      {/* Other existing components */}
    </div>
  );
}


import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}


import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      
      {/* User Profile Component with Props */}
      <UserProfile 
        name="Alice" 
        age="25" 
        bio="Loves hiking and photography" 
      />
      
      {/* You can add multiple user profiles with different props */}
      <UserProfile 
        name="Bob" 
        age="30" 
        bio="Passionate about cooking and traveling" 
      />
      
      <UserProfile 
        name="Charlie" 
        age="22" 
        bio="Enjoys coding and playing guitar" 
      />
      
      <Footer />
    </div>
  );
}

export default App;