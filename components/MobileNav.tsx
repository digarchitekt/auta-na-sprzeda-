'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const items = [
  { href: '/', label: 'Start' },
  { href: '/#oferta', label: 'Oferta' },
  { href: '/#o-nas', label: 'O nas' },
  { href: '/sprzedaj-auto', label: 'Sprzedaj Auto' },
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

      {/* Fullscreen overlay menu — solid dark with subtle glass feel */}
      <div
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(10,10,10,1) 100%)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          isolation: 'isolate',
        }}
        className={`fixed inset-0 z-[60] flex flex-col transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        {/* Close button */}
        <div className="flex h-14 items-center justify-end px-5">
          <button
            type="button"
            aria-label="Zamknij menu"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center text-3xl text-text-primary hover:text-accent"
          >
            ×
          </button>
        </div>

        {/* Categories — centered */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-2xl font-bold uppercase tracking-wider text-text-primary transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Skontaktuj się button */}
        <div className="px-6 pb-10">
          <Link
            href="/kontakt"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 bg-accent px-4 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
          >
            Skontaktuj się
          </Link>
        </div>
      </div>
    </>
  );
}
