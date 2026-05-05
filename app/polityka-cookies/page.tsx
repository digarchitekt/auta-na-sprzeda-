import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Polityka cookies',
  description:
    'Polityka plików cookies serwisu autanasprzedaz.com - informacje o używanych plikach cookies oraz zasadach ich obsługi.',
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
          <h2 className="text-xl font-semibold text-text-primary">1. Czym są pliki cookies</h2>
          <p className="mt-3">
            Pliki cookies (tzw. ciasteczka) to niewielkie pliki tekstowe wysyłane przez serwis internetowy
            i przechowywane na urządzeniu użytkownika (komputer, telefon, tablet). Służą one m.in. do
            zapewnienia prawidłowego działania serwisu, jego personalizacji oraz zbierania anonimowych
            danych statystycznych.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">2. Rodzaje używanych cookies</h2>
          <p className="mt-3">Serwis {company.domain} może używać następujących rodzajów plików cookies:</p>
          <ul className="mt-3 list-disc space-y-3 pl-6">
            <li>
              <strong className="text-text-primary">Niezbędne (techniczne)</strong> - umożliwiają korzystanie
              z podstawowych funkcji serwisu (np. zachowanie sesji użytkownika, preferencje wyświetlania).
              Bez nich serwis nie funkcjonuje poprawnie. Nie wymagają zgody.
            </li>
            <li>
              <strong className="text-text-primary">Funkcjonalne</strong> - zapamiętują wybory użytkownika
              (np. ostatnio przeglądane auta) i pozwalają dostosować serwis do jego preferencji.
            </li>
            <li>
              <strong className="text-text-primary">Analityczne / statystyczne</strong> - zbierają anonimowe
              dane o sposobie korzystania ze strony (najczęściej odwiedzane sekcje, czas pobytu, kraj).
              Pomagają nam ulepszać serwis. Aktywne tylko po wyrażeniu zgody.
            </li>
            <li>
              <strong className="text-text-primary">Marketingowe</strong> - obecnie nieużywane. W przyszłości
              mogą zostać wprowadzone w celu personalizacji reklam lub mierzenia ich skuteczności - zawsze
              po uprzedniej zgodzie użytkownika.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">3. Cele wykorzystania cookies</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>zapewnienie prawidłowego działania serwisu</li>
            <li>zapamiętanie preferencji użytkownika</li>
            <li>zbieranie anonimowych statystyk dotyczących korzystania ze strony</li>
            <li>poprawa jakości i wydajności serwisu</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">4. Cookies podmiotów trzecich</h2>
          <p className="mt-3">
            Serwis może osadzać elementy pochodzące z zewnętrznych dostawców (np. czcionki Google Fonts).
            Tacy dostawcy mogą używać własnych plików cookies. Pełne polityki prywatności znajdziesz na
            stronach tych podmiotów.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">5. Zarządzanie plikami cookies</h2>
          <p className="mt-3">
            W każdej chwili możesz zmienic ustawienia dotyczące plików cookies w swojej przeglądarce.
            Możliwe jest zablokowanie automatycznej obsługi cookies lub każdorazowe informowanie
            o ich umieszczaniu. Wyłączenie cookies może wpłynąć na funkcjonalność serwisu.
          </p>
          <p className="mt-3">Instrukcje zarządzania cookies dla popularnych przeglądarek:</p>
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
            Pytania dotyczące polityki cookies kieruj na adres:{' '}
            <a className="text-accent hover:underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>.
          </p>
        </section>
      </div>
    </article>
  );
}
