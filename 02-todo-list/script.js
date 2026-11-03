const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filters = document.querySelector('.filters');
const emptyMessage = document.getElementById('empty-message');

// Saved on every change so a refresh keeps your list.
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filter = 'all';

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function visibleTodos() {
  if (filter === 'active') return todos.filter((todo) => !todo.done);
  if (filter === 'done') return todos.filter((todo) => todo.done);
  return todos;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function render() {
  const visible = visibleTodos();
  emptyMessage.style.display = visible.length ? 'none' : 'block';

  list.innerHTML = visible.map((todo) => `
    <li class="${todo.done ? 'done' : ''}" data-id="${todo.id}">
      <input type="checkbox" ${todo.done ? 'checked' : ''}>
      <span>${escapeHtml(todo.text)}</span>
      <button class="delete" aria-label="Delete task">&times;</button>
    </li>
  `).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text, done: false });
  input.value = '';
  save();
  render();
});

// One listener handles every checkbox and delete button, including
// items added later, because clicks bubble up to the list.
list.addEventListener('click', (event) => {
  const item = event.target.closest('li');
  if (!item) return;
  const todo = todos.find((t) => t.id === Number(item.dataset.id));
  if (!todo) return;

  if (event.target.matches('input[type="checkbox"]')) {
    todo.done = event.target.checked;
  } else if (event.target.matches('.delete')) {
    todos = todos.filter((t) => t.id !== todo.id);
  } else {
    return;
  }

  save();
  render();
});

filters.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  filter = button.dataset.filter;
  filters.querySelectorAll('button').forEach((b) => {
    b.classList.toggle('active', b === button);
  });
  render();
});

render();
