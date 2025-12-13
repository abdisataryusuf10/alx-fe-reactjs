import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial render
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 2: Add todo
  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add new todo');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  // Test 3: Toggle todo
  test('toggles todo completion', () => {
    render(<TodoList />);
    const todo = screen.getByText('Build a Todo App');
    
    // Click to add line-through
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    // Click to remove line-through
    fireEvent.click(todo);
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Delete todo
  test('deletes a todo', () => {
    render(<TodoList />);
    const deleteButtons = screen.getAllByText('Delete');
    
    fireEvent.click(deleteButtons[0]);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
