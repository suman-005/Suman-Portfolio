# Tomorrow Correction Plan — Suman Das Interactive Portfolio

Comprehensive audit findings and actionable correction roadmap for the Suman Das interactive portfolio website (`http://localhost:5173/`).

---

## 01 — Critical Problems

### 1.1 Hero Entrance Animation Plays Behind the Fullscreen Loader
- **Problem**: When the website loads, `Hero.tsx` triggers its GSAP entrance animation (`from` title yPercent, statement opacity, metadata) with a `delay: 0.1s`. Meanwhile, `Loader.tsx` is rendering a 1.6s counter followed by a 0.85s curtain reveal (~2.5s total). By the time the loader curtain finishes sliding up, the Hero text reveal animation has already played out underneath the opaque loader overlay.
- **File / Component**: [`src/sections/Hero.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Hero.tsx) & [`src/App.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/App.tsx)
- **Why it matters**: The user completely misses the signature typographic entrance animation on initial entry, making the hero appear static.
- **Recommended fix**: Pass `isReady={loaderFinished}` from `App.tsx` into `Hero.tsx`, and trigger the GSAP hero entrance timeline only when `isReady` becomes `true`.
- **Priority**: **HIGH**

### 1.2 Mobile Navigation Background Scroll Bleed
- **Problem**: When the mobile navigation drawer is toggled open (`mobileOpen === true`), the background page is not locked. The user can still scroll the page behind the drawer, causing jarring visual overlaps.
- **File / Component**: [`src/components/Navbar.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/components/Navbar.tsx)
- **Why it matters**: Disorienting user experience on mobile devices and touch screens.
- **Recommended fix**: Add an effect in `Navbar.tsx` that sets `document.body.style.overflow = 'hidden'` when `mobileOpen` is `true`, and pauses Lenis scrolling.
- **Priority**: **HIGH**

### 1.3 Lenis & ScrollTrigger Refresh Desync After Loader Unmount
- **Problem**: When the `Loader` completes and unmounts, the DOM layout shifts. `ScrollTrigger.refresh()` is never explicitly called after unmounting.
- **File / Component**: [`src/App.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/App.tsx)
- **Why it matters**: ScrollTrigger trigger points and scrub milestones for Kinetic Typography and Journey may be slightly misaligned.
- **Recommended fix**: Call `ScrollTrigger.refresh()` inside `handleLoaderComplete()` in `App.tsx`.
- **Priority**: **HIGH**

---

## 02 — Hero

### 2.1 "Journey" Ghost Button Bypasses Lenis Smooth Scroll
- **Problem**: In `Hero.tsx`, the primary CTA "Explore Work" uses `onClick={onScrollClick}` which smoothly scrolls with Lenis, but the secondary CTA `<a href="#about" className="btn-editorial-ghost"><span>Journey</span></a>` performs an unhandled browser anchor jump.
- **File / Component**: [`src/sections/Hero.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Hero.tsx#L112)
- **Why it matters**: Inconsistent interaction feel between adjacent buttons; one is smooth and inertial, the other is an instant jarring snap.
- **Recommended fix**: Add `onClick={(e) => { e.preventDefault(); onNavigate('about'); }}` to the button.
- **Priority**: **MEDIUM**

### 2.2 Mobile Vertical Stacking on Short Viewports (<670px)
- **Problem**: In `.hero-bottom-bar`, 4 items (Discipline, Education, Status, Scroll Down) stack vertically in a single column on mobile. On short mobile screens (such as iPhone SE at 375x667), the scroll indicator can get pushed down below the fold.
- **File / Component**: [`src/styles/sections.css`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/styles/sections.css) (`.hero-bottom-bar`)
- **Why it matters**: The scroll prompt is pushed out of the viewport on short screens.
- **Recommended fix**: On viewports `<768px`, format the bottom metadata as a compact 2x2 grid or inline tokens so the scroll indicator remains above the fold.
- **Priority**: **MEDIUM**

### 2.3 Headline Screen Reader Accessibility
- **Problem**: The headline split `<span className="hero-title-char">Suman</span>` and `<span className="hero-title-char">Das</span>` is fragmented for screen readers.
- **File / Component**: [`src/sections/Hero.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Hero.tsx#L81-L92)
- **Why it matters**: Screen readers might read them as separate fragmented tokens.
- **Recommended fix**: Add `aria-label="Suman Das"` on `<h1>` and `aria-hidden="true"` on the animated spans.
- **Priority**: **LOW**

---

## 03 — Navigation

### 3.1 Mobile Drawer Missing Keyboard Trap & Escape Listener
- **Problem**: When the mobile navigation overlay is open, pressing the `Escape` key does not close it, and pressing `Tab` cycles focus outside the drawer onto invisible background elements.
- **File / Component**: [`src/components/Navbar.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/components/Navbar.tsx)
- **Why it matters**: Violates WCAG 2.1 keyboard navigation criteria for overlay dialogs.
- **Recommended fix**: Add an `Escape` key event listener to close the drawer, and trap focus inside the drawer while open.
- **Priority**: **MEDIUM**

### 3.2 IntersectionObserver Ignores Kinetic Typography Section
- **Problem**: In `App.tsx`, the observed sections array is `['hero', 'intro', 'work', 'tech', 'exploring', 'about', 'contact']`. The kinetic typography section (`id="philosophy"`) is omitted.
- **File / Component**: [`src/App.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/App.tsx#L40)
- **Why it matters**: While scrolling through the kinetic manifesto, the navbar active state becomes unmapped.
- **Recommended fix**: Include `'philosophy'` in the observed sections list and map it to `'hero'`.
- **Priority**: **LOW**

### 3.3 Nav Item Labels Length on Tablet Breakpoints
- **Problem**: Using `CAPABILITIES` and `JOURNEY` takes extra horizontal width compared to `TECH` and `ABOUT`. On viewports between 768px and 880px, the nav links can get tight against the brand title.
- **File / Component**: [`src/components/Navbar.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/components/Navbar.tsx#L28-L33)
- **Why it matters**: Clutters the minimalist editorial top bar on mid-sized screens.
- **Recommended fix**: Use `WORK`, `TECH`, `ABOUT`, `CONTACT` for cleaner editorial balance.
- **Priority**: **LOW**

---

## 04 — Typography

### 4.1 Missing CSS Definition for `.hover-underline`
- **Problem**: In `Footer.tsx`, the class `className="label-editorial hover-underline"` is applied to social links, but `.hover-underline` is never defined in `typography.css` or `main.css`.
- **File / Component**: [`src/sections/Footer.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Footer.tsx#L28-L42)
- **Why it matters**: Hover states on footer links do not render the intended animated underline.
- **Recommended fix**: Define `.hover-underline` in `typography.css` with an animated `::after` underline effect.
- **Priority**: **MEDIUM**

### 4.2 Font Display Preload for Zero Layout Shift
- **Problem**: Google Fonts are loaded via `<link>` with `display=swap`, which can produce a momentary text reflow on cold cache.
- **File / Component**: [`index.html`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/index.html)
- **Why it matters**: Avoids Cumulative Layout Shift (CLS) when Space Grotesk loads.
- **Recommended fix**: Add `<link rel="preload" as="style" ...>` or font-display optimization.
- **Priority**: **LOW**

---

## 05 — Sections

### 5.1 GSAP ScrollTrigger Reversal Causes Flash on Scroll Direction Changes
- **Problem**: In `Intro.tsx` and `Journey.tsx`, `toggleActions: 'play none none reverse'` reverses animations when scrolling back up. If a user scrolls up slightly while reading, elements fade out and re-animate.
- **File / Component**: [`src/sections/Intro.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Intro.tsx) & [`src/sections/Journey.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Journey.tsx)
- **Why it matters**: Interrupts editorial reading flow.
- **Recommended fix**: Change `toggleActions` to `'play none none none'` or `once: true`.
- **Priority**: **MEDIUM**

### 5.2 TechStack & Contact Lack ScrollTrigger Entrance Motion
- **Problem**: While Hero, Intro, Kinetic, and Journey have GSAP ScrollTrigger reveals, TechStack and Contact are static.
- **File / Component**: [`src/sections/TechStack.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/TechStack.tsx) & [`src/sections/Contact.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Contact.tsx)
- **Why it matters**: Breaks visual pacing; a subtle staggered reveal would tie the entire narrative together.
- **Recommended fix**: Add GSAP ScrollTrigger entrance reveals matching the editorial aesthetic.
- **Priority**: **LOW**

---

## 06 — Projects (PujaPath)

### 6.1 Duplicated Word Typo in Technical Blueprint Modal
- **Problem**: In `SelectedWork.tsx`, line 244 contains `"This project is in active active development by Suman Das."`
- **File / Component**: [`src/sections/SelectedWork.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/SelectedWork.tsx#L244)
- **Why it matters**: Visible grammatical mistake in the architectural blueprint dialog.
- **Recommended fix**: Remove duplicated word: `"This project is in active development by Suman Das."`
- **Priority**: **HIGH**

### 6.2 Missing GitHub / Repository Action in Selected Work
- **Problem**: `portfolioData.projects[0]` defines `githubUrl: 'https://github.com/placeholder-suman/pujapath'`, but `SelectedWork.tsx` only renders "Technical Blueprint" and "Live Demo" / "Deployment Staging".
- **File / Component**: [`src/sections/SelectedWork.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/SelectedWork.tsx#L74-L102)
- **Why it matters**: Developers and recruiters cannot access or see the repository link.
- **Recommended fix**: Render a "Repository" / "Source" button linked to `project.githubUrl` with placeholder badge.
- **Priority**: **MEDIUM**

### 6.3 Technical Blueprint Modal Lacks Keyboard Escape Listener & Background Lock
- **Problem**: Opening the blueprint modal does not listen for `Escape` to close, and scrolling within the modal can cause background page scroll bleed.
- **File / Component**: [`src/sections/SelectedWork.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/SelectedWork.tsx#L169-L260)
- **Why it matters**: Standard modal accessibility and UX pattern.
- **Recommended fix**: Add `Escape` key handler and lock body scroll while modal is active.
- **Priority**: **MEDIUM**

### 6.4 Inline Styles in Technical Blueprint Modal
- **Problem**: The modal dialog is styled using extensive inline `style={{ ... }}` objects instead of CSS classes.
- **File / Component**: [`src/sections/SelectedWork.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/SelectedWork.tsx)
- **Why it matters**: Architectural consistency and maintainability.
- **Recommended fix**: Extract modal styling into `.modal-backdrop`, `.modal-content`, `.modal-header` in `components.css`.
- **Priority**: **LOW**

---

## 07 — Animations

### 7.1 CustomCursor Re-Attaches Event Listeners on First Mouse Movement
- **Problem**: `isVisible` state is included in the `useEffect` dependency array `[isTouch, reducedMotion, isVisible]`. When user moves mouse for the first time, `setIsVisible(true)` triggers effect cleanup and re-binding of all 4 window/document listeners.
- **File / Component**: [`src/components/CustomCursor.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/components/CustomCursor.tsx#L75)
- **Why it matters**: Inefficient effect teardown and RAF restart on the very first user interaction.
- **Recommended fix**: Handle visibility via CSS class / opacity toggle or ref without adding `isVisible` to the dependency array.
- **Priority**: **MEDIUM**

### 7.2 CustomCursor Uses `left`/`top` Instead of `transform: translate3d`
- **Problem**: The cursor dot and ring positions are updated in the RAF loop using `el.style.left` and `el.style.top`.
- **File / Component**: [`src/components/CustomCursor.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/components/CustomCursor.tsx) & [`src/styles/components.css`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/styles/components.css)
- **Why it matters**: Updating `left`/`top` triggers layout/paint recalculations, whereas `transform: translate3d()` is GPU-accelerated and strictly composite-only.
- **Recommended fix**: Update cursor elements using `transform = translate3d(${x}px, ${y}px, 0)` with fixed `top: 0; left: 0;`.
- **Priority**: **MEDIUM**

### 7.3 Exploring Section Hover Lacks Cursor Physics / Dimensional Response
- **Problem**: The hover effect currently only shifts text via CSS `padding-left`. The creative direction requested subtle cursor/movement interaction.
- **File / Component**: [`src/sections/Exploring.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Exploring.tsx)
- **Why it matters**: Can be elevated to feel much more responsive and tactile.
- **Recommended fix**: Add subtle mouse movement tracking on desktop to offset the text slightly based on cursor X/Y position.
- **Priority**: **LOW**

---

## 08 — Responsive / Mobile

### 8.1 Hero Vertical Spacing on Small Screens (375px–430px)
- **Problem**: Fluid clamp spacing on `.hero-content` can push bottom metadata close to the lower edge on small devices.
- **File / Component**: [`src/styles/sections.css`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/styles/sections.css)
- **Why it matters**: Compresses breathing room on phones like iPhone SE and Pixel 5.
- **Recommended fix**: Fine-tune margins with `clamp(1rem, 2vh, 2.5rem)`.
- **Priority**: **MEDIUM**

### 8.2 Tablet Grid Border Asymmetry (768px–1024px)
- **Problem**: In `.tech-grid`, `.tech-group` has `border-right: 1px solid var(--border)` on every item. On a 2-column layout, the 2nd item has an unnecessary outer border.
- **File / Component**: [`src/styles/sections.css`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/styles/sections.css) (`.tech-group`)
- **Why it matters**: Creates an asymmetrical border on the right edge.
- **Recommended fix**: Add `:nth-child(2n) { border-right: none; }` at 768px and `:nth-child(3n) { border-right: none; }` at 1100px.
- **Priority**: **LOW**

---

## 09 — Content

### 9.1 Visual Distinction for Configurable Placeholders
- **Problem**: Social links and project repository links use placeholders (`placeholder-sumandas`), but appear visually identical to verified active links.
- **File / Component**: [`src/sections/Contact.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Contact.tsx) & [`src/data/portfolio.ts`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/data/portfolio.ts)
- **Why it matters**: Visitors clicking the placeholder GitHub link might land on a 404 page.
- **Recommended fix**: Add a subtle label/pill: `"Placeholder — Update in portfolio.ts"`.
- **Priority**: **MEDIUM**

---

## 10 — Accessibility

### 10.1 External Links Missing Accessible New-Window Announcements
- **Problem**: External links with `target="_blank"` lack screen-reader accessible warnings that a new tab/window will be opened.
- **File / Component**: [`src/sections/Contact.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Contact.tsx), [`src/sections/Footer.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/Footer.tsx), [`src/sections/SelectedWork.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/SelectedWork.tsx)
- **Why it matters**: Violates WCAG 2.1 Success Criterion 3.2.5.
- **Recommended fix**: Add `aria-label="... (opens in new tab)"` or an accessible `<span className="sr-only"> (opens in new window)</span>`.
- **Priority**: **MEDIUM**

### 10.2 Toast Notification `aria-atomic` Attribute
- **Problem**: `Toast.tsx` uses `role="status" aria-live="polite"` but lacks `aria-atomic="true"`.
- **File / Component**: [`src/components/Toast.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/components/Toast.tsx)
- **Why it matters**: Some assistive technologies might not read the entire dynamic string when updated.
- **Recommended fix**: Add `aria-atomic="true"` to `toast-container`.
- **Priority**: **LOW**

---

## 11 — Performance

### 11.1 Loader Timing Calibration
- **Problem**: Total loader duration currently sits around ~2.7s (1.6s counter + 0.85s curtain exit - 0.2s overlap), slightly above the 1.5s–2.5s sweet spot.
- **File / Component**: [`src/components/Loader.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/components/Loader.tsx)
- **Why it matters**: Slightly slows perceived time-to-content.
- **Recommended fix**: Tighten counter duration to 1.3s and curtain reveal to 0.7s, targeting 2.0s total.
- **Priority**: **LOW**

### 11.2 Rollup Manual Chunk Splitting
- **Problem**: `dist/assets/index-zXhOAugH.js` is 392 kB (130 kB gzipped). GSAP, Lenis, and React are bundled together.
- **File / Component**: [`vite.config.ts`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/vite.config.ts)
- **Why it matters**: Vendor chunk splitting allows long-term caching of libraries independently of application code.
- **Recommended fix**: Add `manualChunks: { vendor: ['react', 'react-dom'], motion: ['gsap', 'lenis'] }` in `vite.config.ts`.
- **Priority**: **LOW**

---

## 12 — Code Quality

### 12.1 Unused Starter Assets in Source Tree
- **Problem**: `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, and `public/icons.svg` from the Vite starter template remain in the codebase.
- **File / Component**: `src/assets/*`, `public/icons.svg`
- **Why it matters**: Clutters the source tree and increases bundle inspection noise.
- **Recommended fix**: Safely delete the unreferenced legacy starter assets.
- **Priority**: **LOW**

### 12.2 KineticText Word Counter Mutable Pattern
- **Problem**: `let wordCounter = 0;` is declared in the component body and mutated during JSX `.map()`.
- **File / Component**: [`src/sections/KineticText.tsx`](file:///c:/Users/suman/Projects/Suman-Interactive-Portfolio/src/sections/KineticText.tsx#L51)
- **Why it matters**: Unidiomatic React pattern that can cause index misalignment during re-renders.
- **Recommended fix**: Pre-calculate word indices or flatten the words array with stable keys.
- **Priority**: **LOW**

---

## RECOMMENDED FIX ORDER

The exact execution sequence to implement tomorrow for maximum impact and stability:

1. **Step 1: Critical Synchronization & Scroll**
   - Synchronize Hero animation with Loader completion (`isReady={loaderFinished}`).
   - Add `ScrollTrigger.refresh()` upon Loader exit.
   - Lock body scroll & pause Lenis when mobile drawer is open.

2. **Step 2: Core UX & Interaction Fixes**
   - Fix "Journey" CTA button in Hero to use `handleNavigate` smooth scroll.
   - Fix typo in Blueprint modal (`active active` -> `active`).
   - Add repository button for PujaPath linking to `project.githubUrl`.
   - Add `Escape` key listeners and body scroll lock for both Mobile Drawer and Blueprint Modal.

3. **Step 3: Hardware-Accelerated Micro-Interactions**
   - Refactor `CustomCursor.tsx` to use GPU-accelerated `transform: translate3d()` and remove `isVisible` from effect dependencies.
   - Implement `.hover-underline` animation in `typography.css`.
   - Add subtle cursor physics to Currently Exploring rows.

4. **Step 4: Animation & Pacing Refinements**
   - Change `toggleActions` in `Intro` and `Journey` to `play none none none` to prevent flash during upward scrolling.
   - Add subtle ScrollTrigger reveals to `TechStack` and `Contact`.
   - Calibrate Loader timing to exactly ~2.0s.

5. **Step 5: Responsive & Accessibility Polish**
   - Add 2-column/3-column border symmetry rules for `.tech-grid`.
   - Add screen reader helper text for external `target="_blank"` links.
   - Add `aria-label` to Hero `<h1>` and `aria-atomic="true"` to Toast.

6. **Step 6: Optimization & Housekeeping**
   - Delete unused starter assets (`hero.png`, `react.svg`, `vite.svg`, `icons.svg`).
   - Add Rollup manual chunking in `vite.config.ts`.
   - Re-run `npm run build` and `oxlint` to verify pristine state.
