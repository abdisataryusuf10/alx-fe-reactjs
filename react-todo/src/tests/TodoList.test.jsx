import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import TodoItem from '../components/TodoItem';

// Mock data for testing
const mockTodo = {
  id: 1,
  text: 'Test Todo Item',
  completed: false,
  createdAt: '2024-01-01T00:00:00.000Z'
};

const mockToggle = jest.fn();
const mockDelete = jest.fn();
const mockEdit = jest.fn();
const mockAddTodo = jest.fn();

describe('TodoList Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<TodoList />);
    expect(screen.getByText(/loading todos/i)).toBeInTheDocument();
  });

  test('renders todo list after loading', async () => {
    render(<TodoList />);
    
    // Fast-forward timers
    jest.advanceTimersByTime(500);
    
    await waitFor(() => {
      expect(screen.getByText(/react todo list/i)).toBeInTheDocument();
    });
    
    // Check for sample todos
    expect(screen.getByText(/learn react testing library/i)).toBeInTheDocument();
    expect(screen.getByText(/implement jest tests/i)).toBeInTheDocument();
  });

  test('displays correct todo statistics', async () => {
    render(<TodoList />);
    jest.advanceTimersByTime(500);
    
    await waitFor(() => {
      // Check stats display
      expect(screen.getByText(/total:/i)).toBeInTheDocument();
      expect(screen.getByText(/active:/i)).toBeInTheDocument();
      expect(screen.getByText(/completed:/i)).toBeInTheDocument();
    });
  });

  test('filters todos correctly', async () => {
    render(<TodoList />);
    jest.advanceTimersByTime(500);
    
    await waitFor(() => {
      const allButton = screen.getByText(/all \(\d+\)/i);
      const activeButton = screen.getByText(/active \(\d+\)/i);
      const completedButton = screen.getByText(/completed \(\d+\)/i);
      
      // Test all filter (default)
      expect(allButton).toHaveClass('active');
      
      // Test active filter
      fireEvent.click(activeButton);
      expect(activeButton).toHaveClass('active');
      
      // Test completed filter
      fireEvent.click(completedButton);
      expect(completedButton).toHaveClass('active');
    });
  });

  test('clears completed todos', async () => {
    render(<TodoList />);
    jest.advanceTimersByTime(500);
    
    await waitFor(() => {
      const clearButton = screen.getByText(/clear completed/i);
      
      // Initially should have completed todos
      expect(screen.getByText(/learn react testing library/i)).toBeInTheDocument();
      
      // Click clear completed
      fireEvent.click(clearButton);
      
      // Check completed todos are removed
      expect(screen.queryByText(/learn react testing library/i)).not.toBeInTheDocument();
      expect(screen.getByText(/implement jest tests/i)).toBeInTheDocument();
    });
  });
});

describe('AddTodoForm Component', () => {
  test('renders form elements correctly', () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/what needs to be done\?/i)).toBeInTheDocument();
  });

  test('validates empty input', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Try to add empty todo
    await user.click(addButton);
    
    expect(screen.getByTestId('error-message')).toHaveTextContent(/cannot be empty/i);
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  test('validates minimum length', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Enter too short text
    await user.type(input, 'ab');
    await user.click(addButton);
    
    expect(screen.getByTestId('error-message')).toHaveTextContent(/at least 3 characters/i);
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  test('adds valid todo', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Enter valid todo
    await user.type(input, 'New Test Todo');
    await user.click(addButton);
    
    expect(mockAddTodo).toHaveBeenCalledWith('New Test Todo');
    expect(input).toHaveValue('');
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  test('adds todo on Enter key press', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByTestId('todo-input');
    
    // Type and press Enter
    await user.type(input, 'New Todo{enter}');
    
    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
  });

  test('clears error when typing', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Trigger error
    await user.click(addButton);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    
    // Start typing to clear error
    await user.type(input, 'New text');
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});

describe('TodoItem Component', () => {
  test('renders todo item correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );
    
    expect(screen.getByTestId(`todo-item-${mockTodo.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`todo-text-${mockTodo.id}`)).toHaveTextContent(mockTodo.text);
    expect(screen.getByTestId(`todo-checkbox-${mockTodo.id}`)).not.toBeChecked();
  });

  test('toggles todo completion', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );
    
    const checkbox = screen.getByTestId(`todo-checkbox-${mockTodo.id}`);
    
    // Toggle checkbox
    await user.click(checkbox);
    
    expect(mockToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  test('deletes todo', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );
    
    const deleteButton = screen.getByTestId(`delete-button-${mockTodo.id}`);
    
    // Click delete button
    await user.click(deleteButton);
    
    expect(mockDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  test('enters edit mode', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );
    
    const editButton = screen.getByTestId(`edit-button-${mockTodo.id}`);
    
    // Click edit button
    await user.click(editButton);
    
    expect(screen.getByTestId(`edit-input-${mockTodo.id}`)).toBeInTheDocument();
  });

  test('saves edited todo', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );
    
    // Enter edit mode
    await user.click(screen.getByTestId(`edit-button-${mockTodo.id}`));
    
    const editInput = screen.getByTestId(`edit-input-${mockTodo.id}`);
    
    // Edit text and save
    await user.clear(editInput);
    await user.type(editInput, 'Edited Todo Text');
    await user.tab(); // Blur to save
    
    expect(mockEdit).toHaveBeenCalledWith(mockTodo.id, 'Edited Todo Text');
  });

  test('cancels edit on Escape key', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );
    
    // Enter edit mode
    await user.click(screen.getByTestId(`edit-button-${mockTodo.id}`));
    
    const editInput = screen.getByTestId(`edit-input-${mockTodo.id}`);
    
    // Type something and press Escape
    await user.type(editInput, 'New Text{Escape}');
    
    expect(mockEdit).not.toHaveBeenCalled();
    expect(screen.getByTestId(`todo-text-${mockTodo.id}`)).toHaveTextContent(mockTodo.text);
  });

  test('saves edit on Enter key', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );
    
    // Enter edit mode
    await user.click(screen.getByTestId(`edit-button-${mockTodo.id}`));
    
    const editInput = screen.getByTestId(`edit-input-${mockTodo.id}`);
    
    // Edit and press Enter
    await user.clear(editInput);
    await user.type(editInput, 'Edited Text{enter}');
    
    expect(mockEdit).toHaveBeenCalledWith(mockTodo.id, 'Edited Text');
  });

  test('displays completed todo correctly', () => {
    const completedTodo = { ...mockTodo, completed: true };
    
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );
    
    const todoItem = screen.getByTestId(`todo-item-${completedTodo.id}`);
    const checkbox = screen.getByTestId(`todo-checkbox-${completedTodo.id}`);
    
    expect(todoItem).toHaveClass('completed');
    expect(checkbox).toBeChecked();
    expect(todoItem).toHaveAttribute('data-completed', 'true');
  });

  test('displays creation date', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );
    
    expect(screen.getByText(/january/i)).toBeInTheDocument();
  });
});

describe('Integration Tests', () => {
  test('full todo flow', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Wait for initial load
    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(screen.getByText(/implement jest tests/i)).toBeInTheDocument();
    });
    
    // Add a new todo
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    await user.type(input, 'Integration Test Todo');
    await user.click(addButton);
    
    // Verify new todo appears
    await waitFor(() => {
      expect(screen.getByText(/integration test todo/i)).toBeInTheDocument();
    });
    
    // Toggle the new todo
    const newTodoCheckbox = screen.getAllByRole('checkbox').find(checkbox => 
      checkbox.closest('[data-testid*="todo-item"]')?.textContent?.includes('Integration Test Todo')
    );
    
    if (newTodoCheckbox) {
      await user.click(newTodoCheckbox);
    }
    
    // Filter to see completed todos
    const completedFilter = screen.getByText(/completed \(\d+\)/i);
    await user.click(completedFilter);
    
    // Verify our todo appears in completed filter
    await waitFor(() => {
      expect(screen.getByText(/integration test todo/i)).toBeInTheDocument();
    });
    
    // Clear completed todos
    const clearButton = screen.getByText(/clear completed/i);
    await user.click(clearButton);
    
    // Verify todo is removed
    await waitFor(() => {
      expect(screen.queryByText(/integration test todo/i)).not.toBeInTheDocument();
    });
  });

  test('edit todo integration', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Wait for initial load
    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(screen.getByText(/implement jest tests/i)).toBeInTheDocument();
    });
    
    // Find and edit a todo
    const todoText = screen.getByText(/implement jest tests/i);
    await user.dblClick(todoText); // Double-click to edit
    
    // Wait for edit input to appear
    await waitFor(() => {
      expect(screen.getByDisplayValue(/implement jest tests/i)).toBeInTheDocument();
    });
    
    // Edit the todo
    const editInput = screen.getByDisplayValue(/implement jest tests/i);
    await user.clear(editInput);
    await user.type(editInput, 'Updated Todo Text{enter}');
    
    // Verify edit
    await waitFor(() => {
      expect(screen.getByText(/updated todo text/i)).toBeInTheDocument();
      expect(screen.queryByText(/implement jest tests/i)).not.toBeInTheDocument();
    });
  });
});