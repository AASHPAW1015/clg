import Image from "next/image";

// Testimonials grid. Some quotes have a purple-highlighted phrase (hl) the way
// the real site marks the punchy bit. `crest` points to a school PNG, or null.
type Quote = {
  school: string;
  crest: string | null;
  pre: string;
  hl?: string;
  post?: string;
  name: string;
};

const QUOTES: Quote[] = [
  {
    school: "Harvard Pre-med",
    crest: "harvard",
    pre: "My bio textbook is 500 pages, but Turbo AI makes podcasts of each chapter so I can listen during my long commutes or workouts.",
    name: "Olivia C.",
  },
  {
    school: "Mom (4 kids, 2 dogs)",
    crest: null,
    pre: "I always wanted to journal but was never consistent—life just got busy. Now I just talk to Turbo AI for 2 mins every night, and it turns my thoughts into neat daily entries automatically.",
    name: "Danielle T.",
  },
  {
    school: "MIT Education PhD",
    crest: "mit",
    pre: "Turbo AI ",
    hl: "outlines my research paper",
    post: ", then I go use my voice to tell it how I want each paragraph. I do the thinking, and Turbo AI does the writing.",
    name: "Elena R.",
  },
  {
    school: "Stanford Chemistry Major",
    crest: "stanford",
    pre: "Having ADHD makes focusing in organic chem lectures tough, so I ",
    hl: "record every class",
    post: " with Turbo. Then it quizzes me on reactions until I actually get them—went from a C+ to an A- this quarter.",
    name: "Sarah K.",
  },
  {
    school: "Yale Law Student",
    crest: "yale",
    pre: "Case law used to overwhelm me, but Turbo AI instantly turns my readings into flashcards and quizzes. Now I can actually keep up daily instead of cramming all night before exams.",
    name: "Marcus O.",
  },
  {
    school: "McKinsey Consultant",
    crest: null,
    pre: "Turbo AI ",
    hl: "records my meetings",
    post: " into notes, then I quickly edit them to highlight action items—makes follow-ups super easy.",
    name: "Jason A.",
  },
];

function Card({ q }: { q: Quote }) {
  return (
    <figure className="card-grad break-inside-avoid rounded-2xl border border-white/10 p-6">
      <figcaption className="flex items-center gap-3">
        {q.crest ? (
          <Image
            src={`/turbo/crests/${q.crest}.png`}
            alt={q.school}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
        ) : (
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand/20 text-sm font-semibold text-brand">
            {q.name.charAt(0)}
          </span>
        )}
        <span className="text-sm font-medium text-zinc-300">{q.school}</span>
      </figcaption>

      <blockquote className="mt-4 text-[15px] font-light leading-relaxed text-zinc-300">
        “{q.pre}
        {q.hl && (
          <span className="hl">
            <span>{q.hl}</span>
            <span aria-hidden />
          </span>
        )}
        {q.post}”
      </blockquote>

      <p className="mt-4 text-sm text-zinc-500">— {q.name}</p>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center">
        <p className="text-sm font-medium text-brand">Testimonials</p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
          Loved by students &amp; professionals
        </h2>
      </div>

      {/* Masonry-ish columns so cards of different heights pack nicely. */}
      <div className="mt-12 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
        {QUOTES.map((q) => (
          <Card key={q.name} q={q} />
        ))}
      </div>
    </section>
  );
}
