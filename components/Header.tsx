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
    <header className="sticky top-0 z-40 border-b border-bg-border bg-bg/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl tracking-wider">
          <span className="text-accent">/</span>
          <span>AUTA NA SPRZEDAZ</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wider text-text-secondary transition-colors hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${company.phone.replace(/\s/g, '')}`}
          className="hidden items-center gap-2 text-sm font-semibold text-text-primary md:flex"
        >
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          {company.phone}
        </a>
      </div>
    </header>
  );
}
