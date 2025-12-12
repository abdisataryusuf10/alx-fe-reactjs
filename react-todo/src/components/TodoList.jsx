// ---------------- src/components/TodoList.jsx ----------------
import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';


export default function TodoList() {
const [todos, setTodos] = useState([
{ id: 1, text: 'Buy milk', completed: false },
{ id: 2, text: 'Walk the dog', completed: true },
{ id: 3, text: 'Read a book', completed: false },
]);


function addTodo(text) {
const nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
setTodos([...todos, { id: nextId, text, completed: false }]);
}


function toggleTodo(id) {
setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
}


function deleteTodo(id) {
setTodos(todos.filter(t => t.id !== id));
}


return (
<div>
<h2>Todo List</h2>
<AddTodoForm onAdd={addTodo} />
<ul aria-label="todo-list">
{todos.map(todo => (
<li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
<span
role="button"
tabIndex={0}
onClick={() => toggleTodo(todo.id)}
onKeyDown={(e) => { if (e.key === 'Enter') toggleTodo(todo.id); }}
aria-pressed={todo.completed}
data-testid={`todo-text-${todo.id}`}
style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
>
{todo.text}
</span>
<button aria-label={`delete-${todo.id}`} onClick={() => deleteTodo(todo.id)}>Delete</button>
</li>
))}
</ul>
</div>
);
}