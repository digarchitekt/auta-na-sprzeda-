'use client';

import { useEffect, useRef, useState } from 'react';

const TICK_COUNT = 11;
const ARC_START_ANGLE = 135;
const ARC_SWEEP = 270;
const INNER_R = 52;
const OUTER_R = 60;
const NEEDLE_START_TIME = 0.2;
const WORD = 'AUTA NA SPRZEDAŻ';
const WORD_START_TIME = 0.7;

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [removed, setRemoved] = useState(false);
  const ticksRef = useRef<SVGGElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);

  // Build ticks + characters when shown
  useEffect(() => {
    if (!show) return;
    const ticks = ticksRef.current;
    const word = wordRef.current;
    if (!ticks || !word) return;

    // ticks
    for (let i = 0; i < TICK_COUNT; i++) {
      const angle = ARC_START_ANGLE + (ARC_SWEEP / (TICK_COUNT - 1)) * i;
      const rad = (angle * Math.PI) / 180;
      const isRedzone = i >= TICK_COUNT - 3;
      const x1 = 100 + INNER_R * Math.cos(rad);
      const y1 = 100 + INNER_R * Math.sin(rad);
      const x2 = 100 + OUTER_R * Math.cos(rad);
      const y2 = 100 + OUTER_R * Math.sin(rad);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(x1));
      line.setAttribute('y1', String(y1));
      line.setAttribute('x2', String(x2));
      line.setAttribute('y2', String(y2));
      line.setAttribute('stroke', isRedzone ? 'var(--preloader-red)' : '#444');
      line.setAttribute('stroke-width', isRedzone ? '2.5' : '1.5');
      line.classList.add('preloader-tick');
      if (isRedzone) line.classList.add('redzone');

      const delay = NEEDLE_START_TIME + i * 0.025;
      setTimeout(() => line.classList.add('active'), delay * 1000);
      ticks.appendChild(line);
    }

    // word characters
    WORD.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.classList.add('preloader-char');
      span.textContent = ch === ' ' ? ' ' : ch;
      if (ch === ' ') span.style.minWidth = '0.35em';
      const charDelay = WORD_START_TIME + i * (1 / 60);
      span.style.animation = 'preloaderCharReveal 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.4) forwards';
      span.style.animationDelay = `${charDelay}s`;
      word.appendChild(span);
    });

    const t = setTimeout(() => setRemoved(true), 1600);
    return () => clearTimeout(t);
  }, [show]);

  if (!show || removed) return null;

  return (
    <div id="preloader" aria-hidden="true">
      <div className="preloader-bg-flash" />
      <div className="preloader-tachometer">
        <svg viewBox="0 0 200 200">
          <circle className="preloader-arc-track" cx="100" cy="100" r="60" />
          <g ref={ticksRef} />
          <circle className="preloader-arc-progress" cx="100" cy="100" r="60" />
          <path className="preloader-redline" d="M 145 55 A 60 60 0 0 1 160 80" />
          <line className="preloader-needle-glow" x1="100" y1="100" x2="100" y2="48" />
          <line className="preloader-needle" x1="100" y1="100" x2="100" y2="46" />
          <circle className="preloader-center-dot" cx="100" cy="100" r="5" />
          <circle className="preloader-center-dot-inner" cx="100" cy="100" r="2" />
        </svg>
      </div>
      <div className="preloader-wordmark" ref={wordRef} />
    </div>
  );
}
