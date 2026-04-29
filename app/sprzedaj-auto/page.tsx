import type { Metadata } from 'next';
import SellForm from '@/components/SellForm';

export const metadata: Metadata = {
  title: 'Sprzedaj swoje auto',
  description:
    'Skup samochodow Opel i Audi. Szybka wycena, gotowka lub przelew, transparentna umowa.',
};

export default function SellPage() {
  return (
    <section className="container-x py-16">
      <div className="grid gap-12 lg:grid-cols-[420px_1fr]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Skup aut
          </span>
          <h1 className="mt-2 font-display text-4xl uppercase tracking-tight md:text-5xl">
            Sprzedaj swoje auto
          </h1>
          <p className="mt-4 text-text-secondary">
            Wypelnij formularz, a my odezwiemy sie z wstepna wycena tego samego dnia.
            Specjalizujemy sie w markach Opel i Audi.
          </p>

          <ol className="mt-10 space-y-6 border-l border-bg-border pl-6">
            {[
              { t: 'Zglos auto', d: 'Wypelnij formularz - zajmie Ci to 2 minuty.' },
              { t: 'Otrzymaj wycene', d: 'Skontaktujemy sie w ciagu 24h z propozycja.' },
              { t: 'Ogledziny', d: 'Spotkamy sie u Ciebie lub w naszym salonie.' },
              { t: 'Platnosc', d: 'Gotowka lub przelew na koncie tego samego dnia.' },
            ].map((step, i) => (
              <li key={step.t} className="relative">
                <span className="absolute -left-[33px] top-0 grid h-6 w-6 place-items-center bg-accent text-xs font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="font-semibold uppercase tracking-wider">{step.t}</h3>
                <p className="text-sm text-text-secondary">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>

        <SellForm />
      </div>
    </section>
  );
}
