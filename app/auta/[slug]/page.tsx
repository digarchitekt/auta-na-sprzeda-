import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  vehicles,
  getVehicleBySlug,
  formatPrice,
  formatMileage,
} from '@/data/vehicles';
import Gallery from '@/components/Gallery';
import VehicleInquiryForm from '@/components/VehicleInquiryForm';

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const v = getVehicleBySlug(params.slug);
  if (!v) return { title: 'Nie znaleziono pojazdu' };
  const label = `${v.brand} ${v.model} ${v.variant ?? ''} ${v.year}`.trim();
  return {
    title: `${label} - ${formatPrice(v.price)}`,
    description: v.shortDescription,
  };
}

export default function VehiclePage({ params }: { params: { slug: string } }) {
  const v = getVehicleBySlug(params.slug);
  if (!v) notFound();

  const label = `${v.brand} ${v.model} ${v.variant ?? ''}`.trim();

  return (
    <article className="container-x py-10">
      <nav className="text-xs uppercase tracking-wider text-text-muted">
        <Link href="/" className="hover:text-text-primary">Start</Link>
        <span className="mx-2">/</span>
        <Link href="/#oferta" className="hover:text-text-primary">Oferta</Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{v.brand} {v.model}</span>
      </nav>

      <header className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-bg-border pb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            {v.brand} &middot; {v.year}
          </span>
          <h1 className="mt-2 font-display text-4xl uppercase tracking-tight md:text-6xl">
            {v.model}
            {v.variant && <span className="text-text-secondary"> {v.variant}</span>}
          </h1>
          <p className="mt-3 max-w-2xl text-text-secondary">{v.shortDescription}</p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-text-muted">Cena</div>
          <div className="font-display text-5xl text-accent">{formatPrice(v.price)}</div>
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <Gallery images={v.images} alt={label} />

          <section>
            <h2 className="section-title text-2xl">Najwazniejsze cechy</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {v.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-3 border border-bg-border bg-bg-elevated px-4 py-3 text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="section-title text-2xl">Dane techniczne</h2>
            <dl className="mt-4 overflow-hidden border border-bg-border">
              {v.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between gap-4 px-5 py-3 text-sm ${
                    i % 2 === 0 ? 'bg-bg-elevated' : 'bg-bg-card'
                  }`}
                >
                  <dt className="text-text-muted">{s.label}</dt>
                  <dd className="font-medium text-text-primary">{s.value}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 bg-bg-elevated px-5 py-3 text-sm">
                <dt className="text-text-muted">Przebieg</dt>
                <dd className="font-medium text-text-primary">{formatMileage(v.mileage)}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="section-title text-2xl">Opis</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-text-secondary">
              {v.description}
            </p>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <VehicleInquiryForm
            vehicleSlug={v.slug}
            vehicleLabel={`${label} ${v.year}`}
          />
        </aside>
      </div>
    </article>
  );
}
