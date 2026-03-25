import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to all `.fade-up` children of the returned ref.
 * Adds the "visible" class when each element enters the viewport.
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}
