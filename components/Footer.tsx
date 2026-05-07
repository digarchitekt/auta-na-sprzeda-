import Link from 'next/link';
import { company } from '@/data/company';
import CookieSettingsButton from './CookieSettingsButton';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-bg-border bg-bg-elevated">
      <div className="container-x grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="font-display text-2xl tracking-wider">
            <span className="text-accent">/</span> AUTA NA SPRZEDAŻ
          </div>
          <p className="mt-4 max-w-md text-sm text-text-secondary">
            Tanie używane auta na sprzedaż - wyselekcjonowane Opel i Audi
            sprowadzane z zagranicy oraz z kraju. Komis aut na Podkarpaciu -
            sprzedaż dla klientów z całej Polski.
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5 text-[11px] text-text-muted">
            {company.servicedCities.slice(0, 8).map((c) => (
              <span key={c} className="border border-bg-border px-2 py-1">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Kontakt
          </h4>
          <address className="not-italic">
            <ul className="space-y-2 text-sm text-text-primary">
              <li>{company.address.street}</li>
              <li>{company.address.city}</li>
              <li>woj. {company.address.region}</li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  aria-label={`Zadzwon: ${company.phone}`}
                  className="hover:text-accent"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  aria-label={`Napisz e-mail: ${company.email}`}
                  className="break-all hover:text-accent"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Nawigacja
          </h4>
          <ul className="space-y-2 text-sm text-text-primary">
            <li><Link href="/" className="hover:text-accent">Start</Link></li>
            <li><Link href="/auta" className="hover:text-accent">Auta na sprzedaż</Link></li>
            <li><Link href="/kontakt" className="hover:text-accent">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Informacje prawne
          </h4>
          <ul className="space-y-2 text-sm text-text-primary">
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-accent">
                Polityka prywatności
              </Link>
            </li>
            <li>
              <Link href="/polityka-cookies" className="hover:text-accent">
                Polityka cookies
              </Link>
            </li>
            <li>
              <Link href="/regulamin" className="hover:text-accent">
                Regulamin
              </Link>
            </li>
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bg-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-text-muted md:flex-row">
          <span>(c) {year} {company.name}. Wszystkie prawa zastrzezone.</span>
          <span>{company.domain}</span>
        </div>
        <div className="container-x pb-4">
          <p className="text-center text-[10px] leading-none text-text-muted md:text-right">
            Strona stworzona przez Gracjana Preisnera
          </p>
        </div>
      </div>
    </footer>
  );
}
