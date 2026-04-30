'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  to: number;
  /** Decimals to show (e.g. 1 for "4.7") */
  decimals?: number;
  /** Optional separator for thousands */
  thousandSep?: string;
  /** Suffix string (e.g. "+") */
  suffix?: string;
  /** Animation duration in ms */
  duration?: number;
  className?: string;
  /** Use comma as decimal separator (Polish style) */
  polishDecimal?: boolean;
};

export default function Counter({
  to,
  decimals = 0,
  thousandSep = '',
  suffix = '',
  duration = 1600,
  className = '',
  polishDecimal = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let rafId = 0;
    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
              setValue(to * eased);
              if (t < 1) rafId = requestAnimationFrame(tick);
              else setValue(to);
            };
            rafId = requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [to, duration]);

  const fixed = value.toFixed(decimals);
  const [intPart, fracPart] = fixed.split('.');
  const intFormatted = thousandSep
    ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep)
    : intPart;
  const text =
    fracPart !== undefined
      ? `${intFormatted}${polishDecimal ? ',' : '.'}${fracPart}${suffix}`
      : `${intFormatted}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
