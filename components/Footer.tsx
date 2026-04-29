import Link from 'next/link';
import { company } from '@/data/company';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-bg-border bg-bg-elevated">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl tracking-wider">
            <span className="text-accent">/</span> AUTA NA SPRZEDAZ
          </div>
          <p className="mt-4 max-w-md text-sm text-text-secondary">
            Wyselekcjonowane samochody marek Opel i Audi. Stawiamy na sprawdzone egzemplarze,
            uczciwa cene i pelna historie pojazdu.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Kontakt
          </h4>
          <ul className="space-y-2 text-sm text-text-primary">
            <li>{company.address.street}</li>
            <li>{company.address.city}</li>
            <li>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Nawigacja
          </h4>
          <ul className="space-y-2 text-sm text-text-primary">
            <li><Link href="/">Start</Link></li>
            <li><Link href="/sprzedaj-auto">Sprzedaj Auto</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bg-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-text-muted md:flex-row">
          <span>(c) {year} {company.name}. Wszystkie prawa zastrzezone.</span>
          <span>{company.domain}</span>
        </div>
      </div>
    </footer>
  );
}
