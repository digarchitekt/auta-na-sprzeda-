'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  // Pinch-zoom transform state
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const touchStateRef = useRef({
    mode: 'none' as 'none' | 'swipe' | 'pinch' | 'pan',
    startX: 0,
    startY: 0,
    startDist: 0,
    startScale: 1,
    startTx: 0,
    startTy: 0,
    lastTap: 0,
  });

  const resetZoom = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  const close = useCallback(() => {
    setZoomed(false);
    resetZoom();
  }, [resetZoom]);

  // Reset zoom when changing image programmatically
  useEffect(() => {
    resetZoom();
  }, [active, resetZoom]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape' && zoomed) close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, close, zoomed]);

  // Lock body + html scroll when zoomed; compensate for scrollbar to avoid jump
  useEffect(() => {
    if (!zoomed) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollbarW = window.innerWidth - html.clientWidth;
    const orig = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      bodyTouchAction: body.style.touchAction,
    };
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      html.style.overflow = orig.htmlOverflow;
      body.style.overflow = orig.bodyOverflow;
      body.style.paddingRight = orig.bodyPaddingRight;
      body.style.touchAction = orig.bodyTouchAction;
    };
  }, [zoomed]);

  // Track if we're mounted client-side (for portal)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Wheel scroll → navigate
  useEffect(() => {
    if (!zoomed) return;
    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scale > 1.05) return;
      const now = Date.now();
      if (now - lastWheel < 350) return;
      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 10) return;
      lastWheel = now;
      if (delta > 0) next();
      else prev();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [zoomed, prev, next, scale]);

  // Native touch handlers (need passive: false to preventDefault)
  useEffect(() => {
    if (!zoomed) return;
    const el = modalRef.current;
    if (!el) return;

    const state = touchStateRef.current;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        state.mode = 'pinch';
        state.startDist = Math.hypot(
          t2.clientX - t1.clientX,
          t2.clientY - t1.clientY,
        );
        state.startScale = scale;
        state.startTx = tx;
        state.startTy = ty;
        return;
      }
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const now = Date.now();
        // Double-tap to toggle zoom
        if (now - state.lastTap < 280) {
          if (scale > 1.05) {
            resetZoom();
          } else {
            setScale(2);
          }
          state.lastTap = 0;
          state.mode = 'none';
          return;
        }
        state.lastTap = now;
        state.startX = t.clientX;
        state.startY = t.clientY;
        state.startTx = tx;
        state.startTy = ty;
        state.mode = scale > 1.05 ? 'pan' : 'swipe';
      }
    };

    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      if (state.mode === 'pinch' && e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(
          t2.clientX - t1.clientX,
          t2.clientY - t1.clientY,
        );
        const ratio = dist / state.startDist;
        const newScale = Math.max(1, Math.min(4, state.startScale * ratio));
        setScale(newScale);
        if (newScale <= 1.01) {
          setTx(0);
          setTy(0);
        }
      } else if (state.mode === 'pan' && e.touches.length === 1) {
        const t = e.touches[0];
        const dx = t.clientX - state.startX;
        const dy = t.clientY - state.startY;
        const maxPan = (scale - 1) * 200;
        setTx(Math.max(-maxPan, Math.min(maxPan, state.startTx + dx)));
        setTy(Math.max(-maxPan, Math.min(maxPan, state.startTy + dy)));
      }
    };

    const onEnd = (e: TouchEvent) => {
      if (state.mode === 'swipe' && e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        const dx = t.clientX - state.startX;
        const dy = t.clientY - state.startY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) next();
          else prev();
        }
      }
      state.mode = 'none';
    };

    el.addEventListener('touchstart', onStart, { passive: false });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd);
    el.addEventListener('touchcancel', onEnd);

    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  }, [zoomed, scale, tx, ty, prev, next, resetZoom]);

  // Main (non-zoomed) image swipe
  const [mainTouchX, setMainTouchX] = useState<number | null>(null);
  const onMainTouchStart = (e: React.TouchEvent) =>
    setMainTouchX(e.touches[0].clientX);
  const onMainTouchEnd = (e: React.TouchEvent) => {
    if (mainTouchX === null) return;
    const dx = e.changedTouches[0].clientX - mainTouchX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    setMainTouchX(null);
  };

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="group relative aspect-[16/10] cursor-zoom-in select-none overflow-hidden border border-bg-border bg-bg-elevated"
        onClick={() => setZoomed(true)}
        onTouchStart={onMainTouchStart}
        onTouchEnd={onMainTouchEnd}
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

      {/* Zoom overlay — rendered via portal to body to escape any stacking context */}
      {zoomed && mounted && createPortal(
        <div
          ref={modalRef}
          className="fixed inset-0"
          role="dialog"
          aria-modal="true"
          aria-label="Powiekszone zdjecie"
          style={{ touchAction: 'none', overscrollBehavior: 'contain', zIndex: 2147483646 }}
        >
          {/* Backdrop - click to close */}
          <div
            className="absolute inset-0 bg-black/95"
            onClick={close}
          />

          {/* Image container - centered */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active]}
              alt={alt}
              draggable={false}
              className="max-h-[90vh] max-w-[95vw] object-contain select-none"
              style={{
                transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
                transformOrigin: 'center center',
                transition:
                  touchStateRef.current.mode === 'none'
                    ? 'transform 220ms ease-out'
                    : 'none',
                willChange: 'transform',
              }}
            />
          </div>

          {/* Close X */}
          <button
            type="button"
            aria-label="Zamknij"
            onClick={close}
            className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center border border-bg-border bg-bg-elevated text-2xl text-text-primary hover:border-accent hover:text-accent"
          >
            ✕
          </button>

          {/* Prev — hidden on mobile when zoomed in (use swipe instead) */}
          <button
            type="button"
            aria-label="Poprzednie zdjecie"
            onClick={prev}
            className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center border border-bg-border bg-bg-elevated text-3xl text-text-primary hover:border-accent hover:text-accent"
          >
            ‹
          </button>

          {/* Next */}
          <button
            type="button"
            aria-label="Nastepne zdjecie"
            onClick={next}
            className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center border border-bg-border bg-bg-elevated text-3xl text-text-primary hover:border-accent hover:text-accent"
          >
            ›
          </button>

          {/* Counter */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 bg-bg-elevated px-3 py-1.5 text-sm text-text-secondary">
            {active + 1} / {images.length}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
