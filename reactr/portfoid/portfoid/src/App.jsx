import React, { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Ashutosh Pawar — Portfolio                                         */
/*  Self-contained single-file React component.                       */
/*  No external deps. Drop into any Vite/CRA project as App.jsx.       */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    name: "ClipDash",
    year: "2025–26",
    color: "#FF5436",
    tagline: "A live, self-hosted streaming service.",
    body: "A production YouTube → Discord clipping bot that streamers connect to with one command. Built on an async FastAPI core, backed by Firebase/Firestore, and served from bare-metal Ubuntu through an Nginx reverse proxy. Public access (and remote SSH) is routed entirely through Cloudflare Tunnels — no exposed ports, no static IP.",
    tags: ["FastAPI", "Firebase", "Cloudflare", "Nginx", "Async Python"],
    link: "https://clipdash.in",
    linkLabel: "clipdash.in",
  },
  {
    name: "Blockchain Voting System",
    year: "2024",
    color: "#2E5BFF",
    tagline: "Tamper-proof voting, built from scratch.",
    body: "Instead of incrementing a counter in a database, every vote is cryptographically hashed and chained to the one before it via SHA-256. A dual-verification layer cross-references the live MySQL store against an encrypted local snapshot (pickle) to flag server-side tampering the moment it happens. Custom genesis blocks, chain-validation, and moderator repair tools — no blockchain libraries.",
    tags: ["Python", "MySQL", "SHA-256", "Cryptography"],
    link: "https://github.com/AASHPAW1015/Blockchain-Voting-System",
    linkLabel: "View on GitHub",
  },
  {
    name: "Blockchain Wallet",
    year: "2025",
    color: "#06A77D",
    tagline: "A digital wallet with an immutable ledger.",
    body: "A C++17 wallet where balances aren't stored as numbers — they're recomputed by scanning an immutable, hash-linked transaction ledger. PINs are SHA-256 hashed (never plaintext), state persists across sessions via custom File I/O serialization, and the whole thing renders a clean dashboard in the terminal using ANSI escapes. Strict OOP, modular by design.",
    tags: ["C++17", "OOP", "Cryptography", "File I/O"],
    link: "https://github.com/AASHPAW1015/clg",
    linkLabel: "View on GitHub",
  },
  {
    name: "GTA: Vice City — Native macOS",
    year: "2026",
    color: "#FF3D81",
    tagline: "Resurrecting a deprecated engine.",
    body: "Got a decades-old game running natively on modern macOS using the reVC reverse-engineered engine — working through a chain of build failures to compile it from source. Less a game, more an exercise in software preservation: making something run on hardware it was never meant to touch.",
    tags: ["C++", "Reverse Engineering", "macOS", "Preservation"],
    link: null,
    linkLabel: null,
  },
  {
    name: "BmIC — BMI Calculator",
    year: "2026",
    color: "#F5A300",
    tagline: "Built from a hand-drawn wireframe.",
    body: "A React app with an animated semicircular gauge drawn in pure SVG — no chart library. The needle interpolates smoothly across five colour-coded segments. State is managed cleanly through the Context API, with age-aware BMI ranges, metric/imperial toggling, and a full dark/light theme.",
    tags: ["React", "Pure SVG", "Context API", "Vite"],
    link: "https://github.com/AASHPAW1015/clg",
    linkLabel: "View on GitHub",
  },
  {
    name: "AI Language Translator",
    year: "ongoing",
    color: "#00B4D8",
    tagline: "Fine-tuning + retrieval-augmented generation.",
    body: "A translation system built on fine-tuned models paired with a RAG pipeline for context-aware output. Currently in active development as a deep-dive into the modern AI stack — fine-tuning, retrieval, and everything around it.",
    tags: ["AI", "RAG", "Fine-tuning", "LLMs"],
    link: null,
    linkLabel: null,
    wip: true,
  },
];

const SKILLS = [
  {
    label: "Languages",
    color: "#FF5436",
    items: [
      "Python",
      "C++",
      "JavaScript",
      "TypeScript",
      "Go",
      "Lua",
      "Swift",
      "SQL",
      "NoSQL",
      "HTML",
      "CSS",
    ],
  },
  {
    label: "Frameworks & APIs",
    color: "#2E5BFF",
    items: ["React", "FastAPI", "gRPC"],
  },
  {
    label: "Infrastructure",
    color: "#06A77D",
    items: ["Linux", "Git", "Cloudflare", "Nginx", "Firebase / Firestore"],
  },
  {
    label: "Environment",
    color: "#F5A300",
    items: ["Neovim (custom config)", "macOS", "Shell scripting"],
  },
  {
    label: "Creative",
    color: "#FF3D81",
    items: ["Adobe Premiere Pro", "Rive", "Colour Grading", "Photography"],
  },
  {
    label: "Currently Learning",
    color: "#00B4D8",
    items: [
      "Advanced DevOps",
      "RAG & Fine-tuning",
      "Open-Source Collaboration",
    ],
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Portfolio() {
  const root = useReveal();

  return (
    <div ref={root} className="ap-root">
      <style>{CSS}</style>

      {/* ---------------- NAV ---------------- */}
      <nav className="ap-nav">
        <a href="#top" className="ap-logo">
          <span className="ap-logo-bracket">[</span>aashpaw
          <span className="ap-logo-bracket">]</span>
        </a>
        <div className="ap-nav-links">
          <a href="#about">about</a>
          <a href="#work">work</a>
          <a href="#skills">skills</a>
          <a href="#contact">contact</a>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <header id="top" className="ap-hero">
        <div className="ap-hero-grid" aria-hidden="true" />
        <div className="ap-hero-inner">
          <p className="ap-eyebrow fade fade-1">
            <span className="ap-dot" /> Computer Science Engineering · 1st Year
            · India
          </p>
          <h1 className="ap-title">
            <span className="ap-line fade fade-2">Ashutosh</span>
            <span className="ap-line fade fade-3">
              Pawar<span className="ap-cursor">_</span>
            </span>
          </h1>
          <p className="ap-lede fade fade-4">
            I make things work where they <em>don't belong</em> — blockchains
            from scratch, self-hosted services, and games resurrected on
            hardware they were never meant to run on.
          </p>
          <div className="ap-hero-cta fade fade-5">
            <a className="ap-btn ap-btn-solid" href="#work">
              See the work →
            </a>
            <a className="ap-btn ap-btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>
          <div className="ap-hero-chips fade fade-6">
            <span className="chip">IBM-Certified · DevOps</span>
            <span className="chip">Pro Videographer</span>
            <span className="chip">1000+ albums deep</span>
          </div>
        </div>
      </header>

      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="ap-section">
        <div className="ap-sec-head reveal">
          <span className="ap-sec-num">01</span>
          <h2 className="ap-sec-title">About</h2>
        </div>

        <div className="ap-about">
          <div className="ap-about-main reveal">
            <p>
              I'm a computer science undergrad who learns by building. I like
              working across the whole stack — from core logic and cryptography
              up to backend services and APIs — and I'd rather ship something,
              break it, and refine it than stay purely theoretical.
            </p>
            <p>
              A lot of what I do lives at the edges: virtualization, modding,
              and reviving deprecated software so it runs where it isn't
              supposed to. Alongside that, I study AI and quantum computing
              independently, and I genuinely enjoy breaking down complex ideas —
              which keeps creeping into how I think about clean software design.
            </p>
          </div>
          <div className="ap-about-side reveal">
            <div className="ap-card-stat">
              <span className="num" style={{ color: "#FF5436" }}>
                6+
              </span>
              <span className="lbl">shipped projects</span>
            </div>
            <div className="ap-card-stat">
              <span className="num" style={{ color: "#2E5BFF" }}>
                11
              </span>
              <span className="lbl">languages worked in</span>
            </div>
            <div className="ap-card-stat">
              <span className="num" style={{ color: "#06A77D" }}>
                1
              </span>
              <span className="lbl">live production service</span>
            </div>
          </div>
        </div>

        <div className="ap-tags-row reveal">
          {[
            "Reader (heavy on Stephen King)",
            "Photography & videography",
            "Sketching landscapes",
            "Bonsai",
            "Fashion",
            "Colour grading",
          ].map((t) => (
            <span key={t} className="ap-soft-tag">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- WORK ---------------- */}
      <section id="work" className="ap-section">
        <div className="ap-sec-head reveal">
          <span className="ap-sec-num">02</span>
          <h2 className="ap-sec-title">Selected Work</h2>
        </div>

        <div className="ap-projects">
          {PROJECTS.map((p, i) => (
            <article
              key={p.name}
              className="ap-project reveal"
              style={{ "--accent": p.color }}
            >
              <div className="ap-project-bar" />
              <div className="ap-project-head">
                <h3 className="ap-project-name">
                  {p.name}
                  {p.wip && <span className="ap-wip">in progress</span>}
                </h3>
                <span className="ap-project-year">{p.year}</span>
              </div>
              <p className="ap-project-tagline">{p.tagline}</p>
              <p className="ap-project-body">{p.body}</p>
              <div className="ap-project-foot">
                <div className="ap-project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="ap-tech">
                      {t}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <a
                    className="ap-project-link"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {p.linkLabel} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="ap-also reveal">
          Also built a pixel-faithful Red Bull homepage clone in plain HTML /
          CSS / JS.
        </p>
      </section>

      {/* ---------------- SKILLS ---------------- */}
      <section id="skills" className="ap-section">
        <div className="ap-sec-head reveal">
          <span className="ap-sec-num">03</span>
          <h2 className="ap-sec-title">Skills & Tools</h2>
        </div>

        <div className="ap-skills">
          {SKILLS.map((group) => (
            <div
              key={group.label}
              className="ap-skill-group reveal"
              style={{ "--accent": group.color }}
            >
              <h4 className="ap-skill-label">{group.label}</h4>
              <div className="ap-skill-items">
                {group.items.map((it) => (
                  <span key={it} className="ap-skill-chip">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="ap-section ap-contact">
        <div className="ap-sec-head reveal">
          <span className="ap-sec-num">04</span>
          <h2 className="ap-sec-title">Get in touch</h2>
        </div>

        <div className="ap-contact-inner reveal">
          <p className="ap-contact-lede">
            Building something, hiring, or just want to talk shop? I'm around.
          </p>
          <div className="ap-contact-links">
            <a
              className="ap-contact-card"
              href="mailto:aashpawcode@gmail.com"
              style={{ "--accent": "#FF5436" }}
            >
              <span className="ap-cc-label">Email</span>
              <span className="ap-cc-value">aashpawcode@gmail.com</span>
            </a>
            <a
              className="ap-contact-card"
              href="https://github.com/AASHPAW1015"
              target="_blank"
              rel="noreferrer"
              style={{ "--accent": "#2E5BFF" }}
            >
              <span className="ap-cc-label">GitHub</span>
              <span className="ap-cc-value">@AASHPAW1015</span>
            </a>
            <a
              className="ap-contact-card"
              href="https://www.linkedin.com/in/ashutoshkpawar/"
              target="_blank"
              rel="noreferrer"
              style={{ "--accent": "#06A77D" }}
            >
              <span className="ap-cc-label">LinkedIn</span>
              <span className="ap-cc-value">ashutoshkpawar</span>
            </a>
          </div>
        </div>

        <footer className="ap-footer">
          <span>© {new Date().getFullYear()} Ashutosh Pawar</span>
          <span className="ap-footer-mono">built in neovim · macOS</span>
        </footer>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                            */
/* ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=JetBrains+Mono:wght@400;500;700&display=swap');

.ap-root {
  --bg: #FBF6EC;
  --ink: #16130F;
  --muted: #6B6157;
  --line: #E4DACA;
  --card: #FFFDF8;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.ap-root * { box-sizing: border-box; }
.ap-root a { color: inherit; text-decoration: none; }

/* ---- NAV ---- */
.ap-nav {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px clamp(20px, 5vw, 72px);
  background: rgba(251,246,236,0.82);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.ap-logo { font-weight: 700; font-size: 16px; letter-spacing: -0.02em; }
.ap-logo-bracket { color: #FF5436; }
.ap-nav-links { display: flex; gap: clamp(14px, 3vw, 32px); font-size: 13px; }
.ap-nav-links a { position: relative; color: var(--muted); transition: color .2s; }
.ap-nav-links a:hover { color: var(--ink); }
.ap-nav-links a::after {
  content: ''; position: absolute; left: 0; bottom: -4px; height: 2px; width: 0;
  background: #FF5436; transition: width .2s;
}
.ap-nav-links a:hover::after { width: 100%; }

/* ---- HERO ---- */
.ap-hero {
  position: relative; padding: clamp(60px, 12vw, 140px) clamp(20px, 5vw, 72px) clamp(50px, 8vw, 100px);
  overflow: hidden;
}
.ap-hero-grid {
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(22,19,15,0.08) 1px, transparent 0);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 30% 0%, #000 30%, transparent 75%);
  mask-image: radial-gradient(ellipse 70% 60% at 30% 0%, #000 30%, transparent 75%);
  pointer-events: none;
}
.ap-hero-inner { position: relative; max-width: 1000px; }
.ap-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12px; letter-spacing: 0.04em; color: var(--muted);
  text-transform: uppercase; margin: 0 0 22px;
}
.ap-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #06A77D;
  box-shadow: 0 0 0 4px rgba(6,167,125,0.18);
  animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

.ap-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800; letter-spacing: -0.04em; line-height: 0.92;
  font-size: clamp(56px, 13vw, 156px);
  margin: 0 0 28px;
}
.ap-line { display: block; }
.ap-title .ap-line:nth-child(2) { color: #FF5436; }
.ap-cursor { color: var(--ink); animation: blink 1.1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.ap-lede {
  font-size: clamp(16px, 2vw, 21px); line-height: 1.6;
  max-width: 620px; color: #2c2620; margin: 0 0 34px;
}
.ap-lede em { font-style: normal; color: #FF3D81; font-weight: 700; }

.ap-hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 30px; }
.ap-btn {
  font-family: inherit; font-size: 14px; font-weight: 500;
  padding: 13px 22px; border-radius: 2px; transition: transform .15s, box-shadow .15s, background .2s;
}
.ap-btn-solid { background: var(--ink); color: var(--bg); }
.ap-btn-solid:hover { background: #FF5436; transform: translateY(-2px); box-shadow: 0 8px 0 -2px rgba(255,84,54,0.25); }
.ap-btn-ghost { border: 1.5px solid var(--ink); }
.ap-btn-ghost:hover { background: var(--ink); color: var(--bg); transform: translateY(-2px); }

.ap-hero-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chip {
  font-size: 12px; padding: 6px 12px; border-radius: 100px;
  border: 1px solid var(--line); background: var(--card); color: var(--muted);
}

/* ---- SECTIONS ---- */
.ap-section { padding: clamp(50px, 8vw, 110px) clamp(20px, 5vw, 72px); max-width: 1200px; margin: 0 auto; }
.ap-sec-head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 48px; }
.ap-sec-num { font-size: 13px; color: #FF5436; font-weight: 700; }
.ap-sec-title {
  font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
  font-size: clamp(30px, 5vw, 52px); letter-spacing: -0.03em; margin: 0;
}

/* ---- ABOUT ---- */
.ap-about { display: grid; grid-template-columns: 1.6fr 1fr; gap: clamp(28px, 5vw, 64px); align-items: start; }
.ap-about-main p { font-size: clamp(15px, 1.6vw, 18px); line-height: 1.75; color: #2c2620; margin: 0 0 20px; }
.ap-about-side { display: flex; flex-direction: column; gap: 16px; }
.ap-card-stat {
  background: var(--card); border: 1px solid var(--line); border-radius: 4px;
  padding: 20px 22px; display: flex; flex-direction: column; gap: 4px;
}
.ap-card-stat .num { font-family: 'Bricolage Grotesque'; font-weight: 800; font-size: 40px; line-height: 1; }
.ap-card-stat .lbl { font-size: 12px; color: var(--muted); }

.ap-tags-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 40px; }
.ap-soft-tag {
  font-size: 12.5px; padding: 7px 13px; background: var(--bg);
  border: 1px dashed var(--line); border-radius: 100px; color: var(--muted);
}

/* ---- PROJECTS ---- */
.ap-projects { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
.ap-project {
  position: relative; background: var(--card); border: 1px solid var(--line);
  border-radius: 6px; padding: 30px 28px 26px; overflow: hidden;
  transition: transform .2s, box-shadow .2s, border-color .2s;
}
.ap-project:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 14px 30px -18px var(--accent);
}
.ap-project-bar { position: absolute; top: 0; left: 0; height: 5px; width: 100%; background: var(--accent); }
.ap-project-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 6px; }
.ap-project-name {
  font-family: 'Bricolage Grotesque'; font-weight: 700; font-size: 22px;
  letter-spacing: -0.02em; margin: 0; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
}
.ap-wip {
  font-family: 'JetBrains Mono'; font-size: 10px; font-weight: 500; text-transform: uppercase;
  padding: 3px 8px; border-radius: 100px; background: var(--accent); color: #fff; letter-spacing: 0.05em;
}
.ap-project-year { font-size: 12px; color: var(--muted); white-space: nowrap; }
.ap-project-tagline { color: var(--accent); font-weight: 500; font-size: 14px; margin: 0 0 14px; }
.ap-project-body { font-size: 14px; line-height: 1.65; color: #43392f; margin: 0 0 20px; }
.ap-project-foot { display: flex; flex-direction: column; gap: 16px; }
.ap-project-tags { display: flex; flex-wrap: wrap; gap: 7px; }
.ap-tech {
  font-size: 11px; padding: 5px 10px; border-radius: 3px;
  background: var(--bg); border: 1px solid var(--line); color: var(--muted);
}
.ap-project-link {
  align-self: flex-start; font-size: 13px; font-weight: 500; color: var(--accent);
  border-bottom: 1.5px solid transparent; transition: border-color .15s;
}
.ap-project-link:hover { border-color: var(--accent); }
.ap-also { margin-top: 30px; font-size: 13.5px; color: var(--muted); text-align: center; }

/* ---- SKILLS ---- */
.ap-skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.ap-skill-group {
  background: var(--card); border: 1px solid var(--line); border-radius: 6px;
  padding: 22px 22px 24px; border-top: 4px solid var(--accent);
}
.ap-skill-label { font-family: 'Bricolage Grotesque'; font-weight: 700; font-size: 16px; margin: 0 0 16px; }
.ap-skill-items { display: flex; flex-wrap: wrap; gap: 8px; }
.ap-skill-chip {
  font-size: 12.5px; padding: 6px 11px; border-radius: 3px;
  background: var(--bg); border: 1px solid var(--line); transition: background .15s, color .15s, border-color .15s;
}
.ap-skill-group:hover .ap-skill-chip { border-color: var(--accent); }

/* ---- CONTACT ---- */
.ap-contact-lede { font-size: clamp(16px, 2vw, 20px); color: #2c2620; margin: 0 0 32px; max-width: 560px; }
.ap-contact-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ap-contact-card {
  background: var(--card); border: 1px solid var(--line); border-radius: 6px;
  padding: 24px 22px; display: flex; flex-direction: column; gap: 8px;
  transition: transform .18s, border-color .18s, box-shadow .18s;
}
.ap-contact-card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 12px 26px -16px var(--accent); }
.ap-cc-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); font-weight: 700; }
.ap-cc-value { font-size: 15px; word-break: break-all; }

.ap-footer {
  margin-top: 60px; padding-top: 24px; border-top: 1px solid var(--line);
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  font-size: 12px; color: var(--muted);
}

/* ---- ANIMATIONS ---- */
.fade { opacity: 0; transform: translateY(16px); animation: fadeUp .7s cubic-bezier(.2,.7,.2,1) forwards; }
.fade-1 { animation-delay: .05s; } .fade-2 { animation-delay: .15s; }
.fade-3 { animation-delay: .28s; } .fade-4 { animation-delay: .42s; }
.fade-5 { animation-delay: .54s; } .fade-6 { animation-delay: .64s; }
@keyframes fadeUp { to { opacity: 1; transform: none; } }

.reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s cubic-bezier(.2,.7,.2,1); }
.reveal.is-visible { opacity: 1; transform: none; }

@media (max-width: 820px) {
  .ap-about { grid-template-columns: 1fr; }
  .ap-projects { grid-template-columns: 1fr; }
  .ap-skills { grid-template-columns: 1fr 1fr; }
  .ap-contact-links { grid-template-columns: 1fr; }
  .ap-nav-links { gap: 16px; }
}
@media (max-width: 520px) {
  .ap-skills { grid-template-columns: 1fr; }
  .ap-nav-links a:nth-child(1) { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .fade, .reveal { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }
  .ap-cursor, .ap-dot { animation: none !important; }
}
`;
