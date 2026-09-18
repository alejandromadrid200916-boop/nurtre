// Single source of truth for site pages.
// Set `available: true` once a page exists; nav, footer, and cards update automatically.
// `spot` and `tone` pick the card illustration (see components/spot-art.js and --tone-* tokens).

export const PAGES = [
  {
    id: 'home',
    label: 'Home',
    href: 'index.html',
    available: true,
  },
  {
    id: 'pcos',
    label: 'PCOS',
    href: 'pcos.html',
    available: true,
    spot: 'leaf',
    tone: 'sage',
    description: 'A clear overview of PCOS and why nutrition is part of the conversation.',
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    href: 'nutrition.html',
    available: true,
    spot: 'apple',
    tone: 'peach',
    description: 'How carbohydrates, protein, fats, and fiber relate to PCOS, explained without the jargon.',
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    href: 'lifestyle.html',
    available: true,
    spot: 'sunrise',
    tone: 'mint',
    description: 'Sleep, movement, and stress: the habits that sit alongside nutrition.',
  },
  {
    id: 'foods',
    label: 'Foods',
    href: 'foods.html',
    available: true,
    spot: 'bowl',
    tone: 'butter',
    description: 'Browse everyday foods by nutrient, with practical notes on fitting them into meals.',
  },
  {
    id: 'supplements',
    label: 'Supplements',
    href: 'supplements.html',
    available: true,
    spot: 'capsule',
    tone: 'lavender',
    description: 'What research says about inositol, vitamin D, omega-3s, and others, including what is still uncertain.',
  },
  {
    id: 'evidence',
    label: 'Evidence',
    href: 'evidence.html',
    available: true,
    spot: 'magnifier',
    tone: 'sky',
    description: 'How our four evidence labels work, and every source behind the site, checked and linked.',
  },
];

export const getPage = (id) => PAGES.find((page) => page.id === id);
