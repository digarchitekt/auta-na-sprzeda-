'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const items = [
  {
    href: '/',
    section: 'start',
    label: 'Start',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: '/#oferta',
    section: 'oferta',
    label: 'Oferta',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    ),
  },
  {
    href: '/#o-nas',
    section: 'o-nas',
    label: 'O nas',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
  {
    href: '/sprzedaj-auto',
    section: 'sprzedaj-auto',
    label: 'Sprzedaj',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    href: '/kontakt',
    section: 'kontakt',
    label: 'Kontakt',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string>('start');

  // On homepage, track which section is currently in view
  useEffect(() => {
    if (pathname !== '/') return;

    const sectionIds = ['oferta', 'o-nas'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      setActiveHash('start');
      return;
    }

    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let current = 'start';
      for (const sec of sections) {
        if (sec.offsetTop <= y) current = sec.id;
      }
      setActiveHash(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const isActive = (section: string, href: string) => {
    if (pathname === '/') return section === activeHash;
    if (href === '/') return false;
    return pathname.startsWith(href);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(10,10,10,1) 100%)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.6)',
      }}
      className="grid grid-cols-5 border-t border-bg-border md:hidden"
      aria-label="Menu mobilne"
    >
      {items.map((item) => {
        const active = isActive(item.section, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition-colors"
            style={{ color: active ? '#e11d2e' : 'rgba(245,245,245,0.65)' }}
          >
            {/* Top accent bar on active */}
            {active && (
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '20%',
                  right: '20%',
                  height: '2px',
                  backgroundColor: '#e11d2e',
                  boxShadow: '0 0 8px rgba(225,29,46,0.7)',
                }}
              />
            )}
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
