// "How It Works" — 4 numbered steps. Real copy from turbo.ai.
const STEPS = [
  {
    n: 1,
    icon: "☁️",
    title: "Upload Your Content",
    desc: "Record lectures live or upload PDFs, videos, audio files, and documents. Works with any format you need.",
  },
  {
    n: 2,
    icon: "⚡",
    title: "Let AI Process",
    desc: "Our AI transcribes and analyzes your content, identifying key concepts and creating structured editable notes.",
  },
  {
    n: 3,
    icon: "✨",
    title: "Get Study Materials",
    desc: "Receive comprehensive notes, flashcards, quizzes, and podcasts tailored to your learning needs.",
  },
  {
    n: 4,
    icon: "🎓",
    title: "Study & Succeed",
    desc: "Access materials anywhere, share with classmates, and use built-in study modes to ace your exams.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
          How It Works - It&apos;s Simple.
        </h2>
        <p className="mt-5 text-xl text-zinc-400">
          Transform any PDF, YouTube video, or audio into beautiful notes and
          study tools in four simple steps.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="card-grad rounded-2xl border border-white/10 p-6 text-center"
          >
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-2xl">
              {s.icon}
            </div>
            <div className="mt-4 text-sm font-semibold text-brand">
              Step {s.n}
            </div>
            <h3 className="mt-1 font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
