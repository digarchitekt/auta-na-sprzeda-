import Link from 'next/link';
import Counter from '@/components/Counter';
import Reveal from '@/components/Reveal';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background video with poster fallback */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-bg.jpg"
        aria-hidden
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay so text is readable */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.75) 55%, rgba(10,10,10,1) 100%)',
        }}
      />
      {/* Subtle accent glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 30%, rgba(225,29,46,0.25), transparent 50%)',
        }}
      />

      <div className="container-x relative z-10 flex flex-col items-center pb-28 pt-20 text-center md:pb-36 md:pt-24 lg:pb-44 lg:pt-28">
        <Reveal variant="scale" duration={700}>
          <span className="inline-flex items-center gap-2 border border-bg-border bg-bg-elevated/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-text-secondary backdrop-blur">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            3 miesiace gwarancji
          </span>
        </Reveal>

        <Reveal variant="blur" delay={150} duration={900}>
          <h1 className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-text-primary md:text-7xl">
            Auta na sprzedaz,
            <br />
            sprawdzone,{' '}
            <span className="relative inline-block text-accent">
              gotowe do jazdy
              <span
                aria-hidden
                className="glow-line absolute -bottom-1 left-0 h-[3px] w-full bg-accent"
              />
            </span>
          </h1>
        </Reveal>

        <Reveal variant="fade-up" delay={400} duration={700}>
          <p className="mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
            Znajdziesz tu uzywane samochody w roznych segmentach cenowych - dla
            rodziny, do miasta i bardziej wymagajacych. Kazdy znajdzie cos dla
            siebie. Rozejrzyj sie po ofercie.
          </p>
        </Reveal>

        <Reveal variant="fade-up" delay={600}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#oferta" className="btn-primary btn-shimmer">
              Zobacz oferte
            </Link>
            <Link href="/kontakt" className="btn-outline">
              Zapytaj o auto
            </Link>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={800} duration={800}>
          <dl className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-bg-border/60 pt-8">
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">W ofercie</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">
                <Counter to={6} suffix="+" />
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Sprzedanych aut</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">
                <Counter to={50} suffix="+" />
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Zadowolonych klientow</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">
                <Counter to={50} suffix="+" />
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
