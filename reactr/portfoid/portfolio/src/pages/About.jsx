import { Reveal } from "../components/Layout.jsx";
import "./about.css";

const SKILLS = [
  { label: "Languages", color: "var(--red)", items: ["Python", "C++", "JavaScript", "TypeScript", "Go", "Lua", "Swift", "SQL", "NoSQL", "HTML", "CSS"] },
  { label: "Frameworks & APIs", color: "var(--blue)", items: ["React", "FastAPI", "gRPC"] },
  { label: "Infrastructure", color: "var(--green)", items: ["Linux", "Git", "Cloudflare", "Nginx", "Firebase / Firestore"] },
  { label: "Environment", color: "var(--yellow)", items: ["Neovim (custom config)", "macOS", "Shell scripting"] },
  { label: "Creative", color: "var(--pink)", items: ["Adobe Premiere Pro", "Rive", "Colour Grading", "Photography"] },
  { label: "Currently learning", color: "var(--cyan)", items: ["Advanced DevOps", "RAG & Fine-tuning", "Open-Source Collaboration"] },
];

const INTERESTS = [
  "Reader — deep into Stephen King",
  "1000+ albums across rock, hip hop, metal, jazz, classical, shoegaze",
  "Photography & videography (Vivo X200 Pro)",
  "Sketching landscapes",
  "Bonsai",
  "Fashion",
];

export default function About() {
  return (
    <main className="page">
      <div className="wrap">
        <Reveal className="sec-head" as="div">
          <span className="sec-num">03</span>
          <h2 className="sec-title">About</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-bio">
            <p>
              I'm a first-year computer science undergrad who learns by
              building. I'm drawn to programming, problem-solving, and
              understanding how technology actually works at a fundamental
              level — and I like working across the whole stack, from core
              logic and cryptography up to backend services and APIs.
            </p>
            <p>
              My approach is hands-on and iterative: I'd rather build something,
              test it in practice, and refine it through real use than stay
              purely theoretical. A lot of my favourite work lives at the edges —
              virtualization, modding, and reviving deprecated software so it
              runs where it isn't supposed to.
            </p>
            <p>
              Alongside development I study artificial intelligence and quantum
              computing independently, and I genuinely enjoy teaching and
              breaking down complex ideas — which keeps shaping how I think
              about clarity in software. I'm driven by curiosity, long-term
              thinking, and building things that are well-reasoned, scalable,
              and actually useful.
            </p>
          </Reveal>

          <Reveal className="about-stats">
            <div className="stat"><span className="num" style={{ color: "var(--red)" }}>6+</span><span className="lbl">shipped / built projects</span></div>
            <div className="stat"><span className="num" style={{ color: "var(--blue)" }}>11</span><span className="lbl">languages worked in</span></div>
            <div className="stat"><span className="num" style={{ color: "var(--green)" }}>1</span><span className="lbl">live production service</span></div>
          </Reveal>
        </div>

        <Reveal className="creds">
          <div className="cred" style={{ "--c": "var(--blue)" }}>
            <span className="cred-k">Certification</span>
            <span className="cred-v">IBM-Certified — DevOps</span>
          </div>
          <div className="cred" style={{ "--c": "var(--green)" }}>
            <span className="cred-k">Experience</span>
            <span className="cred-v">Professional videographer — hired by a college as an NTA videographer</span>
          </div>
          <div className="cred" style={{ "--c": "var(--yellow)" }}>
            <span className="cred-k">Setup</span>
            <span className="cred-v">Custom Neovim configuration on macOS</span>
          </div>
        </Reveal>

        {/* Skills */}
        <Reveal className="sub-head" as="h3">Skills & Tools</Reveal>
        <div className="skills">
          {SKILLS.map((g) => (
            <Reveal key={g.label} className="skill-group" style={{ "--c": g.color }}>
              <h4 className="skill-label">{g.label}</h4>
              <div className="skill-items">
                {g.items.map((it) => <span key={it} className="skill-chip">{it}</span>)}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Beyond code */}
        <Reveal className="sub-head" as="h3">Beyond the code</Reveal>
        <div className="interests">
          {INTERESTS.map((t, i) => (
            <Reveal key={t} className="interest" style={{ "--c": `var(--${["red","blue","green","yellow","pink","cyan"][i % 6]})` }}>
              {t}
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
