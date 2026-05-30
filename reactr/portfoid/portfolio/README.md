# Ashutosh Pawar — Portfolio

A multi-page React portfolio: Home / Work / About / Contact.
Vibrant light theme, smooth scrolling (Lenis), a custom cursor, a pixel-art cat
that follows your pointer, and a contact form that sends real email.

---

## Tech Stack

### Core

| Library | Version | Role |
|---|---|---|
| [React](https://react.dev) | 18.3.1 | UI framework |
| [Vite](https://vitejs.dev) | 5.4.2 | Build tool & dev server with Fast Refresh |
| [React Router DOM](https://reactrouter.com) | 6.26.2 | Client-side routing (hash-based) |
| [react-icons](https://react-icons.github.io/react-icons) | 5.6.0 | Icon set — Simple Icons used for tech logos |

### Animation & Interaction

| Feature | Where | How |
|---|---|---|
| **Smooth scrolling** | `App.jsx` | [Lenis](https://lenis.darkroom.engineering) v1.1.14 with custom exponential easing (`1.001 - 2^(-10t)`), 1.1 s duration, rAF loop |
| **Pixel cat** | `PixelCat.jsx` + `public/oneko.gif` | Oneko-style sprite animation — 32×32 sprite sheet, 100 ms frame rate, states: idle, sleeping, scratching, N/NE/E/SE/S/SW/W/NW walk |
| **Custom cursor** | `CustomCursor.jsx` | Ring + dot pair with 0.18 lerp factor per frame; hover detection swells the ring on `a`, `button`, `[data-hover]` |
| **Infinite carousel** | `LogoLoop.jsx` | Velocity-based `requestAnimationFrame` loop; `ResizeObserver` clones children until they fill the viewport; configurable speed, direction, and gap |
| **Scroll reveal** | `Layout.jsx` (`<Reveal>`) | `IntersectionObserver` adds `.visible` class once; CSS handles the fade-up transition |

### Styling

- **Fonts:** Bricolage Grotesque (400 / 600 / 800) + JetBrains Mono (400 / 500 / 700) via Google Fonts
- **CSS custom properties** for the whole colour palette: `--red`, `--blue`, `--green`, `--yellow`, `--pink`, `--cyan`, plus spacing and typography tokens in `:root`
- **Layout:** CSS Grid + Flexbox throughout; no CSS framework
- **GPU acceleration:** `translate3d()` on all animated elements

### External Services

- **[Web3Forms](https://web3forms.com)** — contact form email delivery, no backend required

---

## Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── jsconfig.json
├── public/
│   └── oneko.gif            # 32×32 sprite sheet used by PixelCat
└── src/
    ├── main.jsx             # ReactDOM.createRoot + HashRouter
    ├── App.jsx              # Lenis init, route definitions, scroll-to-top on nav
    ├── styles.css           # Global styles, theme variables, Lenis body class
    ├── components/
    │   ├── CustomCursor.jsx # Cursor ring/dot with lerp physics
    │   ├── PixelCat.jsx     # Oneko sprite cat that follows the cursor
    │   ├── Nav.jsx          # Top navigation bar
    │   ├── TechScroller.jsx # Skills section — two LogoLoop rows
    │   ├── LogoLoop.jsx     # Reusable infinite-scroll carousel
    │   └── Layout.jsx       # <Footer> + <Reveal> scroll-fade wrapper
    └── pages/
        ├── Home.jsx         # Hero, "What I do" trio, featured projects
        ├── Work.jsx         # Full project grid (PROJECTS array)
        ├── About.jsx        # Bio, stats, skills grid, certs, interests
        └── Contact.jsx      # Web3Forms form + direct contact links
```

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview    # preview the built output locally
```

---

## Editing Content

| What | File | Where |
|---|---|---|
| Projects | `src/pages/Work.jsx` | `PROJECTS` array |
| Bio / skills / interests | `src/pages/About.jsx` | top of the file |
| Contact links | `src/pages/Contact.jsx` | `LINKS` array |
| Hero copy | `src/pages/Home.jsx` | JSX at the top |
| Colours / fonts | `src/styles.css` | `:root` tokens |

---

## Notes

- The custom cursor and pixel cat only activate on `pointer: fine` devices (mouse/trackpad). Touch devices keep their default behaviour.
- The pixel cat respects `prefers-reduced-motion` — it hides itself when the system animation preference is set to reduce.
- Routing uses `HashRouter` so links like `/#/work` work on any static host without server config and never 404 on hard refresh.
- Lenis is torn down and re-instantiated cleanly on unmount; scroll position resets to the top on every route change.
