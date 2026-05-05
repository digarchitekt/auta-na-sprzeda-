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
          <h2 className="text-xl font-semibold text-text-primary">§ 1. Postanowienia ogólne</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Niniejszy regulamin (dalej: <strong className="text-text-primary">Regulamin</strong>) określa
              zasady korzystania z serwisu internetowego dostępnego pod adresem{' '}
              <strong className="text-text-primary">{company.domain}</strong> (dalej: <strong className="text-text-primary">Serwis</strong>).
            </li>
            <li>
              Właścicielem i administratorem Serwisu jest <strong className="text-text-primary">{company.name}</strong>{' '}
              z siedzibą pod adresem: {company.address.street}, {company.address.city}.
            </li>
            <li>
              Kontakt z administratorem: tel. {company.phone}, e-mail:{' '}
              <a className="text-accent hover:underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>.
            </li>
            <li>
              Korzystanie z Serwisu oznacza akceptacje niniejszego Regulaminu oraz{' '}
              <a className="text-accent hover:underline" href="/polityka-prywatności">
                Polityki prywatności
              </a>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 2. Zakres usług</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              W ramach Serwisu administrator udostępnia następujące funkcje:
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>prezentacja oferty pojazdów używanych marek Opel oraz Audi</li>
                <li>formularz kontaktowy umożliwiający złożenie zapytania o pojazd</li>
                <li>publikacja informacji o działalności administratora</li>
              </ul>
            </li>
            <li>
              Korzystanie z Serwisu jest bezpłatne. Wszystkie informacje o cenach pojazdów mają charakter
              informacyjny i nie stanowią oferty handlowej w rozumieniu art. 66 § 1 Kodeksu cywilnego.
            </li>
            <li>
              Administrator zastrzega sobie prawo do zmiany oferty, cen oraz dostępności pojazdów w każdym
              momencie, bez wcześniejszego uprzedzenia.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 3. Wymagania techniczne</h2>
          <p className="mt-3">Do prawidłowego korzystania z Serwisu wymagane jest:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>urządzenie z dostępem do Internetu</li>
            <li>aktualna przeglądarka internetowa z obsługa JavaScript</li>
            <li>aktywne konto poczty elektronicznej (do kontaktu zwrotnego)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 4. Zasady korzystania z Serwisu</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Użytkownik zobowiązuje się do korzystania z Serwisu w sposób zgodny z prawem, dobrymi
              obyczajami oraz postanowieniami Regulaminu.
            </li>
            <li>
              Zabronione jest dostarczanie treści o charakterze bezprawnym, w szczególności treści
              naruszających prawa osób trzecich, godność innych użytkowników lub dobre imię administratora.
            </li>
            <li>
              Zabronione jest podejmowanie działań mających na celu zakłócenie funkcjonowania Serwisu,
              w tym próby uzyskania nieautoryzowanego dostępu do jego zasobów.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 5. Formularz kontaktowy</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Skorzystanie z formularza kontaktowego wymaga podania danych: imię i nazwisko, adres e-mail
              lub numer telefonu, treść wiadomości.
            </li>
            <li>
              Wysłanie formularza nie stanowi zawarcia umowy ani nie zobowiązuje administratora do
              świadczenia jakiejkolwiek usługi. Stanowi jedynie zgłoszenie chęci nawiązania kontaktu.
            </li>
            <li>
              Administrator zobowiązuje się do odpowiedzi w możliwie krótkim terminie, jednak nie
              gwarantuje konkretnego czasu reakcji.
            </li>
            <li>
              Zasady przetwarzania danych osobowych przekazanych przez formularz określa{' '}
              <a className="text-accent hover:underline" href="/polityka-prywatności">
                Polityka prywatności
              </a>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 6. Sprzedaż pojazdów</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Sprzedaż pojazdów odbywa się poza Serwisem, na zasadach indywidualnie ustalanych z klientem.
              Serwis pełni wyłącznie funkcje informacyjną.
            </li>
            <li>
              Zawarcie umowy sprzedaży następuje na podstawie odrębnej umowy pisemnej (umowa kupna-sprzedaży
              lub faktura VAT marża), zawieranej w siedzibie administratora lub w innym uzgodnionym miejscu.
            </li>
            <li>
              Wszelkie informacje techniczne dotyczące pojazdów (rok produkcji, przebieg, wyposażenie)
              pochodzą z dostępnych źródeł oraz własnej weryfikacji administratora. Administrator dokłada
              staranności w zapewnieniu ich prawidłowości, niemniej zaleca osobiste obejrzenie pojazdu
              przed zakupem.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 7. Reklamacje dotyczące Serwisu</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Reklamacje związane z działaniem Serwisu należy zgłaszać na adres e-mail:{' '}
              <a className="text-accent hover:underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>.
            </li>
            <li>
              Zgłoszenie reklamacyjne powinno zawierać: opis problemu, dane kontaktowe oraz datę wystąpienia
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
              Wszelkie treści publikowane w Serwisie (zdjecia, opisy, znaki graficzne, struktura strony)
              są chronione prawem autorskim i stanowią własność administratora lub osób trzecich.
            </li>
            <li>
              Kopiowanie, rozpowszechnianie lub komercyjne wykorzystanie treści bez zgody administratora
              jest zabronione.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">§ 9. Postanowienia końcowe</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              W sprawach nieuregulowanych Regulaminem stosuje się przepisy prawa polskiego, w szczególności
              Kodeksu cywilnego oraz ustawy z dnia 18 lipca 2002 r. o świadczeniu usług droga elektroniczną.
            </li>
            <li>
              Administrator zastrzega sobie prawo do zmiany Regulaminu. O zmianach uzytkownicy zostana
              poinformowani poprzez publikację nowej wersji w Serwisie. Aktualna wersja jest zawsze
              dostępna na stronie /regulamin.
            </li>
            <li>
              Spory wynikające z korzystania z Serwisu rozstrzyga sąd właściwy dla siedziby administratora,
              chyba że przepisy prawa stanowią inaczej.
            </li>
          </ol>
        </section>
      </div>
    </article>
  );
}
