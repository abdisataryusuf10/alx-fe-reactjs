import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false }
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      
      {/* AddTodoForm */}
      <div className="add-todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          data-testid="todo-input"
        />
        <button onClick={addTodo} data-testid="add-button">
          Add Todo
        </button>
      </div>

      {/* TodoList */}
      <div className="todo-list" data-testid="todo-list">
        {todos.map(todo => (
          <div 
            key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            data-testid={`todo-item-${todo.id}`}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '10px'
              }}
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-button-${todo.id}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="todo-stats">
        <p data-testid="total-todos">Total: {todos.length}</p>
        <p data-testid="completed-todos">
          Completed: {todos.filter(t => t.completed).length}
        </p>
      </div>
    </div>
  );
};

export default TodoList;