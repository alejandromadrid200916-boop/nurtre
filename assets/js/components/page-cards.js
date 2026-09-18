import { getPage } from '../site.config.js';
import { icon } from '../ui.js';

// <page-cards pages="nutrition,foods,supplements"></page-cards>
class PageCards extends HTMLElement {
  connectedCallback() {
    const pages = (this.getAttribute('pages') ?? '')
      .split(',')
      .map((id) => getPage(id.trim()))
      .filter(Boolean);

    this.innerHTML = `<ul class="page-cards" role="list">${pages.map(renderCard).join('')}</ul>`;
  }
}

function renderCard(page) {
  const body = `
    <spot-art name="${page.spot}" tone="${page.tone}"></spot-art>
    <h3>${page.label}</h3>
    <p class="page-card__text">${page.description}</p>`;

  if (page.available) {
    return `
      <li>
        <a class="card page-card" href="${page.href}">
          ${body}
          <span class="page-card__footer"><span class="page-card__cta">Explore ${icon('arrowRight')}</span></span>
        </a>
      </li>`;
  }

  return `
    <li>
      <div class="card page-card is-soon" aria-disabled="true">
        ${body}
        <span class="page-card__footer"><span class="badge badge--soon">Coming soon</span></span>
      </div>
    </li>`;
}

customElements.define('page-cards', PageCards);
