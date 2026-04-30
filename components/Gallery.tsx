'use client';

import { useCallback, useEffect, useState } from 'react';

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const prev = useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % images.length),
    [images.length],
  );

  // Keyboard navigation (active also when not zoomed)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape' && zoomed) setZoomed(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, zoomed]);

  // Lock scroll when zoomed
  useEffect(() => {
    if (zoomed) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [zoomed]);

  // Touch swipe
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    setTouchStartX(null);
  };

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="group relative aspect-[16/10] cursor-zoom-in select-none overflow-hidden border border-bg-border bg-bg-elevated"
        onClick={() => setZoomed(true)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={alt}
          className="h-full w-full object-cover"
        />

        {/* Prev */}
        <button
          type="button"
          aria-label="Poprzednie zdjecie"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-bg-border bg-bg/80 text-2xl text-text-primary opacity-0 backdrop-blur transition hover:border-accent hover:text-accent group-hover:opacity-100 focus:opacity-100"
        >
          ‹
        </button>
        {/* Next */}
        <button
          type="button"
          aria-label="Nastepne zdjecie"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-bg-border bg-bg/80 text-2xl text-text-primary opacity-0 backdrop-blur transition hover:border-accent hover:text-accent group-hover:opacity-100 focus:opacity-100"
        >
          ›
        </button>

        <div className="absolute bottom-3 right-3 bg-bg/80 px-2 py-1 text-xs text-text-secondary backdrop-blur">
          {active + 1} / {images.length}
        </div>
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-bg/80 px-2 py-1 text-xs text-text-secondary backdrop-blur">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M11 8v6M8 11h6" />
          </svg>
          Kliknij aby powiekszyc
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-7">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-[4/3] overflow-hidden border bg-bg-elevated transition-colors ${
              i === active ? 'border-accent' : 'border-bg-border hover:border-text-muted'
            }`}
            aria-label={`Zdjecie ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Zoom overlay */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Powiekszone zdjecie"
        >
          <button
            type="button"
            aria-label="Zamknij"
            onClick={() => setZoomed(false)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-bg-border bg-bg/80 text-xl text-text-primary backdrop-blur hover:border-accent hover:text-accent"
          >
            ✕
          </button>

          <button
            type="button"
            aria-label="Poprzednie zdjecie"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-bg-border bg-bg/80 text-3xl text-text-primary backdrop-blur hover:border-accent hover:text-accent"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Nastepne zdjecie"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-bg-border bg-bg/80 text-3xl text-text-primary backdrop-blur hover:border-accent hover:text-accent"
          >
            ›
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] object-contain"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-bg/80 px-3 py-1.5 text-sm text-text-secondary backdrop-blur">
            {active + 1} / {images.length} &middot; ESC aby zamknac &middot; ‹ ›
          </div>
        </div>
      )}
    </div>
  );
}
