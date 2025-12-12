import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial render with demo todos
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Verify component renders
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Verify initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 2: Adding new todos with fireEvent
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add new todo');
    const button = screen.getByText('Add Todo');
    
    // Use fireEvent to simulate user input and form submission
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(button);
    
    // Verify new todo was added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test 3: Toggling todo completion with fireEvent
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Build a Todo App');
    
    // Initial state
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    // Toggle to completed
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Toggle back to not completed
    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting todos with fireEvent
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const deleteButtons = screen.getAllByText('Delete');
    
    // Delete first todo
    fireEvent.click(deleteButtons[0]);
    
    // Verify todo was deleted
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
