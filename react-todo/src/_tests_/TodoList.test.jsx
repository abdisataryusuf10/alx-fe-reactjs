import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

// Mock console to keep test output clean
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
  console.warn.mockRestore();
});

describe('TodoList Component', () => {
  test('renders TodoList component correctly', () => {
    render(<TodoList />);
    
    // Check if the component renders
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if input and button are present
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if stats are displayed
    expect(screen.getByTestId('total-todos')).toHaveTextContent('Total: 3');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('Completed: 1');
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Type in the input
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    
    // Click the add button
    fireEvent.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check if input is cleared
    expect(input.value).toBe('');
    
    // Check if total count updated
    expect(screen.getByTestId('total-todos')).toHaveTextContent('Total: 4');
  });

  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const initialCount = screen.getByTestId('total-todos').textContent;
    
    const addButton = screen.getByTestId('add-button');
    
    // Click add button without entering text
    fireEvent.click(addButton);
    
    // Count should remain the same
    expect(screen.getByTestId('total-todos')).toHaveTextContent(initialCount);
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    
    // Find the "Build a Todo App" todo
    const todoText = screen.getByText('Build a Todo App');
    
    // Click to toggle
    fireEvent.click(todoText);
    
    // Should now be completed (strikethrough)
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Click again to untoggle
    fireEvent.click(todoText);
    
    // Should not have strikethrough
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    // Find initial count
    expect(screen.getByTestId('total-todos')).toHaveTextContent('Total: 3');
    
    // Find delete button for "Learn React" (first todo)
    const deleteButtons = screen.getAllByText('Delete');
    const firstDeleteButton = deleteButtons[0];
    
    // Click delete button
    fireEvent.click(firstDeleteButton);
    
    // "Learn React" should be removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Count should be updated
    expect(screen.getByTestId('total-todos')).toHaveTextContent('Total: 2');
  });

  test('toggles todo with line-through style', () => {
    render(<TodoList />);
    
    // Get all todos
    const todoElements = screen.getAllByText(/Learn React|Build a Todo App|Write Tests/);
    const learnReactTodo = todoElements[0];
    
    // Initially, "Learn React" should be completed (from initial state)
    expect(learnReactTodo).toHaveStyle('text-decoration: line-through');
    
    // Click to toggle off
    fireEvent.click(learnReactTodo);
    
    // Should not have strikethrough
    expect(learnReactTodo).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle on again
    fireEvent.click(learnReactTodo);
    
    // Should have strikethrough again
    expect(learnReactTodo).toHaveStyle('text-decoration: line-through');
  });

  test('shows correct completed count after toggling', () => {
    render(<TodoList />);
    
    // Initial completed count should be 1
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('Completed: 1');
    
    // Toggle a non-completed todo to completed
    const writeTestsTodo = screen.getByText('Write Tests');
    fireEvent.click(writeTestsTodo);
    
    // Completed count should now be 2
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('Completed: 2');
    
    // Toggle it back
    fireEvent.click(writeTestsTodo);
    
    // Completed count should be 1 again
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('Completed: 1');
  });

  test('maintains todo functionality after multiple operations', () => {
    render(<TodoList />);
    
    // Add a todo
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.change(input, { target: { value: 'Test Todo 1' } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: 'Test Todo 2' } });
    fireEvent.click(addButton);
    
    // Should have 5 todos now
    expect(screen.getByTestId('total-todos')).toHaveTextContent('Total: 5');
    
    // Toggle the new todos
    const testTodo1 = screen.getByText('Test Todo 1');
    const testTodo2 = screen.getByText('Test Todo 2');
    
    fireEvent.click(testTodo1);
    fireEvent.click(testTodo2);
    
    // Completed count should be 3 (1 original + 2 new)
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('Completed: 3');
    
    // Delete one of the new todos
    const deleteButtons = screen.getAllByText('Delete');
    const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
    fireEvent.click(lastDeleteButton);
    
    // Total should be 4
    expect(screen.getByTestId('total-todos')).toHaveTextContent('Total: 4');
    
    // "Test Todo 2" should be gone
    expect(screen.queryByText('Test Todo 2')).not.toBeInTheDocument();
  });
});