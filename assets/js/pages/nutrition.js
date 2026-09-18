import { setupPageToc } from '../page-toc.js';

/* ==========================================================================
   Small steps planner
   ========================================================================== */

const HABITS = [
  { id: 'veggie', icon: '🥦', short: 'Veggie at a meal', title: 'Add a vegetable to one meal', detail: 'Toss spinach into eggs or add a side salad at dinner.' },
  { id: 'grain', icon: '🌾', short: 'Whole-grain swap', title: 'Try one whole-grain swap', detail: 'Brown rice, oats, or whole-grain bread instead of refined versions.' },
  { id: 'breakfast', icon: '🥚', short: 'Protein at breakfast', title: 'Add protein to breakfast', detail: 'Eggs, Greek yogurt, or tofu to start the day.' },
  { id: 'fruit', icon: '🍎', short: 'Fruit on hand', title: 'Keep whole fruit within reach', detail: 'An apple or orange in your bag instead of a packaged snack.' },
  { id: 'beans', icon: '🫘', short: 'Beans this week', title: 'Eat beans or lentils once this week', detail: 'Add chickpeas to a salad or lentils to a soup.' },
  { id: 'pair', icon: '🥜', short: 'Paired snack', title: 'Pair a snack carb', detail: 'Apple with peanut butter, or crackers with cheese.' },
  { id: 'regular', icon: '⏰', short: 'Regular meals', title: 'Eat at regular times', detail: 'Aim for meals at roughly the same times most days.' },
  { id: 'water', icon: '💧', short: 'Water nearby', title: 'Keep water nearby', detail: 'A water bottle on your desk makes it easy to sip all day.' },
];

const HABIT_STORAGE_KEY = 'nurtre:habits';

function readStoredHabits() {
  try {
    return JSON.parse(localStorage.getItem(HABIT_STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function storeHabits(ids) {
  try {
    localStorage.setItem(HABIT_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable (private mode, blocked site data): the planner still works for this visit.
  }
}

function habitMessage(total) {
  if (total === 0) return 'Tap a habit to add it to your week.';
  if (total === 1) return 'One small step is a great place to start.';
  if (total <= 3) return 'A realistic, doable week. Nice.';
  return 'That’s a lot at once. Try starting with two or three, then add more once they feel easy.';
}

function setupHabitPlanner() {
  const list = document.querySelector('[data-habit-list]');
  if (!list) return;

  const count = document.querySelector('[data-habit-count]');
  const message = document.querySelector('[data-habit-message]');
  const pickedList = document.querySelector('[data-habit-picked]');
  const ring = document.querySelector('[data-habit-ring]');
  const clear = document.querySelector('[data-habit-clear]');

  const validIds = new Set(HABITS.map((habit) => habit.id));
  const picked = new Set(readStoredHabits().filter((id) => validIds.has(id)));

  list.innerHTML = HABITS.map(
    (habit) => `
      <li>
        <button class="habit" type="button" data-habit="${habit.id}" aria-pressed="false">
          <span class="habit__icon" aria-hidden="true">${habit.icon}</span>
          <span class="habit__body">
            <span class="habit__title">${habit.title}</span>
            <span class="habit__detail">${habit.detail}</span>
          </span>
          <span class="habit__check" aria-hidden="true"></span>
        </button>
      </li>`,
  ).join('');

  const render = () => {
    const total = picked.size;
    list.querySelectorAll('[data-habit]').forEach((button) => {
      button.setAttribute('aria-pressed', String(picked.has(button.dataset.habit)));
    });
    count.textContent = total;
    ring.style.strokeDashoffset = String(100 - (Math.min(total, 3) / 3) * 100);
    message.textContent = habitMessage(total);
    pickedList.innerHTML = HABITS.filter((habit) => picked.has(habit.id))
      .map((habit) => `<li class="planner__pill"><span aria-hidden="true">${habit.icon}</span>${habit.short}</li>`)
      .join('');
    clear.hidden = total === 0;
    storeHabits([...picked]);
  };

  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-habit]');
    if (!button) return;
    const { habit } = button.dataset;
    if (picked.has(habit)) picked.delete(habit);
    else picked.add(habit);
    render();
  });

  clear.addEventListener('click', () => {
    picked.clear();
    render();
  });

  render();
}

/* ==========================================================================
   Myth flip cards
   ========================================================================== */

function setupMyths() {
  document.querySelectorAll('[data-myth]').forEach((card) => {
    card.addEventListener('click', () => {
      card.setAttribute('aria-pressed', String(card.getAttribute('aria-pressed') !== 'true'));
    });
  });
}

setupPageToc();
setupHabitPlanner();
setupMyths();
