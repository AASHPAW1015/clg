import Link from "next/link";

// Stats row + the "Built for Students" gradient banner below it.
const STATS = [
  { value: "5M+", label: "Active Students" },
  { value: "99%", label: "Accuracy Rate" },
  { value: "30s", label: "Processing Time" },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {/* Stats */}
      <div className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <div key={s.label} className="py-6 text-center">
            <div className="text-4xl font-bold sm:text-5xl">{s.value}</div>
            <div className="mt-2 text-sm text-zinc-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Built for Students banner */}
      <div className="mt-12 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-r from-brand/30 to-brand/5 p-8 sm:flex-row">
        <div>
          <p className="text-sm font-medium text-brand">Built for Students</p>
          <h3 className="mt-1 text-2xl font-bold">
            Explore All Student Features
          </h3>
          <p className="mt-2 max-w-xl text-sm text-zinc-300">
            Learn how to record lectures, organize notes in folders, generate
            flashcards from any PDF, and create quizzes that actually help you
            study. See every feature built specifically for students.
          </p>
        </div>
        <Link
          href="#"
          aria-label="Explore student features"
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand text-xl text-white transition-transform hover:scale-105"
        >
          →
        </Link>
      </div>
    </section>
  );
}
