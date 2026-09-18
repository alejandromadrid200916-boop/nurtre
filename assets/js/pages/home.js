// Search box (visual only for now) and example questions.

const form = document.querySelector('[data-search]');
const input = form.querySelector('input');
const status = form.querySelector('[data-search-status]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = input.value.trim()
    ? 'Answers are coming soon. In the meantime, the sections below are on the way.'
    : 'Type a question to get started.';
});

document.querySelectorAll('[data-example]').forEach((button) => {
  button.addEventListener('click', () => {
    input.value = button.textContent.trim();
    status.textContent = '';
    input.focus();
  });
});
