'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Variant =
  | 'fade-up'
  | 'fade-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'blur';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
  /** Distance for translate variants */
  distance?: number;
  /** Duration in ms */
  duration?: number;
  as?: 'div' | 'section' | 'article' | 'li';
};

const hidden: Record<Variant, (d: number) => string> = {
  'fade-up': (d) => `translateY(${d}px)`,
  'fade-down': (d) => `translateY(-${d}px)`,
  'slide-left': (d) => `translateX(${d}px)`,
  'slide-right': (d) => `translateX(-${d}px)`,
  scale: () => `scale(0.92)`,
  blur: () => `translateY(8px)`,
};

export default function Reveal({
  children,
  delay = 0,
  className = '',
  variant = 'fade-up',
  distance = 32,
  duration = 800,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
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

  const transformHidden = hidden[variant](distance);
  const filterHidden = variant === 'blur' ? 'blur(8px)' : 'none';

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? 'none' : transformHidden,
        opacity: visible ? 1 : 0,
        filter: visible ? 'none' : filterHidden,
        transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${duration}ms ease-out, filter ${duration}ms ease-out`,
        willChange: visible ? 'auto' : 'transform, opacity, filter',
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
