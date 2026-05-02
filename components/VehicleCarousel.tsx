'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

export default function VehicleCarousel({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<string>('100vh');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let active = window.matchMedia('(min-width: 1024px)').matches;
    let rafId = 0;

    const setupHeight = () => {
      if (!active) return;
      const trackW = track.scrollWidth;
      const vw = window.innerWidth;
      const horizontalRange = Math.max(0, trackW - vw + 96);
      setSectionHeight(`${horizontalRange + window.innerHeight}px`);
    };

    const compute = () => {
      if (!active) {
        setTranslateX(0);
        return;
      }
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = section.offsetHeight;
      const range = sectionH - vh;
      if (range <= 0) {
        setTranslateX(0);
        return;
      }
      const scrolled = Math.min(Math.max(0, -rect.top), range);
      const progress = scrolled / range;
      const trackW = track.scrollWidth;
      const vw = window.innerWidth;
      const maxX = Math.max(0, trackW - vw + 96);
      setTranslateX(progress * maxX);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(compute);
    };
    const onResize = () => {
      active = window.matchMedia('(min-width: 1024px)').matches;
      setupHeight();
      compute();
    };

    setupHeight();
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, [items.length]);

  return (
    <>
      {/* Mobile: simple vertical grid (no swipe, no scroll-jack) */}
      <div className="container-x grid gap-6 sm:grid-cols-2 lg:hidden">
        {items.map((child, i) => (
          <div key={i}>{child}</div>
        ))}
      </div>

      {/* Desktop: scroll-jacked horizontal pin */}
      <section
        ref={sectionRef}
        className="relative z-10 hidden lg:block"
        style={{ height: sectionHeight }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 pl-8 will-change-transform xl:pl-16"
            style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
          >
            {items.map((child, i) => (
              <div key={i} className="shrink-0 w-[400px] xl:w-[440px]">
                {child}
              </div>
            ))}
            <div className="shrink-0 w-12" aria-hidden />
          </div>
        </div>
      </section>
    </>
  );
}
