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
  const title = `${label} - ${formatPrice(v.price)}`;
  const cover = v.images[0] ?? '/images/audi-front.webp';
  return {
    title,
    description: v.shortDescription,
    alternates: { canonical: `/auta/${v.slug}` },
    openGraph: {
      title,
      description: v.shortDescription,
      url: `https://autanasprzedaz.com/auta/${v.slug}`,
      type: 'website',
      images: [{ url: cover, alt: label }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: v.shortDescription,
      images: [cover],
    },
  };
}

export default function VehiclePage({ params }: { params: { slug: string } }) {
  const v = getVehicleBySlug(params.slug);
  if (!v) notFound();

  const label = `${v.brand} ${v.model} ${v.variant ?? ''}`.trim();

  // JSON-LD: Vehicle/Product schema for rich results
  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${label} ${v.year}`,
    brand: { '@type': 'Brand', name: v.brand },
    model: v.model,
    vehicleModelDate: String(v.year),
    bodyType: v.bodyType,
    color: v.color,
    fuelType: v.fuel,
    vehicleTransmission: v.transmission,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: v.mileage, unitCode: 'KMT' },
    vehicleEngine: { '@type': 'EngineSpecification', name: v.engine, enginePower: { '@type': 'QuantitativeValue', value: v.power, unitCode: 'BHP' } },
    image: v.images.map((img) => `https://autanasprzedaz.com${img}`),
    description: v.description,
    offers: {
      '@type': 'Offer',
      price: v.price,
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock',
      url: `https://autanasprzedaz.com/auta/${v.slug}`,
    },
  };

  return (
    <article className="container-x py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />
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

      {/* Galeria + dane po prawej */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_440px]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Gallery images={v.images} alt={label} />
        </div>

        <div className="space-y-8">
          {/* Quick specs grid */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
              Najważniejsze parametry
            </h2>
            <dl className="mt-3 grid grid-cols-2 gap-3">
              {[
                { label: 'Rok', value: String(v.year) },
                { label: 'Przebieg', value: formatMileage(v.mileage) },
                { label: 'Paliwo', value: v.fuel },
                { label: 'Skrzynia', value: v.transmission },
                { label: 'Moc', value: `${v.power} KM` },
                { label: 'Silnik', value: v.engine },
              ].map((s) => (
                <div key={s.label} className="border border-bg-border bg-bg-elevated p-3">
                  <div className="text-[11px] uppercase tracking-wider text-text-muted">
                    {s.label}
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-text-primary">{s.value}</div>
                </div>
              ))}
            </dl>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
              Wyposażenie i atuty
            </h2>
            <ul className="mt-3 space-y-2">
              {v.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-3 border border-bg-border bg-bg-elevated px-4 py-3 text-sm"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Specs table */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
              Dane techniczne
            </h2>
            <dl className="mt-3 overflow-hidden border border-bg-border">
              {v.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between gap-4 px-4 py-2.5 text-sm ${
                    i % 2 === 0 ? 'bg-bg-elevated' : 'bg-bg-card'
                  }`}
                >
                  <dt className="text-text-muted">{s.label}</dt>
                  <dd className="text-right font-medium text-text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
              Opis
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-secondary">
              {v.description}
            </p>
          </section>

          {/* Anchor CTA */}
          <a
            href="#zapytaj"
            className="btn-primary w-full"
          >
            Zapytaj o to auto
          </a>
        </div>
      </div>

      {/* Formularz na dole, pełna szerokosc */}
      <section id="zapytaj" className="mt-20 border-t border-bg-border pt-16 scroll-mt-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Kontakt
            </span>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
              Zainteresowany tym autem?
            </h2>
            <p className="mt-3 text-text-secondary">
              Zostaw kontakt - oddzwonimy lub odpiszemy najszybciej jak to mozliwe.
            </p>
          </div>

          <div className="mt-8">
            <VehicleInquiryForm
              vehicleSlug={v.slug}
              vehicleLabel={`${label} ${v.year}`}
            />
          </div>
        </div>
      </section>
    </article>
  );
}
