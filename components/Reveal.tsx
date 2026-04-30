'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** translateY in px while hidden. Default 24. */
  offset?: number;
  /** Disable animation entirely (for SSR-safe wrappers). */
  as?: 'div' | 'section' | 'article' | 'li';
};

export default function Reveal({
  children,
  delay = 0,
  className = '',
  offset = 24,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // @ts-expect-error - polymorphic ref
  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? 'translateY(0)' : `translateY(${offset}px)`,
        opacity: visible ? 1 : 0,
        transition:
          'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out',
        willChange: visible ? 'auto' : 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
