import Image from "next/image";
import Link from "next/link";

// Full-height (100vh) hero. Left column = announcement badge, "Meet Turbo"
// headline + mascot, subtitle and CTA. Right column = a detailed mock lecture
// note. A diagonal light "beam" sweeps in from the top-right.
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-12">
      {/* Diagonal beam from top-right + soft left glow (decorative). */}
      <Image
        src="/turbo/beams/lightbeam.webp"
        alt=""
        width={1200}
        height={1200}
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-40 w-[900px] opacity-80"
      />
      <Image
        src="/turbo/beams/leftCenterBeam.webp"
        alt=""
        width={900}
        height={900}
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 w-[600px] opacity-40"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_1fr]">
        {/* Left: copy */}
        <div>
          {/* Announcement badge */}
          <Link
            href="#"
            className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur transition-colors hover:bg-white/[0.07]"
          >
            <span className="text-xl">🎉</span>
            <span className="text-left text-sm leading-tight">
              <span className="block font-semibold text-white">
                We just hit 5M users!
              </span>
              <span className="block text-xs text-zinc-400">
                Read the announcement post.
              </span>
            </span>
            <span className="ml-1 text-zinc-400">→</span>
          </Link>

          <h1 className="relative mt-8 text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Meet Turbo
            <Image
              src="/turbo/beams/turboHero.webp"
              alt="Turbo mascot"
              width={150}
              height={150}
              priority
              className="absolute -top-10 right-2 h-24 w-24 sm:h-28 sm:w-28 lg:-right-4 lg:h-36 lg:w-36"
            />
          </h1>

          <p className="mt-6 max-w-lg text-2xl text-zinc-300 sm:text-3xl">
            Turn anything into notes, flashcards, quizzes, and more.
          </p>

          <Link
            href="#"
            className="mt-10 inline-block rounded-2xl bg-brand px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-brand/40 transition-colors hover:bg-violet-600"
          >
            Get Started - It&apos;s Free
          </Link>
        </div>

        {/* Right: detailed mock lecture note */}
        <LectureCard />
      </div>
    </section>
  );
}

// The mock "Lecture 5: Cellular Biology" note shown on the right of the hero.
function LectureCard() {
  return (
    <div className="card-grad rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
      <h3 className="flex items-center gap-2 text-lg font-bold">
        <span>📚</span> Lecture 5: Cellular Biology
      </h3>

      <p className="mt-4 text-sm text-zinc-400">
        The cell theory is one of the fundamental principles of biology. It
        states that:
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-zinc-300">
        {[
          "All living organisms are composed of one or more cells",
          "The cell is the basic unit of life",
          "All cells arise from pre-existing cells",
        ].map((t) => (
          <li key={t} className="flex gap-2">
            <span className="text-brand">•</span>
            {t}
          </li>
        ))}
      </ul>

      <h4 className="mt-5 flex items-center gap-2 font-semibold">
        <span>🧬</span> Types of Cells
      </h4>
      <p className="mt-2 text-sm text-zinc-400">
        There are two major types of cells, distinguished by their structural
        organization:
      </p>

      {/* Two cell "images" (CSS placeholders since the originals aren't public assets) */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <CellTile
          label="Prokaryotic Cell"
          emoji="🦠"
          from="from-red-500/30"
          to="to-orange-500/10"
        />
        <CellTile
          label="Eukaryotic Cell"
          emoji="🔬"
          from="from-emerald-500/30"
          to="to-yellow-500/10"
        />
      </div>

      {/* Comparison table */}
      <div className="mt-4 overflow-hidden rounded-lg border border-white/10 text-sm">
        <div className="grid grid-cols-3 bg-brand/15 font-medium">
          <span className="px-3 py-2">Feature</span>
          <span className="px-3 py-2">Prokaryotic</span>
          <span className="px-3 py-2">Eukaryotic</span>
        </div>
        <div className="grid grid-cols-3 text-zinc-300">
          <span className="px-3 py-2">Nucleus</span>
          <span className="px-3 py-2 text-zinc-400">No membrane-bound nucleus</span>
          <span className="px-3 py-2 text-zinc-400">Membrane-bound nucleus</span>
        </div>
      </div>
    </div>
  );
}

function CellTile({
  label,
  emoji,
  from,
  to,
}: {
  label: string;
  emoji: string;
  from: string;
  to: string;
}) {
  return (
    <div>
      <div
        className={`grid h-24 place-items-center rounded-lg border border-white/10 bg-gradient-to-br ${from} ${to} text-4xl`}
      >
        {emoji}
      </div>
      <p className="mt-1.5 text-center text-xs text-zinc-400">{label}</p>
    </div>
  );
}
