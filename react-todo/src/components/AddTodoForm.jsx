import { useState } from 'react';
import './TodoList.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      setError('Todo text is required');
      return;
    }
    
    if (inputValue.length > 100) {
      setError('Todo text must be less than 100 characters');
      return;
    }
    
    setError('');
    onAddTodo(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form" data-testid="add-todo-form">
      <div className="form-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError('');
          }}
          placeholder="What needs to be done?"
          className="todo-input"
          data-testid="todo-input"
        />
        <button 
          type="submit" 
          className="add-button"
          data-testid="add-button"
        >
          Add Todo
        </button>
      </div>
      {error && <p className="error-message" data-testid="error-message">{error}</p>}
    </form>
  );
};

export default AddTodoForm;