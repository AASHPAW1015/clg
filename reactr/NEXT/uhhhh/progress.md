# Turbo AI Replica — Progress

A learning project: a replica of https://www.turbo.ai built with **Next.js 16
(App Router) + Tailwind CSS v4**. Goal is to learn how Next.js works.

> **v2 update:** rebuilt to match the *real* site — **dark theme**, real copy,
> real downloaded assets (logos, mascot, beams, school crests), a scrolling
> logo marquee, and the testimonial highlight style.

---

## 🎯 Main aim
Recreate turbo.ai's landing page faithfully using clean, well-commented React
components, with the actual brand assets and copy.

## 🧱 Tech stack
- Next.js 16 (App Router) — pages live in `app/`
- React 19
- Tailwind CSS v4 (configured in `app/globals.css` via `@import "tailwindcss"`)
- TypeScript

## 🎨 Design tokens (from the real site)
- Background: pure black `#000` + a **CSS starfield** (`.starfield`, a fixed
  full-page layer: an inline-SVG star tile generated with random scatter, plus
  faint teal + purple nebula radial-gradients). No star image exists on the real
  site — it's generated — so we generate ours too.
- Brand purple: `#6823FF`  → exposed in Tailwind as `bg-brand`, `text-brand`
- Cards: subtle gradient `.card-grad` + `border-white/10`
- **Scale:** big display headings (`sm:text-6xl`/`text-7xl`+), generous section
  padding (`py-28`), rounded-3xl feature cards — matches the real site's proportions.
- Custom CSS in `globals.css`: `.starfield`, `.card-grad`, `.hl` (purple
  highlight), `.marquee-track` + `@keyframes marquee`, `.marquee-fade` (edge mask).

## 📁 Project structure
```
public/turbo/            # REAL assets downloaded from assets.api-turbo.ai (curl)
  site_logo.svg          # wordmark
  beams/                 # turboHero (mascot) + light "beam" backgrounds (.webp)
  logos/                 # 10 school/company logos (.svg)
  crests/                # harvard / mit / stanford / yale (.png)
  studyGraphic.svg
app/
  layout.tsx             # root layout, fonts, metadata
  page.tsx               # stacks all sections in order
  globals.css            # Tailwind + dark theme + animations
  components/
    Navbar.tsx           # floating dark pill nav + "5M users" banner
    Hero.tsx             # FULL-HEIGHT (100vh): badge + "Meet Turbo" + mascot +
                         #   detailed "Lecture 5" note card (bullets, cell tiles, table)
    TrustLogos.tsx       # infinite logo marquee (list rendered x2)
    Features.tsx         # bento grid, enriched: file-tiles→"Generating Notes"→note
                         #   doc / collab doc + AI chat / quiz card / devices mockup
    HowItWorks.tsx       # 4 steps
    Stats.tsx            # 5M+/99%/30s + "Built for Students" banner
    Testimonials.tsx     # 6 real quotes, school crests, purple highlights
    FAQ.tsx              # accordion — CLIENT component (useState)
    Footer.tsx           # "Never write alone again" CTA + columns + beams
```

## ✅ Done
- [x] Downloaded all real assets with `curl` into `public/turbo/`
- [x] Dark theme + brand color `#6823FF` in `globals.css`
- [x] Floating pill navbar + announcement banner
- [x] Hero: **full-height (100vh)**, "5M users" badge in the left column,
      "Meet Turbo" + real mascot overlapping the headline, and a detailed
      "Lecture 5: Cellular Biology" note card (paragraph, bullets, two cell
      tiles, Prokaryotic/Eukaryotic comparison table) + diagonal light beam
- [x] Scrolling logo marquee (CSS animation, list duplicated for seamless loop)
- [x] Rebrand pill + "The last notetaker you'll ever need" intro
- [x] Bento feature grid (4 cards, real copy + mock chat UI)
- [x] How It Works (4 steps)
- [x] Stats + "Built for Students" gradient banner
- [x] Testimonials with real quotes, school crests, purple highlight spans
- [x] FAQ accordion (interactive, smooth grid-rows transition)
- [x] Footer with final CTA, link columns, beams
- [x] Space/starfield background + nebula glow behind the whole site
- [x] Scaled everything up (display headings, padding, card sizes) to match
- [x] Enriched feature cards: source file tiles → "Generating Notes…" → note doc
      (studyGraphic.svg); collab doc + AI chat bubble; quiz card; devices mockup
- [x] Verified: lint passes, all 34 images load (0 broken), HTTP 200

## 🔭 Things remaining / ideas to extend (good learning exercises)
- [ ] Mobile hamburger menu (another client component)
- [ ] Separate routes `/blog`, `/careers` (App Router file-based routing)
- [ ] Use `studyGraphic.svg` inside the "editable note" card for more fidelity
- [ ] Replace remaining emoji icons with real SVG icons
- [ ] Scroll-reveal animations (framer-motion or IntersectionObserver)
- [ ] Wire the hero upload box to a real form / server action

## 🧠 Next.js concepts demonstrated
- **App Router**: `app/page.tsx` = home route; `app/layout.tsx` wraps every page.
- **Server vs Client Components**: all default to Server (no JS shipped);
  only `FAQ.tsx` opts in with `"use client"` because it uses `useState`.
- **`next/image`**: every asset uses `<Image>` for automatic optimization
  (note the `/_next/image?url=...` requests in the network tab).
- **`next/link`**: client-side navigation.
- **`next/font`**: Geist fonts in `layout.tsx` (no layout shift).
- **Metadata API**: SEO title/description via exported `metadata`.
- **Tailwind v4**: configured purely in CSS (`@import` + `@theme`).

## ▶️ How to run
```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # check code style
```

## 📌 Notes for continuing in another IDE
- Each section is a standalone component in `app/components/` — edit one at a time.
- Copy/data lives in arrays at the top of each file; change the data, not the markup.
- All assets are local in `public/turbo/` — no internet needed at runtime.
- Brand color is the CSS var `--brand` in `globals.css` (`bg-brand`, `text-brand`).
- The marquee works by rendering the logo list **twice** and animating the track
  to `-50%`; tweak speed via the `32s` in `.marquee-track`.
- Testimonial highlights: wrap a phrase in the `.hl` span pattern (see Testimonials.tsx).
- This is a static front-end replica — no backend, links point to `#`.
