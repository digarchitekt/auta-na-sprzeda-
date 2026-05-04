import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Regulamin',
  description:
    'Regulamin serwisu autanasprzedaz.com - zasady korzystania ze strony oraz formularzy kontaktowych.',
  alternates: { canonical: '/regulamin' },
  robots: { index: true, follow: true },
};

export default function RegulaminPage() {
  const updated = '4 maja 2026';

  return (
    <article className="prose-page container-x py-16 md:py-24">
      <header className="border-b border-bg-border pb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Dokumenty
        </span>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-tight md:text-5xl">
          Regulamin serwisu
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Ostatnia aktualizacja: {updated}
        </p>
      </header>

      <div className="mt-10 space-y-10 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 1. Postanowienia ogolne</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Niniejszy regulamin (dalej: <strong className="text-text-primary">Regulamin</strong>) okresla
              zasady korzystania z serwisu internetowego dostepnego pod adresem{' '}
              <strong className="text-text-primary">{company.domain}</strong> (dalej: <strong className="text-text-primary">Serwis</strong>).
            </li>
            <li>
              Wlascicielem i administratorem Serwisu jest <strong className="text-text-primary">{company.name}</strong>{' '}
              z siedziba pod adresem: {company.address.street}, {company.address.city}.
            </li>
            <li>
              Kontakt z administratorem: tel. {company.phone}, e-mail:{' '}
              <a className="text-accent hover:underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>.
            </li>
            <li>
              Korzystanie z Serwisu oznacza akceptacje niniejszego Regulaminu oraz{' '}
              <a className="text-accent hover:underline" href="/polityka-prywatnosci">
                Polityki prywatnosci
              </a>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 2. Zakres uslug</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              W ramach Serwisu administrator udostepnia nastepujace funkcje:
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>prezentacja oferty pojazdow uzywanych marek Opel oraz Audi</li>
                <li>formularz kontaktowy umozliwiajacy zlozenie zapytania o pojazd</li>
                <li>publikacja informacji o dzialalnosci administratora</li>
              </ul>
            </li>
            <li>
              Korzystanie z Serwisu jest bezplatne. Wszystkie informacje o cenach pojazdow maja charakter
              informacyjny i nie stanowia oferty handlowej w rozumieniu art. 66 § 1 Kodeksu cywilnego.
            </li>
            <li>
              Administrator zastrzega sobie prawo do zmiany oferty, cen oraz dostepnosci pojazdow w kazdym
              momencie, bez wczesniejszego uprzedzenia.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 3. Wymagania techniczne</h2>
          <p className="mt-3">Do prawidlowego korzystania z Serwisu wymagane jest:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>urzadzenie z dostepem do Internetu</li>
            <li>aktualna przegladarka internetowa z obsluga JavaScript</li>
            <li>aktywne konto poczty elektronicznej (do kontaktu zwrotnego)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 4. Zasady korzystania z Serwisu</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Uzytkownik zobowiazuje sie do korzystania z Serwisu w sposob zgodny z prawem, dobrymi
              obyczajami oraz postanowieniami Regulaminu.
            </li>
            <li>
              Zabronione jest dostarczanie tresci o charakterze bezprawnym, w szczegolnosci tresci
              naruszajacych prawa osob trzecich, godnosc innych uzytkownikow lub dobre imie administratora.
            </li>
            <li>
              Zabronione jest podejmowanie dzialan majacych na celu zaklocenie funkcjonowania Serwisu,
              w tym proby uzyskania nieautoryzowanego dostepu do jego zasobow.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 5. Formularz kontaktowy</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Skorzystanie z formularza kontaktowego wymaga podania danych: imie i nazwisko, adres e-mail
              lub numer telefonu, tresc wiadomosci.
            </li>
            <li>
              Wyslanie formularza nie stanowi zawarcia umowy ani nie zobowiazuje administratora do
              swiadczenia jakiejkolwiek uslugi. Stanowi jedynie zgloszenie checi nawiazania kontaktu.
            </li>
            <li>
              Administrator zobowiazuje sie do odpowiedzi w mozliwie krotkim terminie, jednak nie
              gwarantuje konkretnego czasu reakcji.
            </li>
            <li>
              Zasady przetwarzania danych osobowych przekazanych przez formularz okresla{' '}
              <a className="text-accent hover:underline" href="/polityka-prywatnosci">
                Polityka prywatnosci
              </a>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 6. Sprzedaz pojazdow</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Sprzedaz pojazdow odbywa sie poza Serwisem, na zasadach indywidualnie ustalanych z klientem.
              Serwis pelni wylacznie funkcje informacyjna.
            </li>
            <li>
              Zawarcie umowy sprzedazy nastepuje na podstawie odrebnej umowy pisemnej (umowa kupna-sprzedazy
              lub faktura VAT marza), zawieranej w siedzibie administratora lub w innym uzgodnionym miejscu.
            </li>
            <li>
              Wszelkie informacje techniczne dotyczace pojazdow (rok produkcji, przebieg, wyposazenie)
              pochodza z dostepnych zrodel oraz wlasnej weryfikacji administratora. Administrator dokłada
              starannosci w zapewnieniu ich prawidlowosci, niemniej zaleca osobiste obejrzenie pojazdu
              przed zakupem.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 7. Reklamacje dotyczace Serwisu</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Reklamacje zwiazane z dzialaniem Serwisu nalezy zglaszac na adres e-mail:{' '}
              <a className="text-accent hover:underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>.
            </li>
            <li>
              Zgloszenie reklamacyjne powinno zawierac: opis problemu, dane kontaktowe oraz date wystapienia
              problemu.
            </li>
            <li>
              Administrator rozpatrzy reklamacje w terminie 14 dni od jej otrzymania.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 8. Prawa autorskie</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Wszelkie tresci publikowane w Serwisie (zdjecia, opisy, znaki graficzne, struktura strony)
              sa chronione prawem autorskim i stanowia wlasnosc administratora lub osob trzecich.
            </li>
            <li>
              Kopiowanie, rozpowszechnianie lub komercyjne wykorzystanie tresci bez zgody administratora
              jest zabronione.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 9. Postanowienia koncowe</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              W sprawach nieuregulowanych Regulaminem stosuje sie przepisy prawa polskiego, w szczegolnosci
              Kodeksu cywilnego oraz ustawy z dnia 18 lipca 2002 r. o swiadczeniu uslug droga elektroniczna.
            </li>
            <li>
              Administrator zastrzega sobie prawo do zmiany Regulaminu. O zmianach uzytkownicy zostana
              poinformowani poprzez publikacje nowej wersji w Serwisie. Aktualna wersja jest zawsze
              dostepna na stronie /regulamin.
            </li>
            <li>
              Spory wynikajace z korzystania z Serwisu rozstrzyga sad wlasciwy dla siedziby administratora,
              chyba ze przepisy prawa stanowia inaczej.
            </li>
          </ol>
        </section>
      </div>
    </article>
  );
}
