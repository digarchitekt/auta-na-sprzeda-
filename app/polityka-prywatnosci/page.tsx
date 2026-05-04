import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Polityka prywatnosci',
  description:
    'Polityka prywatnosci serwisu autanasprzedaz.com - zasady przetwarzania danych osobowych zgodnie z RODO.',
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
          Polityka prywatnosci
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Ostatnia aktualizacja: {updated}
        </p>
      </header>

      <div className="mt-10 space-y-10 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-text-primary">1. Administrator danych osobowych</h2>
          <p className="mt-3">
            Administratorem danych osobowych w rozumieniu Rozporzadzenia Parlamentu Europejskiego i Rady
            (UE) 2016/679 z dnia 27 kwietnia 2016 r. (dalej: <strong className="text-text-primary">RODO</strong>) jest{' '}
            <strong className="text-text-primary">{company.name}</strong>, prowadzaca dzialalnosc pod adresem:
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
            Zbieramy nastepujace kategorie danych osobowych:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>imie i nazwisko</li>
            <li>numer telefonu</li>
            <li>adres e-mail</li>
            <li>tresc zapytania kierowanego przez formularz kontaktowy</li>
            <li>dane techniczne (adres IP, typ przegladarki, czas wizyty) - przetwarzane w celach statystycznych</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">3. Cel i podstawa prawna przetwarzania</h2>
          <p className="mt-3">Dane osobowe przetwarzamy w nastepujacych celach:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text-primary">Obsluga zapytania</strong> - art. 6 ust. 1 lit. b RODO
              (czynnosci zmierzajace do zawarcia umowy) oraz art. 6 ust. 1 lit. f RODO (uzasadniony interes
              administratora w postaci kontaktu z osoba zainteresowana oferta).
            </li>
            <li>
              <strong className="text-text-primary">Realizacja umowy sprzedazy</strong> - art. 6 ust. 1 lit. b RODO.
            </li>
            <li>
              <strong className="text-text-primary">Obowiazki podatkowe i rachunkowe</strong> - art. 6 ust. 1
              lit. c RODO (obowiazek prawny).
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
            Dane osobowe przechowujemy przez okres niezbedny do realizacji celow, dla ktorych zostaly zebrane,
            a po tym czasie przez okres wynikajacy z przepisow prawa lub przedawnienia ewentualnych roszczen.
            Dane z formularza kontaktowego, jezeli nie doszlo do zawarcia umowy, usuwamy maksymalnie po 12
            miesiacach od ostatniego kontaktu.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">5. Odbiorcy danych</h2>
          <p className="mt-3">Dane osobowe mozemy udostepniac:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>dostawcom uslug IT (hosting, poczta elektroniczna)</li>
            <li>biuru rachunkowemu w zakresie obowiazkow podatkowych</li>
            <li>organom panstwowym, jezeli wynika to z obowiazku prawnego</li>
          </ul>
          <p className="mt-3">
            Nie przekazujemy Twoich danych do panstw trzecich (poza EOG).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">6. Prawa osob, ktorych dane dotycza</h2>
          <p className="mt-3">Posiadasz nastepujace prawa:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>prawo dostepu do swoich danych (art. 15 RODO)</li>
            <li>prawo do sprostowania danych (art. 16 RODO)</li>
            <li>prawo do usuniecia danych (art. 17 RODO)</li>
            <li>prawo do ograniczenia przetwarzania (art. 18 RODO)</li>
            <li>prawo do przenoszenia danych (art. 20 RODO)</li>
            <li>prawo do sprzeciwu wobec przetwarzania (art. 21 RODO)</li>
            <li>
              prawo do wniesienia skargi do Prezesa Urzedu Ochrony Danych Osobowych
              (ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl)
            </li>
          </ul>
          <p className="mt-3">
            W celu realizacji powyzszych praw skontaktuj sie z nami pod adresem e-mail:{' '}
            <a className="text-accent hover:underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">7. Dobrowolnosc podania danych</h2>
          <p className="mt-3">
            Podanie danych osobowych jest dobrowolne, ale niezbedne do obslugi zapytania. Niepodanie
            wymaganych danych moze uniemozliwic kontakt i przedstawienie oferty.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">8. Profilowanie</h2>
          <p className="mt-3">
            Twoje dane osobowe nie sa wykorzystywane do zautomatyzowanego podejmowania decyzji, w tym profilowania.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">9. Pliki cookies</h2>
          <p className="mt-3">
            Strona uzywa plikow cookies. Szczegoly dotyczace ich uzywania znajdziesz w naszej{' '}
            <a className="text-accent hover:underline" href="/polityka-cookies">
              Polityce cookies
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">10. Zmiany polityki prywatnosci</h2>
          <p className="mt-3">
            Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce. Aktualna wersja jest zawsze
            dostepna na tej stronie. Data ostatniej aktualizacji znajduje sie na poczatku dokumentu.
          </p>
        </section>
      </div>
    </article>
  );
}
