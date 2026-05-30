import { useEffect, useRef } from "react";

export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Ashutosh Pawar</span>
      <span>built in neovim · macOS</span>
    </footer>
  );
}

/* Wrap any block to fade it in on scroll */
export function Reveal({ children, as: Tag = "div", className = "", style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
