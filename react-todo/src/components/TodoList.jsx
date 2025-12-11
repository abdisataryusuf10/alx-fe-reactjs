import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [loading, setLoading] = useState(true);

  // Initialize with sample todos
  useEffect(() => {
    const sampleTodos = [
      { id: 1, text: 'Learn React Testing Library', completed: true },
      { id: 2, text: 'Implement Jest tests', completed: false },
      { id: 3, text: 'Build Todo App', completed: true },
      { id: 4, text: 'Write component tests', completed: false },
    ];
    
    // Simulate API call
    setTimeout(() => {
      setTodos(sampleTodos);
      setLoading(false);
    }, 500);
  }, []);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  const filteredTodos = getFilteredTodos();
  const stats = getStats();

  return (
    <div className="todo-app">
      <header className="app-header">
        <h1>📝 React Todo List</h1>
        <p className="subtitle">Advanced Todo App with Testing</p>
      </header>

      <div className="todo-container">
        <AddTodoForm onAddTodo={addTodo} />
        
        <div className="filters">
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          >
            Active ({stats.active})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          >
            Completed ({stats.completed})
          </button>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Active:</span>
            <span className="stat-value">{stats.active}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed:</span>
            <span className="stat-value">{stats.completed}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completion:</span>
            <span className="stat-value">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p className="empty-message">
                {filter === 'all' 
                  ? 'No todos yet. Add one above!'
                  : filter === 'active'
                  ? 'No active todos. Great job!'
                  : 'No completed todos yet.'}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        <div className="actions-bar">
          <button 
            onClick={clearCompleted}
            disabled={stats.completed === 0}
            className="clear-btn"
          >
            Clear Completed
          </button>
          <span className="hint">
            💡 Try interacting with todos to see the functionality
          </span>
        </div>

        <div className="testing-info">
          <h3>Testing Features Implemented:</h3>
          <ul>
            <li>✅ Add new todos</li>
            <li>✅ Toggle completion status</li>
            <li>✅ Edit todo text</li>
            <li>✅ Delete individual todos</li>
            <li>✅ Filter by status</li>
            <li>✅ Clear completed todos</li>
            <li>✅ Statistics display</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;