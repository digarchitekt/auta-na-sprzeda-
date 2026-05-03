import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import VehicleCard from '@/components/VehicleCard';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import Marquee from '@/components/Marquee';
import VehicleCarousel from '@/components/VehicleCarousel';
import { vehicles } from '@/data/vehicles';
import { company } from '@/data/company';

// FAQ schema for rich results
const faqs = [
  {
    q: 'Gdzie kupie tanie uzywane auta na sprzedaz?',
    a: 'Oferujemy uzywane auta marek Opel i Audi sprowadzane z zagranicy. Bazujemy w Brzozowie na Podkarpaciu, ale dojezdzamy do klientow w promieniu 500 km - Krosno, Rzeszow, Sanok, Krakow, Lublin, Tarnow i okolice.',
  },
  {
    q: 'Czy auta sa z gwarancja?',
    a: 'Tak. Kazde auto sprzedajemy z 3-miesieczna gwarancja. Wczesniej kazdy egzemplarz przechodzi pelna inspekcje techniczna i przygotowanie w naszym warsztacie.',
  },
  {
    q: 'Jakimi miastami obejmujemy obsluga?',
    a: 'Brzozow, Krosno, Rzeszow, Sanok, Jaslo, Przemysl, Tarnow, Krakow, Lublin, Mielec, Stalowa Wola, Debica, Nowy Sacz - i caly obszar Podkarpacia oraz Malopolski. W razie potrzeby dojezdzamy dalej, do 500 km.',
  },
  {
    q: 'Czy mozna sprzedac wam swoje auto?',
    a: 'Tak. Wystaw zgloszenie przez formularz "Sprzedaj Auto" - zweryfikujemy auto i wystawimy je w naszej ofercie. Reszta po naszej stronie.',
  },
  {
    q: 'Skad sprowadzane sa auta?',
    a: 'Glownie z Niemiec, Belgii, Holandii i Francji. Wlasciciel z 30-letnim doswiadczeniem osobiscie sprawdza kazdy egzemplarz przed sprowadzeniem.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <Marquee
        items={[
          'OPEL',
          'AUDI',
          'SELEKCJA',
          'GWARANCJA 3 MC',
          'GOTOWE DO JAZDY',
          'SPROWADZANE Z ZAGRANICY',
          '500+ AUT',
        ]}
      />

      <section id="oferta" className="relative py-20">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/texture-dark.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-bg/75" />
        {/* Top fade - smooth transition from Hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0) 100%)',
          }}
        />

        <Reveal variant="slide-right" duration={900} className="container-x relative z-10 flex flex-wrap items-end justify-between gap-4 border-b border-bg-border pb-6">
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
        </Reveal>

        <div className="relative z-10 mt-10">
          <VehicleCarousel>
            {vehicles.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </VehicleCarousel>
        </div>

        <div className="container-x relative z-10 mt-12 flex justify-center">
          <Link
            href="/auta"
            className="group inline-flex items-center gap-3 border border-bg-border bg-bg-elevated px-8 py-4 text-sm font-bold uppercase tracking-wider text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Zobacz wszystkie auta
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
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
          ].map((f, i) => {
            const variant = i === 0 ? 'slide-right' : i === 1 ? 'fade-up' : 'slide-left';
            return (
              <Reveal key={f.kicker} variant={variant} delay={i * 150} duration={800}>
                <div className="card p-8">
                  <span className="font-display text-5xl text-accent">{f.kicker}</span>
                  <h3 className="mt-4 text-xl font-semibold uppercase tracking-wider">{f.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* O nas / Dlaczego my */}
      <section id="o-nas" className="relative overflow-hidden py-20">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/texture-dark.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-bg/70" />

        <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal variant="slide-right" duration={900}>
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
            <div className="card-lift mt-8 inline-flex items-center gap-4 border border-bg-border bg-bg-elevated px-5 py-4">
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
                    className="star-pop"
                    style={{ animationDelay: `${500 + i * 120}ms` }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="leading-tight">
                <div className="font-display text-2xl text-text-primary">
                  <Counter to={4.7} decimals={1} /> / 5
                </div>
                <div className="text-xs uppercase tracking-wider text-text-muted">
                  <Counter to={50} suffix="+" /> pozytywnych opinii
                </div>
              </div>
            </div>
          </Reveal>

          {/* Wlasciciel / fachowiec */}
          <Reveal variant="slide-left" delay={150} duration={900} className="card overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden border-b border-bg-border bg-bg-elevated md:h-56">
              <Image
                src="/images/key-handover.webp"
                alt="Wlasciciel wreczajacy klucze"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(22,22,22,0.7) 100%)',
                }}
              />
            </div>
            <div className="p-8">
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
                <dd className="mt-1 font-display text-3xl text-text-primary">
                  <Counter to={30} duration={1800} />
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-muted">Sprowadzonych aut</dt>
                <dd className="mt-1 font-display text-3xl text-text-primary">
                  <Counter to={500} suffix="+" duration={2000} />
                </dd>
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
          </Reveal>
        </div>
      </section>

      {/* Obslugiwane miasta — local SEO */}
      <section id="obslugujemy" className="border-y border-bg-border bg-bg-elevated py-16">
        <div className="container-x">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Obslugujemy
            </span>
            <h2 className="section-title mt-2">
              Tanie uzywane auta na Podkarpaciu i okolicach
            </h2>
            <p className="mt-4 text-text-secondary">
              Bazujemy w Brzozowie i obslugujemy klientow z calego Podkarpacia,
              Malopolski oraz wojewodztw oscienych. Auta dostarczamy w promieniu
              500 km - dojezdzamy do najwiekszych miast poludniowej Polski.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {company.servicedCities.map((c) => (
              <li
                key={c}
                className="border border-bg-border bg-bg-card px-4 py-2 text-sm font-medium text-text-primary"
              >
                Auta uzywane {c}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl text-sm text-text-muted">
            Szukasz <strong className="text-text-secondary">tanich uzywanych aut na sprzedaz</strong> w Twojej okolicy? Sprawdz nasza oferte sprawdzonych Opli i Audi - kazde auto przygotowane do jazdy z 3-miesieczna gwarancja.
          </p>
        </div>
      </section>

      {/* FAQ — rich results in Google */}
      <section className="relative bg-bg py-20">
        <div className="container-x relative z-10 max-w-3xl">
          <Reveal variant="fade-up" duration={700}>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Czesto zadawane pytania
            </span>
            <h2 className="section-title mt-2">FAQ - uzywane auta na sprzedaz</h2>
          </Reveal>

          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <Reveal
                key={f.q}
                variant="fade-up"
                delay={i * 80}
                duration={600}
              >
                <details className="group border border-bg-border bg-bg-elevated">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-text-primary">
                    <span>{f.q}</span>
                    <span
                      aria-hidden
                      className="text-xl text-accent transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="border-t border-bg-border px-5 py-4 text-sm leading-relaxed text-text-secondary">
                    {f.a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </section>

      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background image — full coverage */}
        <Image
          src="/images/audi-front.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />

        {/* Smooth top + bottom fade to page bg, plus side darken for legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0.55) 18%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.55) 82%, rgba(10,10,10,1) 100%)',
          }}
        />
        {/* Accent glow */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at 80% 50%, rgba(225,29,46,0.18), transparent 55%)',
          }}
        />

        <Reveal
          variant="scale"
          duration={800}
          className="container-x relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Skup aut
            </span>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-5xl">
              Masz auto na sprzedaz?
            </h2>
            <p className="mt-4 max-w-xl text-text-secondary md:text-lg">
              Zglos swoje auto, a my zweryfikujemy zgloszenie i wystawimy je w naszej
              ofercie. Reszta jest po naszej stronie.
            </p>
          </div>
          <Link
            href="/sprzedaj-auto"
            className="btn-primary btn-shimmer shrink-0 px-8 py-4"
          >
            Wystaw swoje auto
          </Link>
        </Reveal>
      </section>
    </>
  );
}
