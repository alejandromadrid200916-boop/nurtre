import { EVIDENCE, SUPPLEMENTS, SUPPLEMENT_GROUPS, TIMING } from '../data/supplements.js';
import { setupPageToc } from '../page-toc.js';

const SECTIONS = [
  {
    id: 'pcos',
    title: 'Studied for PCOS',
    text: 'Ordered from most to least researched. For most of these, the evidence is still developing.',
    groups: ['pcos'],
  },
  {
    id: 'herb',
    title: 'Herbs & spices being studied',
    text: 'Everyday herbs and spices that researchers have looked at for PCOS. Evidence is early, and concentrated supplements aren’t the same as using them in food.',
    groups: ['herb'],
  },
  {
    id: 'avoid',
    title: 'Be cautious with',
    text: 'Often marketed for fertility or hormones, but not supported for routine use.',
    groups: ['avoid'],
  },
  {
    id: 'general',
    title: 'General vitamins & minerals',
    text: 'Nutrients everyone needs. They aren’t PCOS treatments, but some people need them, for example with a deficiency or during pregnancy.',
    groups: ['vitamin', 'mineral', 'other'],
  },
];

const FILTERS = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'pcos', label: 'Studied for PCOS', icon: SUPPLEMENT_GROUPS.pcos.filterIcon },
  { id: 'herb', label: 'Herbs & spices', icon: SUPPLEMENT_GROUPS.herb.filterIcon },
  { id: 'avoid', label: 'Not recommended', icon: SUPPLEMENT_GROUPS.avoid.filterIcon },
  { id: 'vitamin', label: 'Vitamins', icon: SUPPLEMENT_GROUPS.vitamin.filterIcon },
  { id: 'mineral', label: 'Minerals', icon: SUPPLEMENT_GROUPS.mineral.filterIcon },
  { id: 'other', label: 'Other', icon: SUPPLEMENT_GROUPS.other.filterIcon },
];

const evidenceTag = (level) => `<span class="evidence-tag evidence-tag--${level}">${EVIDENCE[level]}</span>`;

/* ==========================================================================
   Supplement library: an open list where each row expands in place
   ========================================================================== */

function rowMarkup(item) {
  const timing = item.timing ? TIMING[item.timing] : null;
  const isAvoid = item.group === 'avoid';
  const bodyId = `supp-body-${item.id}`;
  const badge = isAvoid ? '<span class="supp-flag">Not recommended</span>' : evidenceTag(item.evidence);
  let detailLabel = 'What it does';
  if (isAvoid) detailLabel = 'What to know';
  else if (item.group === 'pcos' || item.group === 'herb') detailLabel = 'What it’s studied for';

  return `
    <li class="list-row" data-group="${item.group}">
      <button class="list-row__toggle" type="button" aria-expanded="false" aria-controls="${bodyId}" data-supp="${item.id}">
        <span class="list-row__emoji" aria-hidden="true">${item.emoji}</span>
        <span class="list-row__main">
          <span class="list-row__name">${item.name}</span>
          <span class="list-row__summary">${item.summary}</span>
        </span>
        <span class="list-row__meta">
          ${badge}
          ${timing ? `<span class="supp-timing"><span aria-hidden="true">${timing.icon}</span>${timing.short}</span>` : ''}
        </span>
        <span class="list-row__chevron" aria-hidden="true"></span>
      </button>
      <div class="list-row__body" id="${bodyId}" hidden>
        <div class="list-row__detail">
          <p class="list-row__label">${detailLabel}</p>
          <p>${item.details}</p>
        </div>
        ${
          timing
            ? `<div class="list-row__detail">
                 <p class="list-row__label">When to take it: <span aria-hidden="true">${timing.icon}</span> ${timing.title}</p>
                 <p>${item.timingNote}</p>
               </div>`
            : ''
        }
        ${
          item.caution
            ? `<div class="list-row__detail list-row__detail--caution">
                 <p class="list-row__label"><span aria-hidden="true">⚠️</span> ${isAvoid ? 'Why to be careful' : 'Good to know'}</p>
                 <p>${item.caution}</p>
               </div>`
            : ''
        }
      </div>
    </li>`;
}

function setupLibrary() {
  const groupsEl = document.querySelector('[data-supp-groups]');
  if (!groupsEl) return;

  const filtersEl = document.querySelector('[data-supp-filters]');
  const searchEl = document.querySelector('[data-supp-search]');
  const countEl = document.querySelector('[data-supp-count]');
  const emptyEl = document.querySelector('[data-supp-empty]');

  let activeFilter = 'all';

  filtersEl.innerHTML = FILTERS.map(
    (filter) => `
      <button class="chip" type="button" data-filter="${filter.id}" aria-pressed="${filter.id === 'all'}">
        <span class="chip__emoji" aria-hidden="true">${filter.icon}</span>${filter.label}
      </button>`,
  ).join('');

  groupsEl.innerHTML = SECTIONS.map(
    (section) => `
      <section class="list-group" data-section="${section.id}" aria-labelledby="supp-group-${section.id}">
        <div class="list-group__head">
          <h3 id="supp-group-${section.id}">${section.title}</h3>
          <p>${section.text}</p>
        </div>
        <ul class="open-list" role="list">
          ${SUPPLEMENTS.filter((item) => section.groups.includes(item.group)).map(rowMarkup).join('')}
        </ul>
      </section>`,
  ).join('');

  const applyFilters = () => {
    const query = searchEl.value.trim().toLowerCase();
    let visible = 0;

    SUPPLEMENTS.forEach((item) => {
      const matchesFilter = activeFilter === 'all' || item.group === activeFilter;
      const matchesQuery = !query || `${item.name} ${item.summary} ${item.details}`.toLowerCase().includes(query);
      const show = matchesFilter && matchesQuery;
      groupsEl.querySelector(`[data-supp="${item.id}"]`).closest('li').hidden = !show;
      if (show) visible += 1;
    });

    groupsEl.querySelectorAll('[data-section]').forEach((section) => {
      section.hidden = !section.querySelector('li:not([hidden])');
    });

    emptyEl.hidden = visible > 0;
    countEl.textContent = `Showing ${visible} of ${SUPPLEMENTS.length} supplements`;
  };

  filtersEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    activeFilter = button.dataset.filter;
    filtersEl.querySelectorAll('[data-filter]').forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.dataset.filter === activeFilter));
    });
    applyFilters();
  });

  searchEl.addEventListener('input', applyFilters);

  groupsEl.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-supp]');
    if (!toggle) return;
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    document.getElementById(toggle.getAttribute('aria-controls')).hidden = expanded;
  });

  applyFilters();
}

/* ==========================================================================
   Timing cheat sheet (skips entries without timing, like "not recommended")
   ========================================================================== */

function setupTimingSheet() {
  const grid = document.querySelector('[data-timing-grid]');
  if (!grid) return;

  grid.innerHTML = Object.entries(TIMING)
    .map(([key, timing]) => {
      const items = SUPPLEMENTS.filter((item) => item.timing === key);
      return `
        <li class="timing-flow__col">
          <h3><span class="timing-flow__icon" aria-hidden="true">${timing.icon}</span>${timing.title}</h3>
          <p class="timing-flow__desc">${timing.description}</p>
          <ul class="timing-flow__items" role="list">
            ${items.map((item) => `<li><span aria-hidden="true">${item.emoji}</span>${item.name}</li>`).join('')}
          </ul>
        </li>`;
    })
    .join('');
}

setupPageToc();
setupLibrary();
setupTimingSheet();
