import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

// Mock todos data
const mockTodos = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Build a Todo App', completed: false },
  { id: 3, text: 'Write Tests', completed: false }
];

describe('TodoList Component', () => {
  test('renders initial todos correctly', () => {
    render(<TodoList />);
    
    // Check if the component renders
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    
    // Check initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check stats are displayed correctly
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Total: 3');
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Completed: 1');
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Pending: 2');
    
    // Check sections are rendered
    expect(screen.getByText('Pending Tasks (2)')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks (1)')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Get input and button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a new todo
    await user.type(input, 'New Test Todo');
    await user.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check stats updated
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Total: 4');
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Pending: 3');
    
    // Check input is cleared
    expect(input).toHaveValue('');
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
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Completed: 2');
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Pending: 1');
    
    // Toggle back
    await user.click(checkbox);
    expect(todoItem).toHaveAttribute('data-completed', 'false');
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Check initial count
    const initialTodos = screen.getAllByTestId(/^todo-item-/);
    expect(initialTodos).toHaveLength(3);
    
    // Find and click delete button for the first todo
    const firstTodo = screen.getByTestId('todo-item-1');
    const deleteButton = within(firstTodo).getByTestId(/^delete-button-/);
    
    await user.click(deleteButton);
    
    // Check todo is deleted
    const remainingTodos = screen.getAllByTestId(/^todo-item-/);
    expect(remainingTodos).toHaveLength(2);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check stats updated
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Total: 2');
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Completed: 0');
  });

  test('shows empty state when all todos are deleted', async () => {
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
    
    // Check stats show 0
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Total: 0');
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
    
    // Check todo was not added
    expect(screen.getAllByTestId(/^todo-item-/)).toHaveLength(3);
  });

  test('clears error when user starts typing', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Trigger error by submitting empty form
    await user.click(addButton);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    
    // Start typing
    await user.type(input, 'New todo');
    
    // Error should be cleared
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  test('trims whitespace from todo text', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add todo with whitespace
    await user.type(input, '  Todo with spaces  ');
    await user.click(addButton);
    
    // Check todo was added without extra whitespace
    expect(screen.getByText('Todo with spaces')).toBeInTheDocument();
  });

  test('toggles todo by clicking text', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find todo text and click it
    const todoText = screen.getByText('Build a Todo App');
    const todoItem = todoText.closest('[data-testid^="todo-item-"]');
    
    // Click the todo text
    await user.click(todoText);
    
    // Should be toggled
    expect(todoItem).toHaveAttribute('data-completed', 'true');
  });

  test('updates sections when todos are toggled', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Initially should have 2 pending and 1 completed
    expect(screen.getByText('Pending Tasks (2)')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks (1)')).toBeInTheDocument();
    
    // Toggle a pending todo to completed
    const pendingTodoText = screen.getByText('Build a Todo App');
    await user.click(pendingTodoText);
    
    // Sections should update
    expect(screen.getByText('Pending Tasks (1)')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks (2)')).toBeInTheDocument();
  });

  test('handles rapid multiple adds', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add multiple todos quickly
    await user.type(input, 'Todo 1');
    await user.click(addButton);
    
    await user.type(input, 'Todo 2');
    await user.click(addButton);
    
    await user.type(input, 'Todo 3');
    await user.click(addButton);
    
    // Check all were added
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
    
    // Check stats
    expect(screen.getByTestId('todo-stats')).toHaveTextContent('Total: 6');
  });
});

describe('TodoList Integration Tests', () => {
  test('full todo workflow', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // 1. Add a new todo
    await user.type(screen.getByTestId('todo-input'), 'Complete testing');
    await user.click(screen.getByTestId('add-button'));
    
    // 2. Verify it was added
    const newTodo = screen.getByText('Complete testing');
    expect(newTodo).toBeInTheDocument();
    
    // 3. Toggle it to completed
    await user.click(newTodo);
    const todoItem = newTodo.closest('[data-testid^="todo-item-"]');
    expect(todoItem).toHaveAttribute('data-completed', 'true');
    
    // 4. Delete it
    const deleteButton = within(todoItem).getByTestId(/^delete-button-/);
    await user.click(deleteButton);
    
    // 5. Verify it was deleted
    expect(screen.queryByText('Complete testing')).not.toBeInTheDocument();
  });
});