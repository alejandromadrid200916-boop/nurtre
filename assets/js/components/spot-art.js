// Small colorful illustrations shown on a soft tinted tile.
// <spot-art name="apple" tone="peach"></spot-art>

const SPOTS = {
  dumbbell: `
    <rect x="3" y="19" width="6" height="10" rx="2" fill="#8DB57F"/>
    <rect x="39" y="19" width="6" height="10" rx="2" fill="#8DB57F"/>
    <rect x="8" y="15" width="8" height="18" rx="2.5" fill="#6E9B63"/>
    <rect x="32" y="15" width="8" height="18" rx="2.5" fill="#6E9B63"/>
    <rect x="16" y="22" width="16" height="4" rx="2" fill="#8A7F72"/>`,

  sneaker: `
    <path d="M6 32c0-7 4-13 8-15l6 4c4 3 10 4 15 5 5 1 8 4 8 8v2H6Z" fill="#EE9C78"/>
    <path d="M6 36h37v2a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="#fff" stroke="#E0B0A0" stroke-width="2"/>
    <path d="M19 23l-3 4M24 25l-3 4M29 26l-2 4" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M4 12h9M2 18h6" stroke="#D9B96E" stroke-width="2.5" stroke-linecap="round"/>`,

  moon: `
    <path d="M30 7a17 17 0 1 0 12 28A15 15 0 0 1 30 7Z" fill="#F2CF63"/>
    <path d="M38 8l1.4 3.6L43 13l-3.6 1.4L38 18l-1.4-3.6L33 13l3.6-1.4Z" fill="#8E86B5"/>
    <circle cx="20" cy="26" r="1.8" fill="#E0B24A"/>
    <circle cx="16" cy="33" r="1.4" fill="#E0B24A"/>`,

  sun: `
    <circle cx="24" cy="24" r="10" fill="#F2CF63"/>
    <path d="M24 4v5M24 39v5M4 24h5M39 24h5M10 10l3.5 3.5M34.5 34.5 38 38M10 38l3.5-3.5M34.5 13.5 38 10" stroke="#F2CF63" stroke-width="3" stroke-linecap="round"/>
    <circle cx="20.5" cy="23" r="1.4" fill="#8A5A3C"/>
    <circle cx="27.5" cy="23" r="1.4" fill="#8A5A3C"/>
    <path d="M21 27.5q3 2.5 6 0" stroke="#8A5A3C" stroke-width="1.6" stroke-linecap="round"/>`,

  phone: `
    <rect x="11" y="5" width="22" height="38" rx="5" fill="#fff" stroke="#8E86B5" stroke-width="2.5"/>
    <rect x="15" y="11" width="14" height="22" rx="2" fill="#ECE8F2"/>
    <circle cx="22" cy="38" r="1.8" fill="#8E86B5"/>
    <path d="M36 14l8 8M44 14l-8 8" stroke="#E48A6A" stroke-width="3" stroke-linecap="round"/>`,

  water: `
    <path d="M15 9h18l-2.5 32a4 4 0 0 1-4 3.5h-5a4 4 0 0 1-4-3.5Z" fill="#fff" stroke="#82A9B6" stroke-width="2"/>
    <path d="M16.4 22h15.2l-1.5 19a2.5 2.5 0 0 1-2.5 2.2h-7.2a2.5 2.5 0 0 1-2.5-2.2Z" fill="#9CC0CC"/>
    <circle cx="21" cy="30" r="1.6" fill="#fff" opacity=".8"/>
    <circle cx="26" cy="36" r="1.2" fill="#fff" opacity=".8"/>`,

  people: `
    <circle cx="16" cy="18" r="6" fill="#C98F6B"/>
    <path d="M5 40c0-8 5-13 11-13s11 5 11 13Z" fill="#97B094"/>
    <circle cx="32" cy="20" r="5.5" fill="#E6B894"/>
    <path d="M22 41c0-7 4.5-11.5 10-11.5S42 34 42 41Z" fill="#EE9C78"/>
    <path d="M25 6c-2-3-6-2-5 1 .6 2 5 5 5 5s4.4-3 5-5c1-3-3-4-5-1Z" fill="#E48A6A"/>`,

  tree: `
    <rect x="21.5" y="26" width="5" height="16" rx="2" fill="#A8744C"/>
    <circle cx="24" cy="17" r="11" fill="#8DB57F"/>
    <circle cx="15" cy="25" r="7" fill="#6E9B63"/>
    <circle cx="33" cy="25" r="7" fill="#6E9B63"/>
    <path d="M8 42h32" stroke="#A9C79B" stroke-width="3" stroke-linecap="round"/>`,

  palette: `
    <path d="M24 6C13 6 5 14 5 24s8 18 17 18c3 0 4-2 4-4 0-3-2-4 1-6 3-2 8 0 12-2 3-2 4-5 4-8C43 13 35 6 24 6Z" fill="#F7EFD2" stroke="#E0B24A" stroke-width="2"/>
    <circle cx="15" cy="23" r="3" fill="#E48A6A"/>
    <circle cx="19" cy="14" r="3" fill="#6E9B63"/>
    <circle cx="29" cy="13" r="3" fill="#8E86B5"/>
    <circle cx="35" cy="21" r="3" fill="#82A9B6"/>`,

  breath: `
    <path d="M6 17h22a5 5 0 1 0-5-5" stroke="#82A9B6" stroke-width="3" stroke-linecap="round"/>
    <path d="M6 25h30a5 5 0 1 1-5 5" stroke="#8E86B5" stroke-width="3" stroke-linecap="round"/>
    <path d="M6 33h12" stroke="#97B094" stroke-width="3" stroke-linecap="round"/>`,

  leaf: `
    <path d="M10 38C10 20 22 9 40 8c0 18-11 30-30 30Z" fill="#8DB57F"/>
    <path d="M10 38 30 18" stroke="#5E8A4A" stroke-width="2.5" stroke-linecap="round"/>`,

  apple: `
    <path d="M24 16c-3-3-9-4-13 0s-4 12-1 18c3 6 7 9 10 9 2 0 2.5-1 4-1s2 1 4 1c3 0 7-3 10-9s3-14-1-18-10-3-13 0Z" fill="#E48A6A"/>
    <path d="M24 16c0-5 3-9 9-10 0 6-3 10-9 10Z" fill="#6E9B63"/>
    <path d="M23 17c0-4-1-7-3-9" stroke="#8A5A3C" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="15" cy="25" rx="2.5" ry="4.5" fill="#fff" opacity=".35" transform="rotate(20 15 25)"/>`,

  bowl: `
    <path d="M13 24c0-6 4-10 10-10 1 6-4 10-10 10Z" fill="#8DB57F"/>
    <path d="M21 24c2-7 8-10 14-8-1 6-7 9-14 8Z" fill="#6E9B63"/>
    <circle cx="32" cy="21" r="3.5" fill="#E48A6A"/>
    <path d="M7 25h34c0 9-7.6 16-17 16S7 34 7 25Z" fill="#F2CF63"/>
    <rect x="5" y="22" width="38" height="4" rx="2" fill="#E0B24A"/>`,

  capsule: `
    <g transform="rotate(-35 24 22)">
      <path d="M24 14h-8a8 8 0 0 0 0 16h8Z" fill="#8E86B5"/>
      <path d="M24 14h8a8 8 0 0 1 0 16h-8Z" fill="#F2CF63"/>
      <rect x="12" y="17" width="9" height="3" rx="1.5" fill="#fff" opacity=".45"/>
    </g>
    <circle cx="36" cy="38" r="4.5" fill="#A9C79B"/>
    <circle cx="12" cy="39" r="3" fill="#EE9C78"/>`,

  plate: `
    <path d="M7 10v8c0 2 1.5 3 3 3s3-1 3-3v-8M10 10v29" stroke="#A8744C" stroke-width="2" stroke-linecap="round"/>
    <circle cx="29" cy="25" r="15" fill="#fff" stroke="#D6CEBE" stroke-width="2"/>
    <path d="M29 25V14a11 11 0 0 1 11 11Z" fill="#EE9C78"/>
    <path d="M29 25h11a11 11 0 0 1-11 11Z" fill="#E6CF9E"/>
    <path d="M29 25v11a11 11 0 0 1 0-22Z" fill="#8DB57F"/>`,

  magnifier: `
    <rect x="8" y="6" width="24" height="31" rx="4" fill="#fff" stroke="#C9D6DB" stroke-width="2"/>
    <path d="M14 14h12M14 20h8" stroke="#B9C9CF" stroke-width="2" stroke-linecap="round"/>
    <circle cx="29" cy="29" r="8" fill="#DCE8EC" stroke="#4E7C8C" stroke-width="3"/>
    <path d="m35 35 6 6" stroke="#4E7C8C" stroke-width="3.5" stroke-linecap="round"/>
    <path d="m25.5 29 2.5 2.5 4.5-5" stroke="#4E7C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,

  sunrise: `
    <circle cx="30" cy="18" r="8" fill="#F2CF63"/>
    <path d="M30 5v2M41 18h2M39 9l1.5-1.5" stroke="#F2CF63" stroke-width="2" stroke-linecap="round"/>
    <path d="M4 40c5-9 13-13 21-9 6-6 14-6 19 3v6Z" fill="#A9C79B"/>
    <path d="M4 42c9-7 20-8 30-3 4-1 7 0 10 1v2Z" fill="#6E9B63"/>`,

  basket: `
    <circle cx="17" cy="15" r="6" fill="#E48A6A"/>
    <path d="M25 20c0-7 4-12 10-13 1 7-3 12-10 13Z" fill="#6E9B63"/>
    <path d="M9 23h30l-3 14a4 4 0 0 1-4 3H16a4 4 0 0 1-4-3Z" fill="#E6B98A"/>
    <rect x="6" y="19" width="36" height="5" rx="2.5" fill="#C99368"/>
    <path d="M18 28v8M24 28v9M30 28v8" stroke="#C99368" stroke-width="2" stroke-linecap="round"/>`,

  heart: `
    <path d="M24 40s-15-8.5-15-19a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 10.5-15 19-15 19Z" fill="#EE9C78"/>
    <path d="M24 21v9M19.5 25.5h9" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="15" cy="20" rx="2" ry="3.5" fill="#fff" opacity=".35" transform="rotate(30 15 20)"/>`,

  glucose: `
    <path d="M24 6c6 9 13 16 13 24a13 13 0 0 1-26 0c0-8 7-15 13-24Z" fill="#E48A6A"/>
    <path d="M15 31h5l2-5 4 9 2-4h5" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,

  molecule: `
    <path d="M15 16 30 22M30 22l-9 14M30 22l10-9" stroke="#8E86B5" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="14" cy="15" r="6" fill="#8E86B5"/>
    <circle cx="30" cy="22" r="7" fill="#F2CF63"/>
    <circle cx="21" cy="36" r="5" fill="#A9C79B"/>
    <circle cx="40" cy="13" r="4" fill="#EE9C78"/>`,

  calendar: `
    <rect x="7" y="10" width="34" height="30" rx="5" fill="#fff" stroke="#E0B0A0" stroke-width="2"/>
    <path d="M7 18h34" stroke="#E0B0A0" stroke-width="2"/>
    <path d="M15 6v7M33 6v7" stroke="#C98A74" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="16" cy="26" r="2.5" fill="#E6CF9E"/>
    <circle cx="24" cy="26" r="2.5" fill="#EE9C78"/>
    <circle cx="32" cy="26" r="2.5" fill="#E6CF9E"/>
    <circle cx="16" cy="33" r="2.5" fill="#E6CF9E"/>
    <circle cx="24" cy="33" r="2.5" fill="#E6CF9E"/>`,

  sparkle: `
    <path d="M22 8l3.5 9.5L35 21l-9.5 3.5L22 34l-3.5-9.5L9 21l9.5-3.5Z" fill="#F2CF63"/>
    <path d="M36 30l1.8 4.2L42 36l-4.2 1.8L36 42l-1.8-4.2L30 36l4.2-1.8Z" fill="#EE9C78"/>`,

  steps: `
    <path d="M6 41h36V9h-9v10h-9v11h-9v11Z" fill="#E6CF9E"/>
    <path d="M6 41h36" stroke="#C9A96A" stroke-width="2" stroke-linecap="round"/>
    <circle cx="15" cy="23" r="4.5" fill="#E48A6A"/>
    <path d="M12 31l3-4 3 4" stroke="#E48A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M38 5l1.5 3.5L43 10l-3.5 1.5L38 15l-1.5-3.5L33 10l3.5-1.5Z" fill="#6E9B63"/>`,

  clock: `
    <circle cx="24" cy="26" r="16" fill="#fff" stroke="#97B094" stroke-width="2.5"/>
    <path d="M24 17v9l6 4" stroke="#2E5A43" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="24" cy="26" r="2" fill="#2E5A43"/>
    <path d="M11 9 7 13M37 9l4 4" stroke="#E48A6A" stroke-width="2.5" stroke-linecap="round"/>`,

  pair: `
    <circle cx="18" cy="24" r="12" fill="#F2CF63"/>
    <circle cx="30" cy="24" r="12" fill="#8DB57F"/>
    <path d="M24 13.6a12 12 0 0 1 0 20.8 12 12 0 0 1 0-20.8Z" fill="#5E8A4A"/>`,

  balance: `
    <path d="M24 9v29M15 40h18M9 14h30" stroke="#A8744C" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M9 14 5 26M9 14l4 12M39 14l-4 12M39 14l4 12" stroke="#C9BFAB" stroke-width="1.5"/>
    <path d="M3 26a6 5 0 0 0 12 0Z" fill="#F2CF63"/>
    <path d="M33 26a6 5 0 0 0 12 0Z" fill="#A9C79B"/>
    <circle cx="24" cy="9" r="3" fill="#A8744C"/>`,

  mind: `
    <path d="M14 36a8 8 0 0 1-1-15.9A10 10 0 0 1 32 16a8 8 0 0 1 3 20Z" fill="#fff" stroke="#B9C9CF" stroke-width="2"/>
    <path d="M24 32s-6-3.4-6-7.6a3.2 3.2 0 0 1 6-1.6 3.2 3.2 0 0 1 6 1.6c0 4.2-6 7.6-6 7.6Z" fill="#EE9C78"/>`,
};

class SpotArt extends HTMLElement {
  connectedCallback() {
    const art = SPOTS[this.getAttribute('name')] ?? '';
    this.setAttribute('aria-hidden', 'true');
    this.innerHTML = `<svg viewBox="0 0 48 48" fill="none" focusable="false">${art}</svg>`;
  }
}

customElements.define('spot-art', SpotArt);
