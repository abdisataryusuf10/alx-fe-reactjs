import { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false }
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
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

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todo-list" data-testid="todo-list">
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />
      
      <div className="stats">
        <p>Total: {todos.length} | Completed: {completedTodos.length} | Pending: {incompleteTodos.length}</p>
      </div>
      
      {incompleteTodos.length > 0 && (
        <div className="todo-section">
          <h2>Pending Tasks ({incompleteTodos.length})</h2>
          {incompleteTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
      
      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h2>Completed Tasks ({completedTodos.length})</h2>
          {completedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
      
      {todos.length === 0 && (
        <div className="empty-state" data-testid="empty-state">
          <p>No todos yet. Add one above!</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;