import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List Testing Demo</h1>
        <p>Jest + React Testing Library Implementation</p>
      </header>
      <main>
        <TodoList />
      </main>
      <footer className="App-footer">
        <p>Run tests with: <code>npm test</code></p>
      </footer>
    </div>
  );
}

export default App;