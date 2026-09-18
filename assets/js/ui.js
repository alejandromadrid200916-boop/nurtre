// Shared markup helpers: icons and brand mark.

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
};

export function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] ?? ''}</svg>`;
}

export function brand(href = 'index.html') {
  return `
    <a class="brand" href="${href}" aria-label="Nurtre home">
      <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect class="brand__mark-bg" width="32" height="32" rx="10"/>
        <path class="brand__mark-stem" d="M16 25v-10" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path class="brand__mark-leaf-a" d="M16 15.5c0-4.4 3.1-7.5 7.5-7.5 0 4.4-3.1 7.5-7.5 7.5Z"/>
        <path class="brand__mark-leaf-b" d="M16 19c0-3.9-2.6-6.5-6.5-6.5 0 3.9 2.6 6.5 6.5 6.5Z"/>
      </svg>
      <span>Nurtre</span>
    </a>`;
}

// A page link, or an inert "coming soon" label for pages that don't exist yet.
export function pageLink(page, { className, current = false }) {
  if (current) {
    return `<a class="${className} is-current" href="${page.href}" aria-current="page">${page.label}</a>`;
  }
  if (page.available) {
    return `<a class="${className}" href="${page.href}">${page.label}</a>`;
  }
  return `<span class="${className} is-soon" aria-disabled="true">${page.label}<span class="nav-soon"><span class="visually-hidden">, </span>Soon</span></span>`;
}
