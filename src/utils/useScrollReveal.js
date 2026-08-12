/* ── useScrollReveal: IntersectionObserver-based scroll-reveal hook ── */

import { useRef, useEffect } from 'react';

/**
 * Custom hook that attaches an IntersectionObserver to reveal elements on scroll.
 * Adds the class 'revealed' when the element enters the viewport.
 * Respects prefers-reduced-motion.
 *
 * @param {Object} options
 * @param {number} options.threshold - intersection ratio to trigger (default 0.15)
 * @param {string} options.rootMargin - margin around root (default '0px')
 * @returns {React.RefObject} ref to attach to the target element
 */
export default function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
