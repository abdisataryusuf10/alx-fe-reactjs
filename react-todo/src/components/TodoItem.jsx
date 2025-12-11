import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      onEdit(todo.id, trimmedText);
    } else if (!trimmedText) {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div 
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      data-testid={`todo-item-${todo.id}`}
      data-completed={todo.completed}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          data-testid={`todo-checkbox-${todo.id}`}
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyPress}
            className="edit-input"
            autoFocus
            data-testid={`edit-input-${todo.id}`}
          />
        ) : (
          <span 
            className="todo-text"
            onClick={handleEditClick}
            data-testid={`todo-text-${todo.id}`}
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        <button
          onClick={handleEditClick}
          className="action-btn edit-btn"
          aria-label={`Edit "${todo.text}"`}
          data-testid={`edit-button-${todo.id}`}
        >
          ✏️
        </button>
        
        <button
          onClick={() => onDelete(todo.id)}
          className="action-btn delete-btn"
          aria-label={`Delete "${todo.text}"`}
          data-testid={`delete-button-${todo.id}`}
        >
          🗑️
        </button>
      </div>
      
      <div className="todo-status">
        <span className="status-indicator">
          {todo.completed ? '✅ Completed' : '⏳ Pending'}
        </span>
        {todo.createdAt && (
          <span className="todo-date">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoItem;