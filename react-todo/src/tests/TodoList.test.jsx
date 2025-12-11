import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  test('renders TodoList component with initial todos', () => {
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByTestId('todos-list')).toBeInTheDocument();
    
    // Check initial todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check stats
    expect(screen.getByTestId('total-todos')).toHaveTextContent('3');
    expect(screen.getByTestId('active-todos')).toHaveTextContent('2');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('1');
  });

  test('adds a new todo', async () => {
    const user = userEvent.setup();
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Add a new todo
    await user.type(input, 'New Test Todo');
    await user.click(addButton);
    
    // Check if todo was added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    expect(screen.getByTestId('total-todos')).toHaveTextContent('4');
    expect(input).toHaveValue('');
  });

  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Try to add empty todo
    await user.type(input, '   ');
    await user.click(addButton);
    
    // Check no todo was added
    expect(screen.getByTestId('total-todos')).toHaveTextContent('3');
  });

  test('adds todo on Enter key press', async () => {
    const user = userEvent.setup();
    
    const input = screen.getByTestId('todo-input');
    
    // Add todo using Enter key
    await user.type(input, 'Todo with Enter{Enter}');
    
    expect(screen.getByText('Todo with Enter')).toBeInTheDocument();
    expect(screen.getByTestId('total-todos')).toHaveTextContent('4');
  });

  test('toggles todo completion', async () => {
    const user = userEvent.setup();
    
    // Find the first todo's checkbox
    const todoCheckbox = screen.getByTestId('todo-checkbox-1');
    const todoText = screen.getByTestId('todo-text-1');
    
    // Initially should not be completed
    expect(todoCheckbox).not.toBeChecked();
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    // Toggle to completed
    await user.click(todoCheckbox);
    
    // Should be completed
    expect(todoCheckbox).toBeChecked();
    expect(screen.getByTestId('todo-item-1')).toHaveAttribute('data-completed', 'true');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('2');
    expect(screen.getByTestId('active-todos')).toHaveTextContent('1');
    
    // Toggle back to active
    await user.click(todoCheckbox);
    expect(todoCheckbox).not.toBeChecked();
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('1');
    expect(screen.getByTestId('active-todos')).toHaveTextContent('2');
  });

  test('toggles todo completion by clicking text', async () => {
    const user = userEvent.setup();
    
    const todoText = screen.getByTestId('todo-text-1');
    const todoCheckbox = screen.getByTestId('todo-checkbox-1');
    
    // Initially not checked
    expect(todoCheckbox).not.toBeChecked();
    
    // Click text to toggle
    await user.click(todoText);
    
    // Should be checked now
    expect(todoCheckbox).toBeChecked();
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    
    const deleteButton = screen.getByTestId('delete-button-1');
    const todoText = screen.getByText('Learn React');
    
    // Verify todo exists before deletion
    expect(todoText).toBeInTheDocument();
    expect(screen.getByTestId('total-todos')).toHaveTextContent('3');
    
    // Delete the todo
    await user.click(deleteButton);
    
    // Verify todo was deleted
    expect(todoText).not.toBeInTheDocument();
    expect(screen.getByTestId('total-todos')).toHaveTextContent('2');
    expect(screen.queryByTestId('todo-item-1')).not.toBeInTheDocument();
  });

  test('shows no todos message when empty', async () => {
    const user = userEvent.setup();
    
    // Delete all todos
    const deleteButtons = [
      screen.getByTestId('delete-button-1'),
      screen.getByTestId('delete-button-2'),
      screen.getByTestId('delete-button-3')
    ];
    
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Check no todos message appears
    expect(screen.getByTestId('no-todos')).toBeInTheDocument();
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    expect(screen.getByTestId('total-todos')).toHaveTextContent('0');
  });

  test('updates statistics correctly', async () => {
    const user = userEvent.setup();
    
    // Initial stats
    expect(screen.getByTestId('total-todos')).toHaveTextContent('3');
    expect(screen.getByTestId('active-todos')).toHaveTextContent('2');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('1');
    
    // Add a new todo
    const input = screen.getByTestId('todo-input');
    await user.type(input, 'New Todo{Enter}');
    
    // Stats should update
    expect(screen.getByTestId('total-todos')).toHaveTextContent('4');
    expect(screen.getByTestId('active-todos')).toHaveTextContent('3');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('1');
    
    // Toggle a todo to complete
    const todoCheckbox = screen.getByTestId('todo-checkbox-1');
    await user.click(todoCheckbox);
    
    // Stats should update
    expect(screen.getByTestId('total-todos')).toHaveTextContent('4');
    expect(screen.getByTestId('active-todos')).toHaveTextContent('2');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('2');
    
    // Delete a todo
    const deleteButton = screen.getByTestId('delete-button-1');
    await user.click(deleteButton);
    
    // Stats should update
    expect(screen.getByTestId('total-todos')).toHaveTextContent('3');
    expect(screen.getByTestId('active-todos')).toHaveTextContent('2');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('1');
  });

  test('toggles all todos and clears completed', async () => {
    const user = userEvent.setup();
    
    // Get all todo checkboxes
    const checkboxes = [
      screen.getByTestId('todo-checkbox-1'),
      screen.getByTestId('todo-checkbox-2'),
      screen.getByTestId('todo-checkbox-3')
    ];
    
    // Toggle all to completed
    for (const checkbox of checkboxes) {
      await user.click(checkbox);
    }
    
    // Check all are completed
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('3');
    expect(screen.getByTestId('active-todos')).toHaveTextContent('0');
    
    // Toggle all back to active
    for (const checkbox of checkboxes) {
      await user.click(checkbox);
    }
    
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('0');
    expect(screen.getByTestId('active-todos')).toHaveTextContent('3');
  });

  test('handles multiple operations in sequence', async () => {
    const user = userEvent.setup();
    
    const input = screen.getByTestId('todo-input');
    
    // Add multiple todos
    await user.type(input, 'First Todo{Enter}');
    await user.type(input, 'Second Todo{Enter}');
    await user.type(input, 'Third Todo{Enter}');
    
    // Verify all were added
    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    expect(screen.getByText('Third Todo')).toBeInTheDocument();
    expect(screen.getByTestId('total-todos')).toHaveTextContent('6');
    
    // Toggle some
    const newTodoCheckboxes = [
      screen.getByTestId('todo-checkbox-1').closest('li')?.textContent?.includes('First Todo') ? screen.getByTestId('todo-checkbox-1') : null,
      screen.getByTestId('todo-checkbox-2').closest('li')?.textContent?.includes('Second Todo') ? screen.getByTestId('todo-checkbox-2') : null
    ].filter(Boolean);
    
    for (const checkbox of newTodoCheckboxes) {
      if (checkbox) await user.click(checkbox);
    }
    
    // Delete some
    const deleteButtons = screen.getAllByText('Delete').slice(0, 2);
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Verify final state
    expect(screen.getByTestId('total-todos')).toHaveTextContent('4');
  });
});