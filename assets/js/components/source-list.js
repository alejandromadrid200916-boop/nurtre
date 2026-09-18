import { getSourcesForPage } from '../data/sources.js';

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// One formatted citation with its link. Shared with the Evidence page's full source list.
export function citationHtml(source) {
  return `${escapeHtml(source.authors)} ${escapeHtml(source.title)}. <em>${escapeHtml(source.publication)}</em>, ${escapeHtml(source.details)}.
    <a class="source-link" href="${source.url}" target="_blank" rel="noopener">${escapeHtml(source.linkLabel)}</a>`;
}

// <source-list page="foods"></source-list>: the numbered Sources list for one page, from data/sources.js.
class SourceList extends HTMLElement {
  connectedCallback() {
    const sources = getSourcesForPage(this.getAttribute('page') ?? '');
    this.innerHTML = `<ol>${sources.map((source) => `<li>${citationHtml(source)}</li>`).join('')}</ol>`;
  }
}

customElements.define('source-list', SourceList);
