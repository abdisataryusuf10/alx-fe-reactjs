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


import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <div className="App" style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Header />
      <div style={{ 
        padding: '0 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <MainContent />
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: '20px',
          margin: '30px 0'
        }}>
          <UserProfile 
            name="Alice" 
            age="25" 
            bio="Loves hiking and photography. Always exploring new trails and capturing beautiful moments."
          />
          
          <UserProfile 
            name="Bob" 
            age="30" 
            bio="Passionate about cooking and traveling. Enjoys trying local cuisines around the world."
          />
          
          <UserProfile 
            name="Charlie" 
            age="22" 
            bio="Enjoys coding and playing guitar. Dreams of visiting every tech hub city globally."
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}


import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';
import './App.css';

function App() {
  return (
    <div className="App" style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Header />
      <div style={{ 
        padding: '0 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <MainContent />
        
        {/* Counter Component */}
        <Counter />
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: '20px',
          margin: '30px 0'
        }}>
          <UserProfile 
            name="Alice" 
            age="25" 
            bio="Loves hiking and photography. Always exploring new trails and capturing beautiful moments."
          />
          
          <UserProfile 
            name="Bob" 
            age="30" 
            bio="Passionate about cooking and traveling. Enjoys trying local cuisines around the world."
          />
          
          <UserProfile 
            name="Charlie" 
            age="22" 
            bio="Enjoys coding and playing guitar. Dreams of visiting every tech hub city globally."
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;