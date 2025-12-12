// ---------------- src/_tests_/TodoList.test.jsx ----------------
// initial items as in component state
expect(screen.getByText(/Buy milk/i)).toBeInTheDocument();
expect(screen.getByText(/Walk the dog/i)).toBeInTheDocument();
expect(screen.getByText(/Read a book/i)).toBeInTheDocument();;


test('adds a new todo', async () => {
render(<TodoList />);
const input = screen.getByRole('textbox', { name: /new-todo-input/i });
const addButton = screen.getByRole('button', { name: /add/i });


await userEvent.type(input, 'New task');
fireEvent.click(addButton);


expect(screen.getByText(/New task/i)).toBeInTheDocument();
});


test('toggles a todo completed state', async () => {
render(<TodoList />);
const todoText = screen.getByText(/Buy milk/i);
// Initially not completed
expect(todoText).toHaveStyle('text-decoration: none');


// Click to toggle
fireEvent.click(todoText);
expect(todoText).toHaveStyle('text-decoration: line-through');


// Click again to toggle off
fireEvent.click(todoText);
expect(todoText).toHaveStyle('text-decoration: none');
});


test('deletes a todo', () => {
render(<TodoList />);
const deleteButton = screen.getByRole('button', { name: /delete-1/i }); // delete for id=1
expect(screen.getByText(/Buy milk/i)).toBeInTheDocument();
fireEvent.click(deleteButton);
expect(screen.queryByText(/Buy milk/i)).not.toBeInTheDocument();
});