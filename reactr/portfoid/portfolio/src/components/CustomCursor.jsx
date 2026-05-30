import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    // Only enable on devices with a precise pointer (skip touch/mobile)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const ringEl = ring.current;
    const dotEl = dot.current;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    let raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dotEl.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
    };

    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;
      ringEl.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const over = (e) => {
      if (e.target.closest("a, button, input, textarea, .hoverable")) {
        ringEl.classList.add("is-hovering");
      }
    };
    const out = (e) => {
      if (e.target.closest("a, button, input, textarea, .hoverable")) {
        ringEl.classList.remove("is-hovering");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
