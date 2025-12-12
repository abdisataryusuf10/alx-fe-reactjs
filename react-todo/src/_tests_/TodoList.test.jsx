import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial render with demo todos
  test('renders initial todos', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 2: Adding new todos with fireEvent
  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add new todo');
    const addButton = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test 3: Toggling todo completion
  test('toggles todo completion', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Build a Todo App');
    
    // Initial state should not have line-through
    expect(todo).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    fireEvent.click(todo);
    
    // Should now have line-through
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(todo);
    
    // Should not have line-through again
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting todos
  test('deletes a todo', () => {
    render(<TodoList />);
    
    const deleteButtons = screen.getAllByText('Delete');
    
    fireEvent.click(deleteButtons[0]);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
