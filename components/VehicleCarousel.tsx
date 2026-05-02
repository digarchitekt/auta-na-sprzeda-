'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

export default function VehicleCarousel({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<string>('100vh');
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

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

  // Track mobile scroller arrows enabled state
  useEffect(() => {
    const el = mobileScrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
      const card = el.querySelector<HTMLElement>('[data-card]');
      const w = card?.offsetWidth ?? el.clientWidth;
      if (w > 0) setCurrentIdx(Math.round(el.scrollLeft / w));
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items.length]);

  const scrollMobile = (dir: 1 | -1) => {
    const el = mobileScrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile / tablet: horizontal snap scroller — one card centered per view */}
      <div className="relative lg:hidden">
        <div
          ref={mobileScrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {items.map((child, i) => (
            <div
              key={i}
              data-card
              className="shrink-0 basis-full snap-center px-5"
            >
              {child}
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        {items.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIdx ? 'w-6 bg-accent' : 'w-1.5 bg-bg-border'
                }`}
              />
            ))}
          </div>
        )}

        {/* Arrows */}
        <button
          type="button"
          aria-label="Poprzednie"
          onClick={() => scrollMobile(-1)}
          disabled={!canPrev}
          className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-bg-border bg-bg/85 text-2xl text-text-primary backdrop-blur transition disabled:opacity-30 hover:border-accent hover:text-accent"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Nastepne"
          onClick={() => scrollMobile(1)}
          disabled={!canNext}
          className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-bg-border bg-bg/85 text-2xl text-text-primary backdrop-blur transition disabled:opacity-30 hover:border-accent hover:text-accent"
        >
          ›
        </button>
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
