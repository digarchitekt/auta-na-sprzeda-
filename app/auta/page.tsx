import type { Metadata } from 'next';
import Link from 'next/link';
import VehicleCard from '@/components/VehicleCard';
import Reveal from '@/components/Reveal';
import { vehicles } from '@/data/vehicles';

export const metadata: Metadata = {
  title: 'Wszystkie auta — Pelna oferta',
  description:
    'Pelna oferta sprawdzonych aut Opel i Audi. Sprowadzane z zagranicy, gotowe do jazdy, gwarancja 3 miesiace.',
};

export default function AutaPage() {
  const brands = Array.from(new Set(vehicles.map((v) => v.brand)));

  return (
    <>
      {/* Hero header */}
      <section className="relative overflow-hidden border-b border-bg-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/texture-dark.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-bg/80" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top, rgba(225,29,46,0.18), transparent 60%)',
          }}
        />

        <div className="container-x relative z-10 py-16 md:py-24">
          <Reveal variant="fade-up" duration={700}>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Pelna oferta
            </span>
          </Reveal>
          <Reveal variant="blur" delay={100} duration={900}>
            <h1 className="mt-3 max-w-4xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-text-primary md:text-6xl">
              Wszystkie auta dostepne <span className="text-accent">od reki</span>
            </h1>
          </Reveal>
          <Reveal variant="fade-up" delay={300} duration={700}>
            <p className="mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
              {vehicles.length} {vehicles.length === 1 ? 'auto' : 'aut'} w ofercie. Kazde
              sprawdzone osobiscie, sprowadzone z zagranicy i przygotowane do jazdy.
            </p>
          </Reveal>

          {/* Quick stats */}
          <Reveal variant="fade-up" delay={500} duration={700}>
            <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-6 border-t border-bg-border pt-6">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-muted">
                  W ofercie
                </dt>
                <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">
                  {vehicles.length}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-muted">
                  Marki
                </dt>
                <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">
                  {brands.length}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-muted">
                  Gwarancja
                </dt>
                <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">
                  3 mc
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v, i) => (
            <Reveal
              key={v.slug}
              variant="fade-up"
              delay={(i % 3) * 100}
              duration={700}
            >
              <VehicleCard vehicle={v} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA - sprzedaj swoje */}
      <section className="border-t border-bg-border bg-bg-elevated py-16">
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-tight md:text-3xl">
              Nie znalazles tego, czego szukasz?
            </h2>
            <p className="mt-2 max-w-xl text-text-secondary">
              Skontaktuj sie - regularnie sprowadzamy nowe auta. Powiedz czego szukasz,
              znajdziemy.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn-primary btn-shimmer">
              Skontaktuj sie
            </Link>
            <Link href="/sprzedaj-auto" className="btn-outline">
              Sprzedaj swoje auto
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
