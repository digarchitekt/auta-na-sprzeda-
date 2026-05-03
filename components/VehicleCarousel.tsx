'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

export default function VehicleCarousel({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<string>('100vh');

  // Mobile carousel state — JS-controlled, no native snap glitches
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef<boolean | null>(null);

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

  const goPrev = () => setIdx((i) => Math.max(0, i - 1));
  const goNext = () => setIdx((i) => Math.min(items.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (isHorizontalSwipe.current === null) {
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
      if (dx > 8 || dy > 8) {
        isHorizontalSwipe.current = dx > dy;
      }
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    if (isHorizontalSwipe.current === true) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) goNext();
        else goPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isHorizontalSwipe.current = null;
  };

  return (
    <>
      {/* Mobile / tablet: JS-controlled carousel — always perfectly centered */}
      <div className="overflow-hidden lg:hidden">
        <div
          className="flex"
          style={{
            transform: `translate3d(-${idx * 100}%, 0, 0)`,
            transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {items.map((child, i) => (
            <div
              key={i}
              className="shrink-0 basis-full px-5"
              aria-hidden={i !== idx}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Controls — arrows + dots below the card */}
        {items.length > 1 && (
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Poprzednie"
              onClick={goPrev}
              disabled={idx === 0}
              className="grid h-11 w-11 place-items-center border border-bg-border bg-bg-elevated text-2xl text-text-primary transition disabled:opacity-30 hover:border-accent hover:text-accent"
            >
              ‹
            </button>

            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Auto ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? 'w-6 bg-accent' : 'w-1.5 bg-bg-border'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Nastepne"
              onClick={goNext}
              disabled={idx === items.length - 1}
              className="grid h-11 w-11 place-items-center border border-bg-border bg-bg-elevated text-2xl text-text-primary transition disabled:opacity-30 hover:border-accent hover:text-accent"
            >
              ›
            </button>
          </div>
        )}
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
              <div key={i} className="shrink-0 w-[44vw] max-w-[640px]">
                {child}
              </div>
            ))}
            <div className="shrink-0 w-16" aria-hidden />
          </div>
        </div>
      </section>
    </>
  );
}
