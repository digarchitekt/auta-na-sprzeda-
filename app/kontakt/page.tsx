import type { Metadata } from 'next';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Skontaktuj sie z nami - sprzedaz, skup, finansowanie. Telefon, e-mail, lokalizacja.',
};

export default function ContactPage() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Fixed full-page background */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      <div className="container-x relative z-10 py-16">
        <div className="border-b border-bg-border pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Kontakt
        </span>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-tight md:text-5xl">
          Porozmawiajmy
        </h1>
        <p className="mt-4 max-w-2xl text-text-secondary">
          Zadzwon, napisz lub przyjedz osobiscie. Najlepsze decyzje zakupowe podejmuje sie po
          osobistej rozmowie i jezdzie probnej.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px]">
        <ContactForm />

        <aside className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
              Dane firmy
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <div className="text-text-muted text-xs uppercase tracking-wider">Adres</div>
                <div className="text-text-primary">{company.address.street}</div>
                <div className="text-text-primary">{company.address.city}</div>
              </li>
              <li>
                <div className="text-text-muted text-xs uppercase tracking-wider">Telefon</div>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="text-text-primary hover:text-accent"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <div className="text-text-muted text-xs uppercase tracking-wider">E-mail</div>
                <a href={`mailto:${company.email}`} className="text-text-primary hover:text-accent">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
              Godziny otwarcia
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {company.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between border-b border-bg-border pb-2 last:border-0">
                  <span className="text-text-secondary">{h.day}</span>
                  <span className="font-medium text-text-primary">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        </div>
      </div>
    </section>
  );
}
