import type { Metadata } from 'next';
import SellForm from '@/components/SellForm';

export const metadata: Metadata = {
  title: 'Wystaw swoje auto',
  description:
    'Zglos swoje auto do sprzedazy w naszej ofercie. Wypelnij formularz, a my odezwiemy sie po weryfikacji zgloszenia.',
};

export default function SellPage() {
  return (
    <section className="container-x py-16">
      <div className="grid gap-12 lg:grid-cols-[420px_1fr]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Wystaw auto w naszej ofercie
          </span>
          <h1 className="mt-2 font-display text-4xl uppercase tracking-tight md:text-5xl">
            Wystaw swoje auto
          </h1>
          <p className="mt-4 text-text-secondary">
            Wypelnij formularz, a my zweryfikujemy zgloszenie i odezwiemy sie z
            decyzja. Po akceptacji wystawiamy Twoje auto w naszej ofercie i
            prowadzimy rozmowy z kupujacymi.
          </p>

          <ol className="mt-10 space-y-6 border-l border-bg-border pl-6">
            {[
              {
                t: 'Zglos auto',
                d: 'Wypelnij krotki formularz - zajmie Ci to 2 minuty.',
              },
              {
                t: 'Weryfikacja',
                d: 'Sprawdzamy zgloszenie i odzywamy sie z decyzja.',
              },
              {
                t: 'Wystawiamy auto',
                d: 'Po akceptacji publikujemy ogloszenie w naszej ofercie.',
              },
              {
                t: 'Prowadzimy rozmowy',
                d: 'Zajmujemy sie kontaktem z zainteresowanymi kupujacymi.',
              },
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
