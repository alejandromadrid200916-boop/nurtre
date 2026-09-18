# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Nurtre is an educational website about PCOS nutrition and supplements. Nutrition is the site's main focus, and the Nutrition page is its most important page. The planned pages are Home, PCOS, Nutrition, Foods, Supplements, Evidence, and Lifestyle. Each page is built in its own session when requested.

## Running

This is a static site with no build step, dependencies, package manager, tests, or linter. Plain HTML, CSS, and ES modules are served as-is.

```bash
python3 -m http.server 8000
```

In the desktop app, start it with the `nurtre` preview config in `.claude/launch.json` rather than Bash. Pages must be served over HTTP, because ES modules don't load from `file://`.

The Python server doesn't send no-cache headers, so the browser often keeps old CSS and JS after an edit. Before judging a change, force-refresh the files, for example `fetch(url, {cache: 'reload'})` for each changed asset followed by a reload.

## Architecture

**Pages.** Each page is a top-level HTML file (`index.html`, `pcos.html`, `nutrition.html`, `lifestyle.html`, `foods.html`, `supplements.html`, `evidence.html`) with the same skeleton:
- Google Fonts: Inter for body text, Manrope for headings.
- Four stylesheets, in order: `tokens.css`, `base.css`, `components.css`, then `pages/<page>.css`.
- Two module scripts: `assets/js/main.js` and `assets/js/pages/<page>.js`.
- `<site-header current="<page-id>">`, then `<main id="main">`, then `<site-footer>`.

**Single source of truth for pages.** `assets/js/site.config.js` lists every page with `id`, `label`, `href`, `available`, and a card `spot`, `tone`, and `description`. The header nav, the footer links, and `<page-cards pages="a,b,c">` all render from it. Pages with `available: false` render as inert "Soon" labels and "Coming soon" cards, so nothing links to a missing page. **To launch a new page, set `available: true` there.** Don't hand-edit the nav or cards.

**Components.** These are native custom elements in `assets/js/components/`. They use light DOM (they set `innerHTML`, no shadow DOM), so global CSS styles them. `main.js` registers them.
- `site-header`: nav with a current-page state and a collapsible mobile menu below 64rem.
- `site-footer`: footer links and the medical disclaimer.
- `page-cards`: the page card grid.
- `source-list`: a page's numbered Sources list (`<source-list page="foods">`), rendered from `assets/js/data/sources.js`. It also exports `citationHtml()`, which the Evidence page reuses.
- `spot-art`: small inline SVG illustrations on a tinted tile (`<spot-art name="apple" tone="peach">`). Illustrations are defined in its `SPOTS` map. Tones come from the `--tone-*` tokens.

`assets/js/ui.js` holds shared markup helpers: icons, the brand mark, and `pageLink()`.

**CSS layers.**
- `tokens.css`: the only place colors, type scale, spacing, radii, shadows, and evidence colors are defined.
- `base.css`: reset, typography, `.container`, `.section`, `.section--alt`, `.section--dark`, `.section--compact`, and utilities.
- `components.css`: shared UI such as buttons, chips (selected state via `aria-pressed` or `aria-selected`), cards, badges, evidence tags, `.page-hero` (plus `.page-hero--center` with `.page-hero__art` and `.page-hero__note`, used by Foods, Supplements, and Evidence), `.hero-glow`, `.page-toc`, callouts, `.insulin-loop` step chains, the footer, `.sources`, `.tip-list` (emoji, heading, text, evidence tag), and the open list used by Supplements and Foods (`.library`, `.list-group`, `.open-list`, `.list-row__*`, with the emoji tile color set through `--row-tone`).
- `pages/*.css`: page-only styles.

Anything reused by a second page belongs in `components.css`.

**Sticky "On this page" nav.** A `.page-toc` placed after the page hero is highlighted by `setupPageToc()` in `assets/js/page-toc.js`, which uses an IntersectionObserver. Pages with it set `html { scroll-padding-top: calc(var(--header-h) + 4.5rem) }` in their page CSS. It scrolls only the strip sideways. Don't use `scrollIntoView()` there, because on an element inside a sticky container it also scrolls the page.

**Shared data and widgets.** `assets/js/data/supplements.js` drives the whole Supplements page: the open list whose rows expand in place, and the timing cheat sheet. The page deliberately avoids card boxes, using dividers and whitespace instead. PCOS-studied entries are kept in order from most to least researched, and no entry includes a dose. `assets/js/data/foods.js` drives the Foods page: 97 whole foods in 9 groups. Protein, carbs, fat, and fiber per serving were calculated from USDA FoodData Central (SR Legacy), and each entry keeps its USDA `fdcId`. `nutrients` lists what one serving provides at 10% or more of the FDA Daily Value. Look up any new food in USDA data the same way instead of estimating. `assets/js/widgets/whole-vs-processed.js` is used on the Foods page (styles in `pages/foods.css`). `assets/js/widgets/food-explorer.js` and `assets/css/widgets/food-widgets.css` (a tile explorer) aren't used on any page.

**Page scripts.** Each `pages/<page>.js` calls `setupPageToc()` and wires up that page's interactive pieces. For example, `nutrition.js` runs the habit planner and myth flip cards, `lifestyle.js` runs the breathing exercise, `supplements.js` renders the library and timing cheat sheet from its data file, and `foods.js` renders the food guide (Protein group first; each group previews 4 foods with a "Show all" button until you search or filter; group chips; a "good source of fiber" toggle), the top-fiber ranking, and the whole vs. processed tabs. `evidence.js` renders the full source list, grouped by type and filterable by page.

**Client state.** The Nutrition page habit planner stores picks in `localStorage` under `nurtre:habits`. Every read or write is wrapped in try/catch.

## Content rules

- **No unsupported medical claims.** Label statements with an evidence tag: `<span class="evidence-tag evidence-tag--established|research|association|emerging">`. The four levels are Established guidance, Research finding, Association, and Emerging hypothesis. Each level uses a different marker shape, so the meaning doesn't depend on color alone.
- **Never say nutrition "cures" PCOS.** PCOS has no cure. Frame nutrition and lifestyle as the first-line, most powerful way to *manage* it, in line with the 2023 International Evidence-based PCOS Guideline.
- **PCOS is framed as a metabolic condition,** with insulin resistance at the center. Mention that PCOS occurs at all body sizes.
- **Lifestyle change, not a diet.** Don't recommend or compare named diets (Mediterranean, low-glycemic, DASH, keto, and so on). Frame eating as small, lasting habits built around whole foods, with no single best diet.
- **No numeric targets.** No doses for supplements and no required amounts of exercise (such as minutes per week). Stress that regular movement matters without setting a number to hit.
- **Pages end with a Sources section.** Every citation lives in `assets/js/data/sources.js` (with its DOI or URL, the pages that cite it, and what it's used for), and each page renders its own list with `<source-list>`. All 18 were checked against CrossRef, PubMed, or the publisher in September 2026. Check any new citation the same way before adding it. The reference list in the user's supplements review had wrong first authors for its PubMed-ID entries, so don't copy citations from the source documents without checking them.
- **Design style:** calm, natural palette (cream, dark green, sage, warm clay accents). Avoid the stereotypical bright-pink women's health look. Friendly illustrations and emoji are welcome, as long as they stay consistent with that palette. The user dislikes layouts crowded with bordered boxes, so prefer open lists, dividers, and whitespace (see the Supplements page).

## Source material

The user's content lives outside the repo, in `~/Downloads`:
- `what is pcos .docx`: the user's own writing. It has the PCOS definition, diet tips, supplement timing notes, a lifestyle habits list, and food macros.
- `Supplements_in_PCOS_and_IVF_Narrative_Review (1).docx`: an evidence review of PCOS and IVF supplements.
- `pcos nutricion.pdf`: Muhammed Saeed et al., *Journal of Health, Population and Nutrition* 2025. Its CC BY-NC-ND license means facts should be paraphrased and cited, not copied.

The Read tool can't render PDFs here because `pdftoppm` isn't installed. To extract text:

```bash
textutil -convert txt -stdout "<file>.docx"
osascript -l JavaScript -e 'ObjC.import("PDFKit"); $.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath("<file>.pdf")).string.js'
```

## Gotchas

- `base.css` removes list styling with `ul[role="list"], ol[role="list"]`. That selector outranks a single class, so a margin set on a `role="list"` element with only one class gets overwritten. Scope such rules with a parent selector.
- The desktop app's preview pane is often hidden. While it's hidden, the browser doesn't draw new frames, so IntersectionObserver callbacks and CSS transitions stall. Screenshots taken after a scroll can also come back blank. Take a screenshot to force a frame before concluding that scroll-driven behavior is broken.
