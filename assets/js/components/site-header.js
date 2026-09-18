import { PAGES } from '../site.config.js';
import { brand, pageLink } from '../ui.js';

const DESKTOP_QUERY = '(min-width: 64rem)';

// <site-header current="home"></site-header>
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current');
    const items = PAGES.map(
      (page) => `<li>${pageLink(page, { className: 'nav-link', current: page.id === current })}</li>`,
    ).join('');

    this.innerHTML = `
      <header class="site-header">
        <div class="container site-header__inner">
          ${brand()}
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            <span class="menu-toggle__bars" aria-hidden="true"></span>
            <span class="visually-hidden">Open menu</span>
          </button>
          <nav class="site-nav" id="site-nav" aria-label="Main">
            <ul class="nav-list" role="list">${items}</ul>
          </nav>
        </div>
      </header>`;

    this.header = this.querySelector('.site-header');
    this.toggle = this.querySelector('.menu-toggle');

    this.toggle.addEventListener('click', () => this.setOpen(!this.isOpen));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) {
        this.setOpen(false);
        this.toggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (this.isOpen && !this.contains(event.target)) this.setOpen(false);
    });

    matchMedia(DESKTOP_QUERY).addEventListener('change', (event) => {
      if (event.matches) this.setOpen(false);
    });

    const onScroll = () => this.header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  get isOpen() {
    return this.header.dataset.open === 'true';
  }

  setOpen(open) {
    this.header.dataset.open = String(open);
    this.toggle.setAttribute('aria-expanded', String(open));
    this.toggle.querySelector('.visually-hidden').textContent = open ? 'Close menu' : 'Open menu';
  }
}

customElements.define('site-header', SiteHeader);
