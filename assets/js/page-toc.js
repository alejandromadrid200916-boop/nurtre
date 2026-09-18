// Highlights the current section in a page's "On this page" nav (.page-toc).

export function setupPageToc() {
  const list = document.querySelector('.page-toc__list');
  const links = [...document.querySelectorAll('.page-toc a')];
  if (!list || !links.length) return;

  // Scroll only the nav strip sideways. scrollIntoView() would also scroll the page,
  // yanking it back toward the sticky nav's original position.
  const revealLink = (link) => {
    const linkStart = link.offsetLeft;
    const linkEnd = linkStart + link.offsetWidth;
    if (linkStart < list.scrollLeft) {
      list.scrollTo({ left: linkStart - 16 });
    } else if (linkEnd > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: linkEnd - list.clientWidth + 16 });
    }
  };

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
        revealLink(link);
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-35% 0px -60% 0px' },
  );

  links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .forEach((section) => section && observer.observe(section));
}
