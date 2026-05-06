import Link from 'next/link';
import Counter from '@/components/Counter';
import Reveal from '@/components/Reveal';
import HeroVideo from '@/components/HeroVideo';
import { vehicles } from '@/data/vehicles';

export default function Hero() {
  const vehicleCount = vehicles.length;
  return (
    <section className="relative -mt-14 overflow-hidden md:-mt-16">
      {/* Background video — ping-pong loop, behind navbar */}
      <HeroVideo />
      {/* Dark overlay so text is readable */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.75) 55%, rgba(10,10,10,1) 100%)',
        }}
      />
      {/* Subtle accent glow — moved to bottom-left for editorial weight */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 90%, rgba(225,29,46,0.30), transparent 55%)',
        }}
      />

      {/* Vertical guide line on left edge — editorial detail */}
      <div
        aria-hidden
        className="absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-bg-border/50 to-transparent md:block"
      />

      {/* Vertical meta on right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-180 font-display text-[10px] uppercase tracking-[0.4em] text-text-muted/60 md:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        Podkarpacie · Est. 2001
      </div>

      <div className="container-x relative z-10 grid h-screen max-h-[860px] min-h-[600px] grid-cols-12 gap-x-4 gap-y-6 pb-8 pt-24 md:gap-x-6 md:pb-10 md:pt-28">
        {/* Top row — index marker + badge */}
        <div className="col-span-12 flex items-center gap-3">
          <Reveal variant="scale" duration={700}>
            <div className="flex items-center gap-3">
              <span className="font-display text-sm tracking-widest text-accent">
                — 01
              </span>
              <span className="inline-flex items-center gap-2 border border-bg-border bg-bg-elevated/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-text-secondary backdrop-blur">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                Gwarantujemy udany zakup
              </span>
            </div>
          </Reveal>
        </div>

        {/* H1 + CTAs — left-aligned, anchored to bottom of grid */}
        <div className="col-span-12 self-end md:col-span-8">
          <Reveal variant="blur" delay={150} duration={900}>
            <h1 className="font-display text-[clamp(2.25rem,6.5vw,5.75rem)] uppercase leading-[0.9] tracking-tight text-text-primary">
              Używane auta na&nbsp;sprzedaż,
              <br />
              sprawdzone,{' '}
              <span className="relative inline-block text-accent">
                gotowe do&nbsp;jazdy.
                <span
                  aria-hidden
                  className="draw-line absolute -bottom-1 left-0 h-[3px] w-full bg-accent"
                />
              </span>
            </h1>
          </Reveal>

          <Reveal variant="fade-up" delay={400}>
            <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
              <Link href="#oferta" className="btn-primary btn-shimmer">
                Zobacz ofertę
              </Link>
              <Link href="/kontakt" className="btn-outline">
                Zapytaj o auto
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Stats — vertical stack, right column, anchored to bottom */}
        <div className="col-span-12 self-end md:col-span-4">
          <Reveal variant="fade-up" delay={600} duration={800}>
            <dl className="grid grid-cols-3 gap-4 border-t border-bg-border/60 pt-5 md:grid-cols-1 md:gap-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-text-muted">
                  W ofercie
                </dt>
                <dd className="mt-1 font-display text-3xl leading-none text-text-primary md:text-5xl">
                  <Counter to={vehicleCount} />
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-text-muted">
                  Sprzedanych
                </dt>
                <dd className="mt-1 font-display text-3xl leading-none text-text-primary md:text-5xl">
                  <Counter to={50} suffix="+" />
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-text-muted">
                  Klientów
                </dt>
                <dd className="mt-1 font-display text-3xl leading-none text-text-primary md:text-5xl">
                  <Counter to={50} suffix="+" />
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
