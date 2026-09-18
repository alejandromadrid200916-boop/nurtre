import { setupPageToc } from '../page-toc.js';

/* ==========================================================================
   Breathing exercise: breathe in for 4 seconds, out for 6, for 6 breaths
   ========================================================================== */

const PHASES = [
  { id: 'in', label: 'Breathe in', ms: 4000 },
  { id: 'out', label: 'Breathe out', ms: 6000 },
];
const TOTAL_BREATHS = 6;

function setupBreathing() {
  const circle = document.querySelector('[data-breathe-circle]');
  const label = document.querySelector('[data-breathe-label]');
  const hint = document.querySelector('[data-breathe-hint]');
  const toggle = document.querySelector('[data-breathe-toggle]');
  const count = document.querySelector('[data-breathe-count]');
  if (!circle || !toggle) return;

  let timer = null;
  let breaths = 0;

  const setCount = () => {
    count.textContent = `${breaths} of ${TOTAL_BREATHS} breaths`;
  };

  const runPhase = (index) => {
    const phase = PHASES[index];
    circle.style.setProperty('--phase-ms', `${phase.ms}ms`);
    circle.dataset.phase = phase.id;
    label.textContent = phase.label;

    timer = setTimeout(() => {
      if (phase.id === 'out') {
        breaths += 1;
        setCount();
        if (breaths >= TOTAL_BREATHS) {
          stop('Nice work. Notice how you feel, and come back whenever you need a pause.');
          return;
        }
      }
      runPhase((index + 1) % PHASES.length);
    }, phase.ms);
  };

  const start = () => {
    breaths = 0;
    setCount();
    toggle.textContent = 'Stop';
    toggle.setAttribute('aria-pressed', 'true');
    hint.textContent = 'Follow the circle. Let your shoulders drop and breathe slowly through your nose.';
    runPhase(0);
  };

  function stop(message = 'Paused. Start again any time.') {
    clearTimeout(timer);
    timer = null;
    circle.dataset.phase = 'rest';
    label.textContent = 'Ready';
    toggle.textContent = 'Start breathing';
    toggle.setAttribute('aria-pressed', 'false');
    hint.textContent = message;
  }

  toggle.addEventListener('click', () => (timer ? stop() : start()));
  setCount();
}

setupPageToc();
setupBreathing();
