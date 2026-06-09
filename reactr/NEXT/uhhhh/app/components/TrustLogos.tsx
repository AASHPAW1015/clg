import Image from "next/image";

// Infinite horizontal marquee of school/company logos.
// The list is rendered TWICE back-to-back; the CSS animation slides the track
// by -50% so the second copy seamlessly takes over (no visible jump).
const LOGOS = [
  "goldmansachs",
  "google",
  "mit",
  "mckinsey",
  "deloitte",
  "duke",
  "harvard",
  "utaustin",
  "yale",
  "northwestern",
];

export default function TrustLogos() {
  return (
    <section className="py-20">
      <p className="px-6 text-center text-lg font-semibold text-white">
        Turbo AI is trusted by students and professionals at...
      </p>

      <div className="marquee-fade mt-12 overflow-hidden">
        <div className="marquee-track gap-20 pr-20">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <Image
              key={`${name}-${i}`}
              src={`/turbo/logos/${name}.svg`}
              alt={name}
              width={160}
              height={48}
              className="h-11 w-auto shrink-0 opacity-60 brightness-0 invert transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
