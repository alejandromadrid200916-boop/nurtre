// Whole foods explorer: filter chips, food tiles, and a detail card with macro bars.
// Not used on any page. The Foods page uses an open list instead; kept in case a tile view is wanted.
// Markup: [data-food-filters], [data-food-grid], [data-food-detail]. Styles: assets/css/widgets/food-widgets.css

import { FOODS, FOOD_CATEGORIES } from '../data/foods.js';

const isMobile = () => matchMedia('(max-width: 63.99rem)').matches;
const scrollBehavior = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

const MACROS = [
  ['protein', 'Protein'],
  ['carbs', 'Carbs'],
  ['fat', 'Fat'],
];
const MACRO_SCALE_MAX = 45; // grams that fill a bar

function formatGrams(value, label) {
  if (label) return label;
  if (value === 0) return '0 g';
  if (value < 1) return '<1 g';
  return `~${value} g`;
}

export function setupFoodExplorer() {
  const filters = document.querySelector('[data-food-filters]');
  const grid = document.querySelector('[data-food-grid]');
  const detail = document.querySelector('[data-food-detail]');
  if (!filters || !grid || !detail) return;

  const categories = Object.fromEntries(FOOD_CATEGORIES.map((category) => [category.id, category]));
  let activeCategory = 'all';
  let selectedId = FOODS[0].id;

  filters.innerHTML = [{ id: 'all', label: 'All foods', icon: '✨' }, ...FOOD_CATEGORIES]
    .map(
      (category) => `
        <button class="chip" type="button" data-category="${category.id}" aria-pressed="${category.id === 'all'}">
          <span class="chip__emoji" aria-hidden="true">${category.icon}</span>${category.label}
        </button>`,
    )
    .join('');

  grid.innerHTML = FOODS.map(
    (food) => `
      <li data-category="${food.category}">
        <button class="food-tile" type="button" data-food="${food.id}" data-tone="${categories[food.category].tone}" aria-pressed="false">
          <span class="food-tile__emoji" aria-hidden="true">${food.emoji}</span>
          <span class="food-tile__name">${food.name}</span>
        </button>
      </li>`,
  ).join('');

  const select = (id) => {
    selectedId = id;
    const food = FOODS.find((item) => item.id === id);
    const category = categories[food.category];

    grid.querySelectorAll('[data-food]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.food === id));
    });

    detail.innerHTML = `
      <div class="food-detail__head">
        <span class="food-detail__emoji" data-tone="${category.tone}" aria-hidden="true">${food.emoji}</span>
        <div>
          <p class="eyebrow">${category.label}</p>
          <h3>${food.name}</h3>
          <p class="food-detail__serving">${food.serving}</p>
        </div>
      </div>
      <div class="macros">
        ${MACROS.map(([key, label]) => {
          const value = food[key];
          const width = value == null ? 0 : Math.min(100, (value / MACRO_SCALE_MAX) * 100);
          return `
            <div class="macro">
              <div class="macro__label"><span>${label}</span><span>${formatGrams(value, food.labels?.[key])}</span></div>
              <div class="macro__bar"><span class="macro__fill macro__fill--${key}" data-width="${width}%"></span></div>
            </div>`;
        }).join('')}
      </div>
      <div class="food-detail__section">
        <p class="food-detail__subhead">Key nutrients</p>
        <ul class="nutrient-list" role="list">
          ${food.nutrients.map((nutrient) => `<li class="nutrient">${nutrient}</li>`).join('')}
        </ul>
      </div>
      <p class="food-detail__note">${food.note}</p>`;

    // Let the bars render at 0 first so the width change animates.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        detail.querySelectorAll('[data-width]').forEach((bar) => bar.style.setProperty('--w', bar.dataset.width));
      }),
    );
  };

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;

    filters.querySelectorAll('[data-category]').forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.dataset.category === activeCategory));
    });
    grid.querySelectorAll('li').forEach((item) => {
      item.hidden = activeCategory !== 'all' && item.dataset.category !== activeCategory;
    });

    const selected = FOODS.find((food) => food.id === selectedId);
    if (activeCategory !== 'all' && selected.category !== activeCategory) {
      select(FOODS.find((food) => food.category === activeCategory).id);
    }
  });

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-food]');
    if (!button) return;
    select(button.dataset.food);
    if (isMobile()) detail.scrollIntoView({ block: 'nearest', behavior: scrollBehavior() });
  });

  select(selectedId);
}
