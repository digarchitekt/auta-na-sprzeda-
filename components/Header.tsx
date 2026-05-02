import Link from 'next/link';
import { company } from '@/data/company';

const nav = [
  { href: '/', label: 'Start' },
  { href: '/#oferta', label: 'Oferta' },
  { href: '/#o-nas', label: 'O nas' },
  { href: '/sprzedaj-auto', label: 'Sprzedaj Auto' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Header() {
  return (
    <div className="sticky top-0 z-40 hidden md:block">
      <header className="liquid-glass mx-auto flex h-14 w-full max-w-container items-center justify-between px-4 md:h-16 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg tracking-wider md:text-2xl"
        >
          <span className="text-accent">/</span>
          <span className="hidden sm:inline">AUTA NA SPRZEDAZ</span>
          <span className="sm:hidden">ANS</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-sm font-medium uppercase tracking-wider text-text-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            className="hidden items-center gap-2 text-xs font-semibold text-text-primary md:flex md:text-sm"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
            {company.phone}
          </a>
        </div>
      </header>
    </div>
  );
}
