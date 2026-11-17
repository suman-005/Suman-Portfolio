# Suman Das — Interactive Portfolio

A premium, original, and highly interactive editorial personal portfolio for **Suman Das** (Web Developer · AI Enthusiast · BCA Student at Burdwan University 2024–2027).

Built with editorial typography, whitespace storytelling, kinetic typography, GSAP ScrollTrigger animations, Lenis smooth scrolling, and an authentic project showcase (**PujaPath**).

---

## ✦ Design & Engineering Principles

- **Authenticity First**: Truthful depiction of academic journey, technical competencies, and real-world projects. No fabricated clients, awards, or false experience metrics.
- **Editorial Typography**: High-contrast typographic scale pairing *Space Grotesk* for headlines with *Inter* for body readability and *JetBrains Mono* for coordinates, timestamps, and metadata.
- **Kinetic Typography**: Scroll-driven character and word assembly sequence powered by GSAP and ScrollTrigger.
- **Smooth Inertial Scrolling**: Powered by Lenis with unified GSAP RAF ticker synchronization.
- **Interactive Micro-Interactions**: Subtle desktop custom pointer with magnetic elements and lerping follower, automatically disabled on touch devices.
- **Full Accessibility (`a11y`)**: Semantic HTML landmarks, keyboard navigation, skip-to-content links, visible focus rings, and complete `@media (prefers-reduced-motion: reduce)` fallbacks.

---

## ✦ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite](https://vite.dev/)
- **Animation**: [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Quality**: [Oxlint](https://oxc.rs/)

---

## ✦ Centralized Data Configuration

All personal information, social links, skills, milestones, and project data are managed centrally in:
```
src/data/portfolio.ts
```

To update social links, email, or add new projects, edit `portfolioData` directly in `src/data/portfolio.ts` without touching components.

---

## ✦ Getting Started

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Linting
```bash
npx oxlint
```

---

## ✦ Author

**Suman Das**  
Burdwan, West Bengal, India  
BCA — Burdwan University (2024–2027)
