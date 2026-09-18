// "Same food, different forms": tabs showing a food from whole to highly processed. Used on the Foods page.
// Markup: [data-processing-tabs] (role="tablist"), [data-processing-panel] (role="tabpanel"). Styles: assets/css/pages/foods.css

const STAGES = [
  { label: 'Whole', verdict: 'Great everyday choice', tone: 'whole' },
  { label: 'Minimally processed', verdict: 'Great everyday choice', tone: 'minimal' },
  { label: 'Highly processed', verdict: 'Best kept occasional', tone: 'high' },
];

const FOODS = [
  {
    id: 'oats', label: 'Oats', emoji: '🥣',
    stages: [
      { emoji: '🌾', name: 'Steel-cut or rolled oats', text: 'Just oats. Cook with milk or water and add your own toppings.' },
      { emoji: '🥣', name: 'Plain instant oats', text: 'Cut finer so they cook faster, with nothing added.' },
      { emoji: '📦', name: 'Flavored oatmeal packets', text: 'Often include added sugar and flavorings.' },
    ],
  },
  {
    id: 'apples', label: 'Apples', emoji: '🍎',
    stages: [
      { emoji: '🍎', name: 'Whole apple', text: 'Skin and all, with its natural fiber.' },
      { emoji: '🥣', name: 'Unsweetened applesauce', text: 'Cooked and blended, with nothing added.' },
      { emoji: '🧃', name: 'Apple juice drinks or fruit snacks', text: 'Most of the fiber is gone, and sugar is often added.' },
    ],
  },
  {
    id: 'corn', label: 'Corn', emoji: '🌽',
    stages: [
      { emoji: '🌽', name: 'Corn on the cob', text: 'Straight from the husk.' },
      { emoji: '🧊', name: 'Plain frozen corn', text: 'Picked and frozen, a convenient everyday option.' },
      { emoji: '📦', name: 'Corn chips', text: 'Refined, fried, and salted.' },
    ],
  },
  {
    id: 'chicken', label: 'Chicken', emoji: '🍗',
    stages: [
      { emoji: '🍗', name: 'Fresh chicken breast', text: 'Season and cook it your way.' },
      { emoji: '🧊', name: 'Plain frozen chicken breast', text: 'Frozen for convenience, with nothing added.' },
      { emoji: '📦', name: 'Chicken nuggets', text: 'Breaded, fried, and made with added ingredients.' },
    ],
  },
  {
    id: 'dairy', label: 'Dairy', emoji: '🥛',
    stages: [
      { emoji: '🥛', name: 'Milk', text: 'A simple, single-ingredient food.' },
      { emoji: '🥣', name: 'Plain Greek yogurt', text: 'Fermented and strained, with nothing added.' },
      { emoji: '🧃', name: 'Sweetened yogurt drinks', text: 'Usually contain added sugar and flavorings.' },
    ],
  },
  {
    id: 'potatoes', label: 'Potatoes', emoji: '🥔',
    stages: [
      { emoji: '🥔', name: 'Baked potato with skin', text: 'Keeps the fiber in the skin. Season it your way.' },
      { emoji: '🧊', name: 'Plain frozen potato cubes', text: 'Cut and frozen for convenience, with nothing added.' },
      { emoji: '🍟', name: 'Potato chips', text: 'Thinly sliced, fried, and salted.' },
    ],
  },
  {
    id: 'nuts', label: 'Nuts', emoji: '🥜',
    stages: [
      { emoji: '🌰', name: 'Plain almonds', text: 'Just nuts, raw or dry-roasted.' },
      { emoji: '🥣', name: 'Almond butter made from only almonds', text: 'Ground into a spread, with nothing added.' },
      { emoji: '🍬', name: 'Candy-coated or honey-roasted nuts', text: 'Coated in added sugar and often extra salt.' },
    ],
  },
];

export function setupWholeVsProcessed() {
  const tabList = document.querySelector('[data-processing-tabs]');
  const panel = document.querySelector('[data-processing-panel]');
  if (!tabList || !panel) return;

  tabList.innerHTML = FOODS.map(
    (item) => `
      <button class="chip" type="button" role="tab" id="processing-tab-${item.id}" aria-controls="${panel.id}"
        aria-selected="false" tabindex="-1" data-processing="${item.id}">
        <span class="chip__emoji" aria-hidden="true">${item.emoji}</span>${item.label}
      </button>`,
  ).join('');

  const tabs = [...tabList.querySelectorAll('[role="tab"]')];

  const show = (id, { focus = false } = {}) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.processing === id;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });

    const item = FOODS.find((entry) => entry.id === id);
    panel.setAttribute('aria-labelledby', `processing-tab-${id}`);
    panel.innerHTML = `
      <div class="spectrum__bar" aria-hidden="true"><span>Whole</span><span>Highly processed</span></div>
      <ol class="stage-grid" role="list">
        ${item.stages.map((stage, index) => {
          const meta = STAGES[index];
          return `
            <li class="stage stage--${meta.tone}" style="--i: ${index}">
              <span class="stage__label">${meta.label}</span>
              <span class="stage__emoji" aria-hidden="true">${stage.emoji}</span>
              <h3>${stage.name}</h3>
              <p>${stage.text}</p>
              <span class="stage__verdict">${meta.verdict}</span>
            </li>`;
        }).join('')}
      </ol>`;
  };

  tabList.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (tab) show(tab.dataset.processing);
  });

  tabList.addEventListener('keydown', (event) => {
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (keys[event.key] + tabs.length) % tabs.length;
    show(tabs[next].dataset.processing, { focus: true });
  });

  show(FOODS[0].id);
}
