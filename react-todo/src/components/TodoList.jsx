import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: true },
    { id: 3, text: 'Write Tests', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getCompletedCount = () => {
    return todos.filter(todo => todo.completed).length;
  };

  const getActiveCount = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  return (
    <div className="todo-list-container" data-testid="todo-list">
      <h1>Todo List</h1>
      <p className="subtitle">A simple todo list component with testing</p>
      
      <div className="add-todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          className="todo-input"
          data-testid="todo-input"
        />
        <button 
          onClick={handleAddTodo} 
          className="add-button"
          data-testid="add-todo-button"
        >
          Add Todo
        </button>
      </div>

      <div className="todo-stats">
        <div className="stat">
          <span className="stat-label">Total:</span>
          <span className="stat-value" data-testid="total-todos">{todos.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Active:</span>
          <span className="stat-value" data-testid="active-todos">{getActiveCount()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Completed:</span>
          <span className="stat-value" data-testid="completed-todos">{getCompletedCount()}</span>
        </div>
      </div>

      <div className="todos-container">
        {todos.length === 0 ? (
          <p className="no-todos" data-testid="no-todos">No todos yet. Add one above!</p>
        ) : (
          <ul className="todos-list" data-testid="todos-list">
            {todos.map(todo => (
              <li 
                key={todo.id} 
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                data-testid={`todo-item-${todo.id}`}
                data-completed={todo.completed}
              >
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="todo-checkbox"
                    data-testid={`todo-checkbox-${todo.id}`}
                  />
                  <span 
                    className="todo-text"
                    data-testid={`todo-text-${todo.id}`}
                    onClick={() => handleToggleTodo(todo.id)}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="delete-button"
                  data-testid={`delete-button-${todo.id}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="instructions">
        <h3>Testing Features:</h3>
        <ul>
          <li>✅ Add new todos</li>
          <li>✅ Toggle todo completion</li>
          <li>✅ Delete todos</li>
          <li>✅ Update todo statistics</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;