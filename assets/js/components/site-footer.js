import { PAGES } from '../site.config.js';
import { brand, pageLink } from '../ui.js';

// <site-footer></site-footer>
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const links = PAGES.map((page) => `<li>${pageLink(page, { className: 'footer-link' })}</li>`).join('');

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__inner">
          <div class="site-footer__about">
            ${brand()}
            <p>An evidence-labeled nutrition resource for people with PCOS.</p>
          </div>
          <nav aria-label="Footer">
            <h2 class="site-footer__heading">Explore</h2>
            <ul class="footer-links" role="list">${links}</ul>
          </nav>
          <div>
            <h2 class="site-footer__heading">Medical disclaimer</h2>
            <p>
              Nurtre is for educational purposes only and is not a substitute for professional medical
              advice, diagnosis, or treatment. Talk with a qualified healthcare provider before changing
              your diet or starting a supplement.
            </p>
          </div>
        </div>
        <div class="container">
          <p class="site-footer__bottom">&copy; ${new Date().getFullYear()} Nurtre</p>
        </div>
      </footer>`;
  }
}

customElements.define('site-footer', SiteFooter);
