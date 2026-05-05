import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Polityka prywatności',
  description:
    'Polityka prywatności serwisu autanasprzedaz.com - zasady przetwarzania danych osobowych zgodnie z RODO.',
  alternates: { canonical: '/polityka-prywatnosci' },
  robots: { index: true, follow: true },
};

export default function PolitykaPrywatnosciPage() {
  const updated = '4 maja 2026';

  return (
    <article className="prose-page container-x py-16 md:py-24">
      <header className="border-b border-bg-border pb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Dokumenty
        </span>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-tight md:text-5xl">
          Polityka prywatności
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Ostatnia aktualizacja: {updated}
        </p>
      </header>

      <div className="mt-10 space-y-10 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-text-primary">1. Administrator danych osobowych</h2>
          <p className="mt-3">
            Administratorem danych osobowych w rozumieniu Rozporządzenia Parlamentu Europejskiego i Rady
            (UE) 2016/679 z dnia 27 kwietnia 2016 r. (dalej: <strong className="text-text-primary">RODO</strong>) jest{' '}
            <strong className="text-text-primary">{company.name}</strong>, prowadząca działalność pod adresem:
          </p>
          <ul className="mt-3 list-none space-y-1">
            <li>{company.address.street}</li>
            <li>{company.address.city}</li>
            <li>woj. {company.address.region}, Polska</li>
            <li>tel. {company.phone}</li>
            <li>e-mail: {company.email}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">2. Zakres zbieranych danych</h2>
          <p className="mt-3">
            Zbieramy następujące kategorie danych osobowych:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>imię i nazwisko</li>
            <li>numer telefonu</li>
            <li>adres e-mail</li>
            <li>treść zapytania kierowanego przez formularz kontaktowy</li>
            <li>dane techniczne (adres IP, typ przeglądarki, czas wizyty) - przetwarzane w celach statystycznych</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">3. Cel i podstawa prawna przetwarzania</h2>
          <p className="mt-3">Dane osobowe przetwarzamy w następujących celach:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text-primary">Obsługa zapytania</strong> - art. 6 ust. 1 lit. b RODO
              (czynnosci zmierzajace do zawarcia umowy) oraz art. 6 ust. 1 lit. f RODO (uzasadniony interes
              administratora w postaci kontaktu z osobą zainteresowaną ofertą).
            </li>
            <li>
              <strong className="text-text-primary">Realizacja umowy sprzedaży</strong> - art. 6 ust. 1 lit. b RODO.
            </li>
            <li>
              <strong className="text-text-primary">Obowiązki podatkowe i rachunkowe</strong> - art. 6 ust. 1
              lit. c RODO (obowiązek prawny).
            </li>
            <li>
              <strong className="text-text-primary">Cele statystyczne i analityczne</strong> - art. 6 ust. 1
              lit. f RODO (uzasadniony interes administratora).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">4. Okres przechowywania danych</h2>
          <p className="mt-3">
            Dane osobowe przechowujemy przez okres niezbędny do realizacji celów, dla których zostały zebrane,
            a po tym czasie przez okres wynikający z przepisów prawa lub przedawnienia ewentualnych roszczeń.
            Dane z formularza kontaktowego, jeżeli nie doszło do zawarcia umowy, usuwamy maksymalnie po 12
            miesiącach od ostatniego kontaktu.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">5. Odbiorcy danych</h2>
          <p className="mt-3">Dane osobowe możemy udostępniać:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>dostawcom usług IT (hosting, poczta elektroniczną)</li>
            <li>biuru rachunkowemu w zakresie obowiązków podatkowych</li>
            <li>organom panstwowym, jeżeli wynika to z obowiązku prawnego</li>
          </ul>
          <p className="mt-3">
            Nie przekazujemy Twoich danych do państw trzecich (poza EOG).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">6. Prawa osób, których dane dotyczą</h2>
          <p className="mt-3">Posiadasz następujące prawa:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>prawo dostępu do swoich danych (art. 15 RODO)</li>
            <li>prawo do sprostowania danych (art. 16 RODO)</li>
            <li>prawo do usuniecia danych (art. 17 RODO)</li>
            <li>prawo do ograniczenia przetwarzania (art. 18 RODO)</li>
            <li>prawo do przenoszenia danych (art. 20 RODO)</li>
            <li>prawo do sprzeciwu wobec przetwarzania (art. 21 RODO)</li>
            <li>
              prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
              (ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl)
            </li>
          </ul>
          <p className="mt-3">
            W celu realizacji powyższych praw skontaktuj się z nami pod adresem e-mail:{' '}
            <a className="text-accent hover:underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">7. Dobrowolność podania danych</h2>
          <p className="mt-3">
            Podanie danych osobowych jest dobrowolne, ale niezbędne do obsługi zapytania. Niepodanie
            wymaganych danych może uniemożliwić kontakt i przedstawienie oferty.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">8. Profilowanie</h2>
          <p className="mt-3">
            Twoje dane osobowe nie są wykorzystywane do zautomatyzowanego podejmowania decyzji, w tym profilowania.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">9. Pliki cookies</h2>
          <p className="mt-3">
            Strona używa plików cookies. Szczegóły dotyczące ich używania znajdziesz w naszej{' '}
            <a className="text-accent hover:underline" href="/polityka-cookies">
              Polityce cookies
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">10. Zmiany polityki prywatności</h2>
          <p className="mt-3">
            Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce. Aktualna wersja jest zawsze
            dostępna na tej stronie. Data ostatniej aktualizacji znajduje się na początku dokumentu.
          </p>
        </section>
      </div>
    </article>
  );
}
