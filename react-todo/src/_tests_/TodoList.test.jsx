import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos correctly', () => {
    render(<TodoList />);
    
    // Check if the component renders
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    
    // Check initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check stats
    expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Pending: 2/)).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find input and add button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a new todo
    await user.type(input, 'New Test Todo');
    await user.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check stats updated
    expect(screen.getByText(/Total: 4/)).toBeInTheDocument();
  });

  test('shows error when trying to add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const addButton = screen.getByTestId('add-button');
    
    // Try to add empty todo
    await user.click(addButton);
    
    // Check error message
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Todo text is required')).toBeInTheDocument();
  });

  test('toggles todo completion', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find a todo that's not completed initially
    const todoText = screen.getByText('Build a Todo App');
    const todoItem = todoText.closest('[data-testid^="todo-item-"]');
    const checkbox = within(todoItem).getByTestId(/^checkbox-/);
    
    // Initially should not be completed
    expect(todoItem).not.toHaveAttribute('data-completed', 'true');
    
    // Toggle the todo
    await user.click(checkbox);
    
    // Should now be completed
    expect(todoItem).toHaveAttribute('data-completed', 'true');
    expect(todoText).toHaveClass('completed-text');
    
    // Check stats updated
    expect(screen.getByText(/Completed: 2/)).toBeInTheDocument();
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Check initial count
    expect(screen.getAllByTestId(/^todo-item-/)).toHaveLength(3);
    
    // Find and click delete button for the first todo
    const firstTodo = screen.getAllByTestId(/^todo-item-/)[0];
    const deleteButton = within(firstTodo).getByTestId(/^delete-button-/);
    
    await user.click(deleteButton);
    
    // Check todo is deleted
    expect(screen.getAllByTestId(/^todo-item-/)).toHaveLength(2);
    
    // Check stats updated
    expect(screen.getByText(/Total: 2/)).toBeInTheDocument();
  });

  test('shows empty state when no todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByTestId(/^delete-button-/);
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Check empty state is shown
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });

  test('validates todo text length', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Try to add todo with more than 100 characters
    const longText = 'a'.repeat(101);
    await user.type(input, longText);
    await user.click(addButton);
    
    // Check error message
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Todo text must be less than 100 characters')).toBeInTheDocument();
  });

  test('clears error when user starts typing', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Trigger error
    await user.click(addButton);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    
    // Start typing
    await user.type(input, 'New todo');
    
    // Error should be cleared
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});