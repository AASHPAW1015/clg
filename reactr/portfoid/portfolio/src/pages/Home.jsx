import { Link } from "react-router-dom";
import { Reveal } from "../components/Layout.jsx";
import "./home.css";

const TRIO = [
  {
    color: "var(--red)",
    title: "Systems from scratch",
    body: "Custom blockchains, hash-linked ledgers, tamper detection — built down to the cryptography rather than pulled from a library.",
  },
  {
    color: "var(--blue)",
    title: "Real infrastructure",
    body: "A live, self-hosted service running on FastAPI, Firebase and Nginx, exposed to the world through Cloudflare Tunnels.",
  },
  {
    color: "var(--green)",
    title: "Making it work anywhere",
    body: "Virtualization, modding, and reviving deprecated software so it runs on hardware it was never meant to touch.",
  },
];

const FEATURED = [
  { name: "ClipDash", tag: "Live production service", color: "var(--red)" },
  { name: "Blockchain Voting System", tag: "Cryptography · Python", color: "var(--blue)" },
  { name: "GTA: Vice City — Native macOS", tag: "Reverse engineering", color: "var(--pink)" },
];

export default function Home() {
  return (
    <main className="page">
      <header className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner">
          <p className="eyebrow fade d1">
            <span className="ping" /> Computer Science Engineering · 1st Year · India
          </p>
          <h1 className="hero-title">
            <span className="fade d2">Ashutosh</span>
            <span className="fade d3 accent">Pawar<span className="caret">_</span></span>
          </h1>
          <p className="hero-lede fade d4">
            I make things work where they <em>don't belong</em> — blockchains
            from scratch, self-hosted services, and games resurrected on
            hardware they were never meant to run on.
          </p>
          <div className="hero-cta fade d5">
            <Link className="btn btn-solid" to="/work">See the work →</Link>
            <Link className="btn btn-ghost" to="/contact">Get in touch</Link>
          </div>
          <div className="hero-chips fade d6">
            <span className="chip" style={{ "--c": "var(--red)" }}>IBM-Certified · DevOps</span>
            <span className="chip" style={{ "--c": "var(--blue)" }}>Pro Videographer</span>
            <span className="chip" style={{ "--c": "var(--green)" }}>1000+ albums deep</span>
            <span className="chip" style={{ "--c": "var(--yellow)" }}>Neovim native</span>
          </div>
        </div>
      </header>

      <section className="wrap">
        <Reveal className="sec-head" as="div">
          <span className="sec-num">01</span>
          <h2 className="sec-title">What I do</h2>
        </Reveal>
        <div className="trio">
          {TRIO.map((t) => (
            <Reveal key={t.title} className="trio-card" style={{ "--c": t.color }}>
              <span className="trio-bar" />
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <Reveal className="sec-head" as="div">
          <span className="sec-num">02</span>
          <h2 className="sec-title">Featured</h2>
        </Reveal>
        <div className="featured">
          {FEATURED.map((f) => (
            <Reveal key={f.name} className="feat-row" style={{ "--c": f.color }}>
              <span className="feat-name">{f.name}</span>
              <span className="feat-tag">{f.tag}</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="feat-cta">
          <Link className="btn btn-ghost" to="/work">All projects →</Link>
        </Reveal>
      </section>
    </main>
  );
}
