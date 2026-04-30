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
