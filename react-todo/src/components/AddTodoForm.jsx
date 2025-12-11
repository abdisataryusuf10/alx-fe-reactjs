import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedValue = inputValue.trim();
    
    if (!trimmedValue) {
      setError('Todo text cannot be empty');
      return;
    }
    
    if (trimmedValue.length < 3) {
      setError('Todo must be at least 3 characters');
      return;
    }
    
    onAddTodo(trimmedValue);
    setInputValue('');
    setError('');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="todo-input"
          aria-label="Add new todo"
          data-testid="todo-input"
        />
        <button 
          type="submit" 
          className="add-btn"
          aria-label="Add todo"
          data-testid="add-todo-button"
        >
          Add
        </button>
      </div>
      
      {error && (
        <div className="error-message" data-testid="error-message">
          {error}
        </div>
      )}
      
      <div className="form-hint">
        Press Enter or click Add to create a new todo
      </div>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;