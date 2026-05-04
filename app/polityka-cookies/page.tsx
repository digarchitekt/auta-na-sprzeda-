import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Polityka cookies',
  description:
    'Polityka plikow cookies serwisu autanasprzedaz.com - informacje o uzywanych plikach cookies oraz zasadach ich obslugi.',
  alternates: { canonical: '/polityka-cookies' },
  robots: { index: true, follow: true },
};

export default function PolitykaCookiesPage() {
  const updated = '4 maja 2026';

  return (
    <article className="prose-page container-x py-16 md:py-24">
      <header className="border-b border-bg-border pb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Dokumenty
        </span>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-tight md:text-5xl">
          Polityka cookies
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Ostatnia aktualizacja: {updated}
        </p>
      </header>

      <div className="mt-10 space-y-10 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-text-primary">1. Czym sa pliki cookies</h2>
          <p className="mt-3">
            Pliki cookies (tzw. ciasteczka) to niewielkie pliki tekstowe wysylane przez serwis internetowy
            i przechowywane na urzadzeniu uzytkownika (komputer, telefon, tablet). Sluza one m.in. do
            zapewnienia prawidlowego dzialania serwisu, jego personalizacji oraz zbierania anonimowych
            danych statystycznych.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">2. Rodzaje uzywanych cookies</h2>
          <p className="mt-3">Serwis {company.domain} moze uzywac nastepujacych rodzajow plikow cookies:</p>
          <ul className="mt-3 list-disc space-y-3 pl-6">
            <li>
              <strong className="text-text-primary">Niezbedne (techniczne)</strong> - umozliwiaja korzystanie
              z podstawowych funkcji serwisu (np. zachowanie sesji uzytkownika, preferencje wyswietlania).
              Bez nich serwis nie funkcjonuje poprawnie. Nie wymagaja zgody.
            </li>
            <li>
              <strong className="text-text-primary">Funkcjonalne</strong> - zapamietuja wybory uzytkownika
              (np. ostatnio przegladane auta) i pozwalaja dostosowac serwis do jego preferencji.
            </li>
            <li>
              <strong className="text-text-primary">Analityczne / statystyczne</strong> - zbieraja anonimowe
              dane o sposobie korzystania ze strony (najczesciej odwiedzane sekcje, czas pobytu, kraj).
              Pomagaja nam ulepszac serwis. Aktywne tylko po wyrazeniu zgody.
            </li>
            <li>
              <strong className="text-text-primary">Marketingowe</strong> - obecnie nieuzywane. W przyszlosci
              moga zostac wprowadzone w celu personalizacji reklam lub mierzenia ich skutecznosci - zawsze
              po uprzedniej zgodzie uzytkownika.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">3. Cele wykorzystania cookies</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>zapewnienie prawidlowego dzialania serwisu</li>
            <li>zapamietanie preferencji uzytkownika</li>
            <li>zbieranie anonimowych statystyk dotyczacych korzystania ze strony</li>
            <li>poprawa jakosci i wydajnosci serwisu</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">4. Cookies podmiotow trzecich</h2>
          <p className="mt-3">
            Serwis moze osadzac elementy pochodzace z zewnetrznych dostawcow (np. czcionki Google Fonts).
            Tacy dostawcy moga uzywac wlasnych plikow cookies. Pelne polityki prywatnosci znajdziesz na
            stronach tych podmiotow.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">5. Zarzadzanie plikami cookies</h2>
          <p className="mt-3">
            W kazdej chwili mozesz zmienic ustawienia dotyczace plikow cookies w swojej przegladarce.
            Mozliwe jest zablokowanie automatycznej obslugi cookies lub kazdorazowe informowanie
            o ich umieszczaniu. Wylaczenie cookies moze wplynac na funkcjonalnosc serwisu.
          </p>
          <p className="mt-3">Instrukcje zarzadzania cookies dla popularnych przegladarek:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <a className="text-accent hover:underline" href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                Google Chrome
              </a>
            </li>
            <li>
              <a className="text-accent hover:underline" href="https://support.mozilla.org/pl/kb/wlaczanie-i-wylaczanie-ciasteczek-sledzacych" target="_blank" rel="noopener noreferrer">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a className="text-accent hover:underline" href="https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
                Microsoft Edge
              </a>
            </li>
            <li>
              <a className="text-accent hover:underline" href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
                Safari
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">6. Kontakt</h2>
          <p className="mt-3">
            Pytania dotyczace polityki cookies kieruj na adres:{' '}
            <a className="text-accent hover:underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>.
          </p>
        </section>
      </div>
    </article>
  );
}
