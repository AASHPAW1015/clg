import { useEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Lenis from "lenis";

import Nav from "./components/Nav.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import PixelCat from "./components/PixelCat.jsx";
import { Footer } from "./components/Layout.jsx";
import TechScroller from "./components/TechScroller.jsx";

import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const lenisRef = useRef(null);
  const location = useLocation();

  // Init Lenis smooth scrolling once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <CustomCursor />
      <PixelCat />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <TechScroller />
      <Footer />
    </>
  );
}
