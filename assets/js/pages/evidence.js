import { SOURCE_GROUPS, SOURCES } from '../data/sources.js';
import { citationHtml } from '../components/source-list.js';
import { getPage } from '../site.config.js';
import { setupPageToc } from '../page-toc.js';

/* ==========================================================================
   All sources: grouped by type, filterable by the page that cites them
   ========================================================================== */

const PAGE_FILTERS = ['pcos', 'nutrition', 'lifestyle', 'foods', 'supplements'];

function setupSources() {
  const groupsEl = document.querySelector('[data-source-groups]');
  if (!groupsEl) return;

  const filtersEl = document.querySelector('[data-source-filters]');
  const countEl = document.querySelector('[data-source-count]');
  let activePage = 'all';

  filtersEl.innerHTML = [{ id: 'all', label: 'All pages' }, ...PAGE_FILTERS.map(getPage)]
    .map(
      (page) => `<button class="chip" type="button" data-page-filter="${page.id}" aria-pressed="${page.id === 'all'}">${page.label}</button>`,
    )
    .join('');

  groupsEl.innerHTML = SOURCE_GROUPS.map(
    (group) => `
      <section class="list-group" data-source-group="${group.id}" aria-labelledby="source-group-${group.id}">
        <div class="list-group__head">
          <h3 id="source-group-${group.id}">${group.label}</h3>
          <p>${group.description}</p>
        </div>
        <ol class="source-rows" role="list">
          ${SOURCES.filter((source) => source.group === group.id)
            .map(
              (source) => `
                <li class="source-row" data-source="${source.id}">
                  <p class="source-row__citation">${citationHtml(source)}</p>
                  <p class="source-row__use"><span class="source-row__label">What we use it for</span> ${source.usedFor}</p>
                  <p class="source-row__pages">
                    <span class="source-row__label">Cited on</span>
                    ${source.pages.map((id) => getPage(id)).map((page) => `<a href="${page.href}#sources-title">${page.label}</a>`).join('')}
                  </p>
                </li>`,
            )
            .join('')}
        </ol>
      </section>`,
  ).join('');

  const applyFilter = () => {
    let visible = 0;
    SOURCES.forEach((source) => {
      const show = activePage === 'all' || source.pages.includes(activePage);
      groupsEl.querySelector(`[data-source="${source.id}"]`).hidden = !show;
      if (show) visible += 1;
    });
    groupsEl.querySelectorAll('[data-source-group]').forEach((section) => {
      section.hidden = !section.querySelector('li:not([hidden])');
    });
    countEl.textContent =
      activePage === 'all'
        ? `${SOURCES.length} sources`
        : `${visible} ${visible === 1 ? 'source' : 'sources'} cited on ${getPage(activePage).label}`;
  };

  filtersEl.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-page-filter]');
    if (!chip) return;
    activePage = chip.dataset.pageFilter;
    filtersEl.querySelectorAll('[data-page-filter]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item.dataset.pageFilter === activePage));
    });
    applyFilter();
  });

  applyFilter();
}

setupPageToc();
setupSources();
