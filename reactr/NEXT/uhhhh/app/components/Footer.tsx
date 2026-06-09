import Image from "next/image";
import Link from "next/link";

// Final CTA band + footer link columns.
const COLUMNS = [
  {
    heading: "Products",
    links: ["AI Note Taker", "For Students", "Scholarship", "App Store", "Google Play"],
  },
  {
    heading: "Company",
    links: ["Sign Up", "Sign In", "Rebrand: Turbolearn AI → Turbo AI", "Blog"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Decorative beams behind the final CTA */}
      <Image
        src="/turbo/beams/bottomRightBeam.webp"
        alt=""
        width={900}
        height={900}
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 w-[600px] opacity-60"
      />
      <Image
        src="/turbo/beams/sunshine.webp"
        alt=""
        width={600}
        height={600}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 w-[400px] -translate-x-1/2 opacity-40"
      />

      {/* Final CTA */}
      <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
        <h2 className="text-4xl font-bold sm:text-6xl">Never write alone again</h2>
        <Link
          href="#"
          className="mt-8 inline-block rounded-full bg-brand px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition-colors hover:bg-violet-600"
        >
          Get Started - It&apos;s Free
        </Link>
      </div>

      {/* Link columns */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Image
              src="/turbo/site_logo.svg"
              alt="Turbo AI"
              width={80}
              height={20}
              className="brightness-0 invert"
            />
            <p className="mt-3 max-w-[200px] text-sm text-zinc-500">
              Turn anything into notes, flashcards, quizzes, and more.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-white">{col.heading}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="hover:text-white">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm text-zinc-500">
          © 2026 Turbolearn LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
