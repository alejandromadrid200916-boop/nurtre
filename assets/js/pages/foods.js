import { FOODS, FOOD_CATEGORIES, GOOD_FIBER_GRAMS } from '../data/foods.js';
import { EVIDENCE } from '../data/supplements.js';
import { setupPageToc } from '../page-toc.js';
import { setupWholeVsProcessed } from '../widgets/whole-vs-processed.js';

const GROUP_TEXT = {
  protein: 'Fish, eggs, poultry, and lean meats. Protein helps make meals satisfying. For plant protein, see beans & legumes and dairy alternatives.',
  vegetables: 'Fresh, frozen, and canned without added salt all count. Try to include some at most meals.',
  fruits: 'Whole fruit brings fiber along with its natural sugar, so there’s no need to avoid it.',
  grains: 'Fiber-rich carbohydrates. Pairing them with protein, fat, or more fiber helps make meals balanced.',
  legumes: 'The best of both: plant protein and lots of fiber in the same food.',
  dairy: 'Plain versions avoid added sugar. Plant milks vary a lot, so check the protein and fortification.',
  nuts: 'Small portions add healthy fats, protein, fiber, and minerals.',
  fats: 'Mostly unsaturated fats to use in place of butter and other saturated fats.',
  herbs: 'Used in small amounts, so they add flavor more than nutrition. That makes it easier to cook with less salt and sugar.',
};

const MACROS = [
  ['protein', 'Protein'],
  ['carbs', 'Carbs'],
  ['fat', 'Fat'],
  ['fiber', 'Fiber'],
];
const MACRO_SCALE_MAX = 45; // grams that fill a bar
const PREVIEW_COUNT = 4; // foods shown per group until "Show all" is pressed

const categories = Object.fromEntries(FOOD_CATEGORIES.map((category) => [category.id, category]));

const isGoodFiber = (food) => food.category !== 'herbs' && food.fiber >= GOOD_FIBER_GRAMS;

function formatGrams(value, label) {
  if (label) return label;
  if (value === 0) return '0 g';
  if (value < 1) return '<1 g';
  return `${value} g`;
}

/* ==========================================================================
   Food guide: an open list grouped by food group, rows expand in place
   ========================================================================== */

function macroBars(food) {
  return `
    <div class="macros">
      ${MACROS.map(([key, label]) => {
        const value = food[key];
        const width = value == null ? 0 : Math.min(100, (value / MACRO_SCALE_MAX) * 100);
        return `
          <div class="macro">
            <span class="macro__label">${label}</span>
            <span class="macro__bar"><span class="macro__fill macro__fill--${key}" style="width: ${width}%"></span></span>
            <span class="macro__value">${formatGrams(value, food.labels?.[key])}</span>
          </div>`;
      }).join('')}
    </div>`;
}

function rowMarkup(food) {
  const bodyId = `food-body-${food.id}`;
  const isHerb = food.category === 'herbs';
  let meta = '';
  if (food.evidence) {
    meta = `<span class="evidence-tag evidence-tag--${food.evidence}">${EVIDENCE[food.evidence]}</span>`;
  } else if (!isHerb) {
    const good = isGoodFiber(food);
    const fiberText = food.fiber == null ? 'Fiber not listed' : `${formatGrams(food.fiber)} fiber`;
    meta = `
      <span class="food-stat food-stat--protein">${formatGrams(food.protein)} protein</span>
      ${food.fiber === 0 ? '' : `<span class="food-stat${good ? ' food-stat--fiber' : ''}">${good ? '<span aria-hidden="true">🌾</span>' : ''}${fiberText}</span>`}`;
  }

  return `
    <li class="list-row" data-category="${food.category}">
      <button class="list-row__toggle" type="button" aria-expanded="false" aria-controls="${bodyId}" data-food="${food.id}">
        <span class="list-row__emoji" aria-hidden="true">${food.emoji}</span>
        <span class="list-row__main">
          <span class="list-row__name">${food.name}</span>
          <span class="list-row__summary">${food.summary}</span>
        </span>
        <span class="list-row__meta">${meta}</span>
        <span class="list-row__chevron" aria-hidden="true"></span>
      </button>
      <div class="list-row__body" id="${bodyId}" hidden>
        <div class="list-row__detail">
          <p class="list-row__label">Per serving <span class="food-serving">${food.serving}</span></p>
          ${isHerb ? '<p>Too small an amount to add meaningful protein, carbs, fat, or fiber.</p>' : macroBars(food)}
        </div>
        <div class="list-row__detail">
          <p class="list-row__label">Good to know</p>
          <p>${food.note}</p>
          ${
            food.nutrients.length
              ? `<p class="food-nutrients"><span class="food-nutrients__title">Good source of:</span> ${food.nutrients.join(', ')}</p>`
              : ''
          }
        </div>
        <div class="list-row__detail">
          <p class="list-row__label"><span aria-hidden="true">🍽️</span> Try it</p>
          <p>${food.tip}</p>
          ${food.dataNote ? `<p class="food-data-note">${food.dataNote}</p>` : ''}
        </div>
      </div>
    </li>`;
}

function setupFoodGuide() {
  const groupsEl = document.querySelector('[data-food-groups]');
  if (!groupsEl) return;

  const filtersEl = document.querySelector('[data-food-filters]');
  const searchEl = document.querySelector('[data-food-search]');
  const countEl = document.querySelector('[data-food-count]');
  const emptyEl = document.querySelector('[data-food-empty]');
  const fiberToggle = document.querySelector('[data-fiber-toggle]');

  let activeCategory = 'all';
  let fiberOnly = false;
  const openGroups = new Set();

  filtersEl.innerHTML = [{ id: 'all', label: 'All foods', icon: '✨' }, ...FOOD_CATEGORIES]
    .map(
      (category) => `
        <button class="chip" type="button" data-filter="${category.id}" aria-pressed="${category.id === 'all'}">
          <span class="chip__emoji" aria-hidden="true">${category.icon}</span>${category.label}
        </button>`,
    )
    .join('');

  groupsEl.innerHTML = FOOD_CATEGORIES.map(
    (category) => `
      <section class="list-group" data-section="${category.id}" data-tone="${category.tone}" aria-labelledby="food-group-${category.id}">
        <div class="list-group__head">
          <h3 id="food-group-${category.id}"><span aria-hidden="true">${category.icon}</span> ${category.label}</h3>
          <p>${GROUP_TEXT[category.id]}</p>
        </div>
        <ul class="open-list" role="list">
          ${FOODS.filter((food) => food.category === category.id).map(rowMarkup).join('')}
        </ul>
        <button class="list-group__more" type="button" aria-expanded="false" data-more="${category.id}" hidden></button>
      </section>`,
  ).join('');

  const searchText = Object.fromEntries(
    FOODS.map((food) => [
      food.id,
      [food.name, food.summary, food.note, food.tip, categories[food.category].label, ...food.nutrients].join(' ').toLowerCase(),
    ]),
  );

  const applyFilters = () => {
    const query = searchEl.value.trim().toLowerCase();
    let visible = 0;

    // Browsing everything shows a short preview of each group; any search or filter shows every match.
    const previewing = activeCategory === 'all' && !fiberOnly && !query;
    const matchesInGroup = {};

    FOODS.forEach((food) => {
      const matches =
        (activeCategory === 'all' || food.category === activeCategory) &&
        (!fiberOnly || isGoodFiber(food)) &&
        (!query || searchText[food.id].includes(query));
      const position = matches ? (matchesInGroup[food.category] = (matchesInGroup[food.category] || 0) + 1) : 0;
      const collapsed = previewing && !openGroups.has(food.category) && position > PREVIEW_COUNT;
      groupsEl.querySelector(`[data-food="${food.id}"]`).closest('li').hidden = !matches || collapsed;
      if (matches) visible += 1;
    });

    FOOD_CATEGORIES.forEach((category) => {
      const section = groupsEl.querySelector(`[data-section="${category.id}"]`);
      const total = matchesInGroup[category.id] || 0;
      const open = openGroups.has(category.id);
      const more = section.querySelector('[data-more]');
      section.hidden = total === 0;
      more.hidden = !previewing || total <= PREVIEW_COUNT;
      more.setAttribute('aria-expanded', String(open));
      more.textContent = open ? 'Show fewer' : `Show all ${total} foods`;
    });

    emptyEl.hidden = visible > 0;
    countEl.textContent = previewing
      ? `${FOODS.length} foods in ${FOOD_CATEGORIES.length} groups`
      : `Showing ${visible} of ${FOODS.length} foods`;
  };

  filtersEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    activeCategory = button.dataset.filter;
    filtersEl.querySelectorAll('[data-filter]').forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.dataset.filter === activeCategory));
    });
    applyFilters();
  });

  fiberToggle.addEventListener('click', () => {
    fiberOnly = !fiberOnly;
    fiberToggle.setAttribute('aria-pressed', String(fiberOnly));
    applyFilters();
  });

  searchEl.addEventListener('input', applyFilters);

  groupsEl.addEventListener('click', (event) => {
    const more = event.target.closest('[data-more]');
    if (more) {
      const id = more.dataset.more;
      if (openGroups.has(id)) {
        openGroups.delete(id);
        applyFilters();
        // Keep the collapsed group in view instead of leaving the reader far below it
        const section = more.closest('[data-section]');
        const top = section.getBoundingClientRect().top;
        if (top < 0) window.scrollTo({ top: top + window.scrollY - 160 });
      } else {
        openGroups.add(id);
        applyFilters();
      }
      return;
    }

    const toggle = event.target.closest('[data-food]');
    if (!toggle) return;
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    document.getElementById(toggle.getAttribute('aria-controls')).hidden = expanded;
  });

  applyFilters();
}

/* ==========================================================================
   Top fiber foods, ranked from the same data
   ========================================================================== */

const FIBER_RANK_COUNT = 10;

function setupFiberRank() {
  const list = document.querySelector('[data-fiber-rank]');
  if (!list) return;

  const top = FOODS.filter((food) => food.category !== 'herbs' && food.fiber != null)
    .sort((a, b) => b.fiber - a.fiber)
    .slice(0, FIBER_RANK_COUNT);
  const max = top[0].fiber;

  list.innerHTML = top
    .map(
      (food) => `
        <li class="fiber-rank__item" data-tone="${categories[food.category].tone}">
          <span class="fiber-rank__emoji" aria-hidden="true">${food.emoji}</span>
          <span class="fiber-rank__name">${food.name}<span class="fiber-rank__serving">${food.serving}</span></span>
          <span class="fiber-rank__bar" aria-hidden="true"><span style="width: ${(food.fiber / max) * 100}%"></span></span>
          <span class="fiber-rank__value">${food.fiber} g</span>
        </li>`,
    )
    .join('');
}

setupPageToc();
setupFoodGuide();
setupFiberRank();
setupWholeVsProcessed();
