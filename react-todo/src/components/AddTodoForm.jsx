// ---------------- src/components/AddTodoForm.jsx ----------------
import React, { useState } from 'react';


export default function AddTodoForm({ onAdd }) {
const [text, setText] = useState('');


function handleSubmit(e) {
e.preventDefault();
const trimmed = text.trim();
if (!trimmed) return;
onAdd(trimmed);
setText('');
}


return (
<form onSubmit={handleSubmit} aria-label="add-todo-form">
<input
aria-label="new-todo-input"
value={text}
onChange={(e) => setText(e.target.value)}
placeholder="Add todo"
/>
<button type="submit">Add</button>
</form>
);
}