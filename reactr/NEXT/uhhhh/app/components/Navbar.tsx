import Image from "next/image";
import Link from "next/link";

// Floating dark "pill" navbar + announcement banner, matching turbo.ai.
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center gap-3 px-4 pt-4">
      {/* Pill nav */}
      <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 pl-2">
          <Image
            src="/turbo/site_logo.svg"
            alt="Turbo AI"
            width={70}
            height={18}
            className="brightness-0 invert"
            priority
          />
        </Link>

        <div className="flex items-center gap-6 text-sm text-zinc-300">
          <Link href="#" className="hidden hover:text-white sm:block">
            Blog
          </Link>
          <Link href="#" className="hidden hover:text-white sm:block">
            Careers
          </Link>
          <Link
            href="#"
            className="rounded-full bg-brand px-4 py-1.5 font-medium text-white transition-colors hover:bg-violet-600"
          >
            Start now
          </Link>
        </div>
      </nav>
    </header>
  );
}
