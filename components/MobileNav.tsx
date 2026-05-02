'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { company } from '@/data/company';

const items = [
  { href: '/', label: 'Start' },
  { href: '/#oferta', label: 'Oferta' },
  { href: '/#o-nas', label: 'O nas' },
  { href: '/sprzedaj-auto', label: 'Sprzedaj Auto' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Otworz menu"
        onClick={() => setOpen(true)}
        className="grid h-10 w-10 place-items-center text-text-primary md:hidden"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />

        <nav
          className={`liquid-glass absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col gap-1 p-6 pt-20 transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            type="button"
            aria-label="Zamknij menu"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center text-2xl text-text-primary hover:text-accent"
          >
            ×
          </button>

          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-bg-border/50 py-4 text-lg font-semibold uppercase tracking-wider text-text-primary transition-colors hover:text-accent"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 400ms ease ${100 + i * 60}ms, transform 400ms ease ${100 + i * 60}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}

          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 border border-accent bg-accent px-4 py-3 text-sm font-bold uppercase tracking-wider text-white"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-white" />
            {company.phone}
          </a>
        </nav>
      </div>
    </>
  );
}
