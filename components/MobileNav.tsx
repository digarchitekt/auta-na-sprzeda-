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

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/80 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden
      />

      {/* Drawer */}
      <nav
        className={`fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-bg-elevated transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-14 items-center justify-between border-b border-bg-border px-5">
          <span className="font-display text-lg tracking-wider text-text-primary">
            <span className="text-accent">/</span> MENU
          </span>
          <button
            type="button"
            aria-label="Zamknij menu"
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center text-2xl text-text-secondary hover:text-accent"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 flex-col px-5 pt-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-bg-border py-4 text-base font-semibold uppercase tracking-wider text-text-primary transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="border-t border-bg-border p-5">
          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 bg-accent px-4 py-3 text-sm font-bold uppercase tracking-wider text-white"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-white" />
            Zadzwon
          </a>
        </div>
      </nav>
    </>
  );
}
