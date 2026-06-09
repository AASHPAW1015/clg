import Image from "next/image";
import Link from "next/link";

// Feature "bento" grid. Intro (rebrand pill + big heading) sits above a 2-col
// grid; the first two cards span full width, the last two share a row.
export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-28">
      {/* Rebrand pill */}
      <div className="flex justify-center">
        <Link
          href="#"
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/10"
        >
          ✨ We&apos;re now <span className="font-semibold text-white">Turbo AI</span>{" "}
          <span className="text-zinc-500">(formerly Turbolearn AI)</span>{" "}
          <span className="text-brand">→</span>
        </Link>
      </div>

      <div className="mx-auto mt-10 max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
          The last notetaker you&apos;ll ever need
        </h2>
        <p className="mt-5 text-xl text-zinc-400">
          Turbo AI records live, edits, comments and collaborates like a real
          assistant.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {/* Card 1 — editable notes (full width) */}
        <div className="card-grad overflow-hidden rounded-3xl border border-white/10 p-10 sm:col-span-2">
          <h3 className="text-3xl font-semibold">
            Turn anything into an editable note.
          </h3>
          <p className="mt-3 text-lg text-zinc-400">
            Transform PDFs, videos, and audio into notes you can edit and share.
          </p>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[auto_1fr_1.2fr]">
            {/* Source file tiles */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { t: "▶", l: "YouTube", c: "bg-red-600" },
                { t: "DOC", l: "", c: "bg-blue-600" },
                { t: "PPT", l: "", c: "bg-orange-500" },
                { t: "🎙", l: "", c: "bg-brand" },
                { t: "TXT", l: "", c: "bg-zinc-600" },
                { t: "PDF", l: "", c: "bg-rose-600" },
              ].map((f, i) => (
                <span
                  key={i}
                  className={`grid h-14 w-14 place-items-center rounded-xl ${f.c} text-xs font-bold text-white shadow-lg`}
                >
                  {f.t}
                </span>
              ))}
            </div>

            {/* Generating pill */}
            <div className="flex items-center justify-center">
              <span className="rounded-full border border-white/10 bg-black/50 px-6 py-3 text-sm text-zinc-300">
                Generating Notes…
              </span>
            </div>

            {/* Resulting note */}
            <Image
              src="/turbo/studyGraphic.svg"
              alt="Generated note preview"
              width={468}
              height={238}
              className="w-full rounded-xl border border-white/10"
            />
          </div>
        </div>

        {/* Card 2 — live collaboration (full width) */}
        <div className="card-grad rounded-3xl border border-white/10 p-10 sm:col-span-2">
          <h3 className="text-3xl font-semibold">Live collaboration</h3>
          <p className="mt-3 text-lg text-zinc-400">
            Turbo AI actively works alongside you — editing your doc,
            highlighting issues, adding AI comments.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {/* Doc with collaborator tags */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <p className="relative inline-block text-lg font-semibold text-zinc-200">
                European Fintech Market Strategy
                <span className="absolute -right-12 -top-2 rounded bg-brand px-1.5 py-0.5 text-[10px] text-white">
                  TurboAI
                </span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Our initial analysis supports three key initiatives to accelerate
                market entry. The primary focus involves forming partnerships
                with major regional banks, leveraging their established
                regulatory standing and extensive customer networks. Additionally,
                we recommend prioritizing Germany…
              </p>
            </div>

            {/* AI chat bubble */}
            <div className="flex flex-col justify-between gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-2">
                  <Image
                    src="/turbo/beams/turboHero.webp"
                    alt="Turbo AI"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <span className="font-semibold">Turbo AI</span>
                </div>
                <p className="mt-3 text-xl">Be more specific, which markets?</p>
                <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">
                  <span>12 Seconds ago</span>
                  <button className="text-brand">Reply</button>
                </div>
              </div>
              <p className="text-right text-sm text-zinc-400">
                Turbo AI is available to chat all the time —{" "}
                <span className="text-brand">the perfect teammate.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 — study smarter (with quiz) */}
        <div className="card-grad rounded-3xl border border-white/10 p-10">
          <h3 className="text-3xl font-semibold">Study smarter, not harder.</h3>
          <p className="mt-3 text-lg text-zinc-400">
            Formerly, Turbolearn - students love us. Generate quizzes, podcasts,
            flashcards from your notes.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6">
            <p className="font-medium">
              Which of the following best explains why entropy increases in a
              closed system over time?
            </p>
            <div className="mt-4 space-y-3 text-sm">
              {[
                ["A", "Energy is destroyed during reactions"],
                ["B", "Atoms lose mass as they move"],
                ["C", "The number of possible arrangements increases"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-white/10 text-xs font-semibold">
                    {k}
                  </span>
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 4 — all devices */}
        <div className="card-grad relative overflow-hidden rounded-3xl border border-white/10 p-10">
          <h3 className="text-3xl font-semibold">
            All your devices. Always synced.
          </h3>
          <p className="mt-3 text-lg text-zinc-400">
            Turbo AI works on the web and mobile. Desktop app coming next month!
          </p>

          {/* Device mockups + mascot */}
          <div className="mt-10 flex items-end justify-center gap-4">
            <div className="h-40 w-28 rounded-2xl border border-white/10 bg-gradient-to-b from-brand/30 to-black/60 p-3">
              <div className="h-2 w-1/2 rounded bg-white/30" />
              <div className="mt-3 space-y-2">
                <div className="h-1.5 w-full rounded bg-white/15" />
                <div className="h-1.5 w-4/5 rounded bg-white/15" />
                <div className="h-1.5 w-full rounded bg-white/15" />
              </div>
            </div>
            <Image
              src="/turbo/beams/turboHero.webp"
              alt="Turbo mascot"
              width={120}
              height={120}
              className="h-28 w-28"
            />
            <div className="h-28 w-20 rounded-2xl border border-white/10 bg-gradient-to-b from-brand/20 to-black/60 p-2">
              <div className="h-1.5 w-1/2 rounded bg-white/25" />
              <div className="mt-2 space-y-1.5">
                <div className="h-1 w-full rounded bg-white/15" />
                <div className="h-1 w-3/4 rounded bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
