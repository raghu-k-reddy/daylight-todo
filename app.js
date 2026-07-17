const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const count = document.querySelector('#task-count');
const empty = document.querySelector('#empty-state');
const clear = document.querySelector('#clear-completed');
const filters = document.querySelectorAll('.filter');
let filter = 'all';
let todos = JSON.parse(localStorage.getItem('daylight-todos') || '[]');

document.querySelector('#date-label').textContent = new Intl.DateTimeFormat('en-US', { weekday:'long', month:'short', day:'numeric' }).format(new Date());
const save = () => localStorage.setItem('daylight-todos', JSON.stringify(todos));
function render() {
  const visible = todos.filter(t => filter === 'all' || filter === 'done' ? (filter === 'all' || t.done) : !t.done);
  list.innerHTML = visible.map(t => `<li class="todo ${t.done ? 'done' : ''}"><button class="check" data-action="toggle" data-id="${t.id}" aria-label="Mark ${t.done ? 'incomplete' : 'complete'}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button><span class="task-text">${escapeHtml(t.text)}</span><button class="delete" data-action="delete" data-id="${t.id}" aria-label="Delete task">×</button></li>`).join('');
  const open = todos.filter(t => !t.done).length;
  count.textContent = `${open} ${open === 1 ? 'task' : 'tasks'} left`;
  empty.hidden = visible.length > 0;
  clear.hidden = !todos.some(t => t.done);
}
function escapeHtml(text) { const node = document.createElement('div'); node.textContent = text; return node.innerHTML; }
form.addEventListener('submit', e => { e.preventDefault(); const text = input.value.trim(); if (!text) return; todos.unshift({ id: crypto.randomUUID(), text, done:false }); save(); input.value = ''; render(); });
list.addEventListener('click', e => { const button = e.target.closest('button'); if (!button) return; const id = button.dataset.id; if (button.dataset.action === 'toggle') todos = todos.map(t => t.id === id ? {...t, done:!t.done} : t); if (button.dataset.action === 'delete') todos = todos.filter(t => t.id !== id); save(); render(); });
filters.forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; filters.forEach(b => b.classList.toggle('active', b === button)); render(); }));
clear.addEventListener('click', () => { todos = todos.filter(t => !t.done); save(); render(); });
render();
