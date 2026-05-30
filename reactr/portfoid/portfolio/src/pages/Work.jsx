import { Reveal } from "../components/Layout.jsx";
import "./work.css";

const PROJECTS = [
  {
    name: "ClipDash",
    year: "2025–26",
    color: "var(--red)",
    tagline: "A live, self-hosted streaming service.",
    body: "A production YouTube → Discord clipping bot that streamers connect to with a single chat command. The core is built on an async FastAPI server backed by Firebase / Firestore, served from bare-metal Ubuntu behind an Nginx reverse proxy. Public access — and remote SSH management — are routed entirely through Cloudflare Tunnels, so there are no exposed ports and no static IP required. The deployment plan accounts for Gunicorn worker management, Redis-backed shared caching across workers, and rate limiting to protect the API quota.",
    tags: [
      "FastAPI",
      "Async Python",
      "Firebase",
      "Cloudflare Tunnels",
      "Nginx",
      "Redis",
    ],
    link: "https://clipdash.in",
    linkLabel: "clipdash.in ↗",
  },
  {
    name: "Blockchain Voting System",
    year: "2024",
    color: "var(--blue)",
    tagline: "Tamper-proof voting, built from scratch.",
    body: "Rather than incrementing a counter in a database, every vote is cryptographically hashed and chained to the one before it using SHA-256. A dual-verification layer cross-references the live MySQL store against an encrypted local snapshot (Python pickle) to detect server-side tampering the instant it happens. It implements custom genesis blocks, full chain-validation, and moderator tools to flag and repair invalid blocks — no blockchain libraries involved. A capstone exploration into cryptography, data structures, and database integrity.",
    tags: ["Python", "MySQL", "SHA-256", "Cryptography", "Pickle"],
    link: "https://github.com/AASHPAW1015/Blockchain-Voting-System",
    linkLabel: "View on GitHub ↗",
  },
  {
    name: "Blockchain Wallet",
    year: "2025",
    color: "var(--green)",
    tagline: "A digital wallet with an immutable ledger.",
    body: "A C++17 wallet where balances aren't stored as numbers — they are recomputed on demand by scanning an immutable, hash-linked transaction ledger. PINs are SHA-256 hashed and never stored in plaintext, state persists across sessions through custom File I/O serialization, and the whole interface renders a clean dashboard in the terminal using ANSI escape codes and iomanip formatting. Strict OOP throughout, with the cryptography engine, ledger, blocks, and accounts cleanly separated into modules.",
    tags: ["C++17", "OOP", "SHA-256", "File I/O", "ANSI UI"],
    link: "https://github.com/AASHPAW1015/clg/tree/main/Cpluh/midsemprojsem/digital_wallet",
    linkLabel: "View on GitHub ↗",
  },
  {
    name: "GTA: Vice City — Native macOS",
    year: "2026",
    color: "var(--pink)",
    tagline: "Resurrecting a deprecated engine.",
    body: "Got a decades-old game running natively on modern macOS using the reVC reverse-engineered engine — compiling it from source and working through a chain of build failures along the way. This was less about the game and more about software preservation: taking something abandoned and making it run on hardware it was never designed for. After it built successfully, I wrapped the whole launch flow into custom terminal commands.",
    tags: [
      "C++",
      "Reverse Engineering",
      "macOS",
      "Build Systems",
      "Preservation",
    ],
    link: null,
  },
  {
    name: "BmIC — BMI Calculator",
    year: "2026",
    color: "var(--yellow)",
    tagline: "Built from a hand-drawn wireframe.",
    body: "A React app whose centerpiece is an animated semicircular gauge drawn entirely in pure SVG — no chart library. The needle interpolates smoothly across five colour-coded segments as the BMI updates. State flows cleanly through the Context API (separate contexts for calculation and theme), with age-aware BMI ranges for adults and the elderly, metric / imperial unit toggling, an inline kg ↔ lbs converter, and a full warm-paper dark / light theme.",
    tags: ["React", "Pure SVG", "Context API", "Vite"],
    link: "https://github.com/AASHPAW1015/clg/tree/main/reactr/BMI/BmIC",
    linkLabel: "View on GitHub ↗",
  },
  {
    name: "AI Language Translator",
    year: "ongoing",
    color: "var(--cyan)",
    tagline: "Fine-tuning + retrieval-augmented generation.",
    body: "A translation system built on fine-tuned language models paired with a RAG pipeline for context-aware output. Currently in active development as a deep dive into the modern AI stack — model fine-tuning, retrieval, embeddings, and the engineering that holds it all together.",
    tags: ["AI", "RAG", "Fine-tuning", "LLMs", "Embeddings"],
    link: null,
    wip: true,
  },
];

export default function Work() {
  return (
    <main className="page">
      <div className="wrap">
        <Reveal className="sec-head" as="div">
          <span className="sec-num">02</span>
          <h2 className="sec-title">Selected Work</h2>
        </Reveal>
        <Reveal className="work-intro">
          <p>
            Six projects across cryptography, infrastructure, frontend, and
            reverse engineering. A few are live or shipped, one is mid-build —
            all of them taught me something I couldn't have learned from a
            tutorial.
          </p>
        </Reveal>

        <div className="projects">
          {PROJECTS.map((p) => (
            <Reveal key={p.name} className="project" style={{ "--c": p.color }}>
              <span className="project-bar" />
              <div className="project-head">
                <h3 className="project-name">
                  {p.name}
                  {p.wip && <span className="wip">in progress</span>}
                </h3>
                <span className="project-year">{p.year}</span>
              </div>
              <p className="project-tagline">{p.tagline}</p>
              <p className="project-body">{p.body}</p>
              <div className="project-foot">
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tech">
                      {t}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <a
                    className="project-link"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {p.linkLabel}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="also" as="p">
          Also built a pixel-faithful Red Bull homepage clone in plain HTML /
          CSS / JS.
        </Reveal>
        <Reveal as="p" className="no-ai">
          <em>No AI was used to code these projects.</em>
        </Reveal>
      </div>
    </main>
  );
}
