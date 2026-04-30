import Link from 'next/link';
import Hero from '@/components/Hero';
import VehicleCard from '@/components/VehicleCard';
import { vehicles } from '@/data/vehicles';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="oferta" className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-bg-border pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Aktualna oferta
            </span>
            <h2 className="section-title mt-2">Auta dostepne od reki</h2>
          </div>
          <p className="max-w-md text-sm text-text-secondary">
            Kazde auto przed sprzedaza przechodzi pelna inspekcje techniczna i weryfikacje
            historii. Zero niespodzianek.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} />
          ))}
        </div>
      </section>

      <section className="border-y border-bg-border bg-bg-elevated py-20">
        <div className="container-x grid gap-10 md:grid-cols-3">
          {[
            {
              title: 'Selekcja',
              text: 'Sprowadzamy i kupujemy wylacznie auta o sprawdzonej historii. Zaden egzemplarz nie trafia do oferty bez naszej osobistej akceptacji.',
              kicker: '01',
            },
            {
              title: 'Przygotowanie',
              text: 'Kazde auto przygotowujemy tak, by bylo bezpieczne i gotowe do jazdy. Czyscimy, polerujemy lakier, naprawiamy odpryski i drobne defekty. Jak nowe.',
              kicker: '02',
            },
            {
              title: 'Wsparcie',
              text: 'Pomagamy wybrac auto dopasowane do Twoich potrzeb. Doradzamy szczerze - wskazujemy plusy i minusy. Po zakupie zostajemy w kontakcie.',
              kicker: '03',
            },
          ].map((f) => (
            <div key={f.kicker} className="card p-8">
              <span className="font-display text-5xl text-accent">{f.kicker}</span>
              <h3 className="mt-4 text-xl font-semibold uppercase tracking-wider">{f.title}</h3>
              <p className="mt-3 text-sm text-text-secondary">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O nas / Dlaczego my */}
      <section id="o-nas" className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              O nas
            </span>
            <h2 className="section-title mt-2">
              Auta sprawdzone <span className="text-accent">przez fachowca</span>
            </h2>
            <p className="mt-5 text-text-secondary">
              Nie jestesmy posrednikami. Sami sprowadzamy auta z zagranicy,
              przygotowujemy je w naszym warsztacie i dopiero potem wystawiamy
              na sprzedaz. Klient dostaje samochod gotowy do jazdy - nie projekt
              do dokonczenia.
            </p>
            <p className="mt-4 text-text-secondary">
              Sprowadzanie aut z zagranicy oznacza nizsza cene niz na polskim
              rynku, a nasze doswiadczenie - pewnosc, ze auto bylo wczesniej
              sprawdzone w kazdym detalu. Mechanika, lakier, historia - nic nie
              umyka.
            </p>

            {/* Recenzje */}
            <div className="mt-8 inline-flex items-center gap-4 border border-bg-border bg-bg-elevated px-5 py-4">
              <div className="flex items-center gap-0.5 text-accent" aria-label="Ocena 4,7 na 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={i < 4 ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="leading-tight">
                <div className="font-display text-2xl text-text-primary">4,7 / 5</div>
                <div className="text-xs uppercase tracking-wider text-text-muted">
                  50+ pozytywnych opinii
                </div>
              </div>
            </div>
          </div>

          {/* Wlasciciel / fachowiec */}
          <div className="card p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
              Kto za tym stoi
            </span>
            <h3 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
              30 lat doswiadczenia. <span className="text-accent">500+ aut.</span>
            </h3>
            <p className="mt-4 text-text-secondary">
              Wlasciciel firmy to wykwalifikowany <strong className="text-text-primary">mechanik i lakiernik</strong> z
              30-letnim doswiadczeniem. W ciagu kariery sprowadzil i przygotowal
              ponad 500 samochodow. Wie dokladnie gdzie szukac wad, co sprawdzic
              i jak ocenic czy auto jest warte uwagi.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-bg-border pt-6">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-muted">Lat w branzy</dt>
                <dd className="mt-1 font-display text-3xl text-text-primary">30</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-muted">Sprowadzonych aut</dt>
                <dd className="mt-1 font-display text-3xl text-text-primary">500+</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-muted">Specjalizacje</dt>
                <dd className="mt-1 font-display text-xl leading-tight text-text-primary">
                  Mechanik
                  <br />
                  Lakiernik
                </dd>
              </div>
            </dl>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                'Auta sprowadzane bezposrednio z zagranicy',
                'Pelne przygotowanie mechaniczne i lakiernicze',
                'Kazde auto sprawdzone osobiscie - bez wyjatkow',
                'Cena nizsza niz w salonach krajowych',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-text-primary">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center bg-accent text-[9px] font-bold text-white">
                    +
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="flex flex-col items-start justify-between gap-6 border border-bg-border bg-bg-card p-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
              Masz auto na sprzedaz?
            </h2>
            <p className="mt-2 max-w-xl text-text-secondary">
              Zglos swoje auto, a my zweryfikujemy zgloszenie i wystawimy je w naszej ofercie.
              Reszta jest po naszej stronie.
            </p>
          </div>
          <Link href="/sprzedaj-auto" className="btn-primary">
            Wystaw swoje auto
          </Link>
        </div>
      </section>
    </>
  );
}
