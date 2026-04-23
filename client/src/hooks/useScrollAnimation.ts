import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to all scroll-animation targets
 * (`.fade-up`, `.slide-in-x`) inside the returned ref.
 * Adds the "visible" class when each element enters the viewport.
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targets = Array.from(
      ref.current?.querySelectorAll(".fade-up, .slide-in-x") ?? []
    );

    if (!("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(
          e => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.1 }
    );
    targets.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add("visible");
      }
      observer.observe(el);
    });
    document.documentElement.classList.add("hcs-animations-ready");
    return () => observer.disconnect();
  }, []);
  return ref;
}
