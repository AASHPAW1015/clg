"use client";

// Accordion — a Client Component because it tracks open/closed state with
// useState. Real questions & answers pulled from turbo.ai.
import { useState } from "react";

const FAQS = [
  {
    q: "What happened to TurboLearn? Why the name change to Turbo AI?",
    a: "We've rebranded from TurboLearn to Turbo AI to reflect the platform's full capabilities. Don't worry - everything you love about the platform remains the same! Your account, notes, and all features continue to work exactly as before.",
  },
  {
    q: "How do I record lectures and turn them into notes?",
    a: "Just hit the record button during class and Turbo AI captures everything. After your lecture, you'll get organized notes with all the key concepts, perfect for studying. It even works with different accents and technical terms from any subject.",
  },
  {
    q: "Can I convert my PDF textbooks into study materials?",
    a: "Yes! Upload any PDF - textbooks, research papers, lecture slides - and Turbo AI instantly creates notes, flashcards, and quizzes from them. Perfect for when you need to study a 50-page chapter but only have an hour.",
  },
  {
    q: "Is Turbo AI free to use?",
    a: "Yes! Turbo AI offers a generous free tier that includes note generation, flashcards, and quizzes. You can upgrade to unlock unlimited features and advanced AI capabilities.",
  },
  {
    q: "Can I create flashcards from YouTube videos?",
    a: "Yes! Just paste any YouTube link - lecture recordings, Khan Academy, Crash Course - and Turbo AI generates flashcards from the video content. Great for visual learners who prefer video lectures.",
  },
  {
    q: "Can I edit the notes after they're generated?",
    a: "Yes! We have a full Google Docs style editor you can use to add and customize your notes.",
  },
  {
    q: "Does it work for STEM subjects with formulas and diagrams?",
    a: "Absolutely! Turbo AI handles math formulas, chemical equations, physics diagrams, and code snippets. It recognizes and preserves formatting for technical content.",
  },
  {
    q: "Is there a desktop app?",
    a: "No, but it's coming soon!",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium"
      >
        {q}
        <span className="shrink-0 text-brand text-xl">{open ? "−" : "+"}</span>
      </button>
      {/* CSS grid trick for a smooth height transition. */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-5 text-lg text-zinc-400">
          Everything you need to know about Turbo AI
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {FAQS.map((f) => (
          <Item key={f.q} {...f} />
        ))}
      </div>
    </section>
  );
}
