const TodoItem = ({ todo, onToggle, onDelete }) => {
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
          data-testid={`checkbox-${todo.id}`}
        />
        <span 
          className={`todo-text ${todo.completed ? 'completed-text' : ''}`}
          onClick={() => onToggle(todo.id)}
          style={{ cursor: 'pointer' }}
          data-testid={`todo-text-${todo.id}`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
        data-testid={`delete-button-${todo.id}`}
        aria-label={`Delete todo: ${todo.text}`}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;