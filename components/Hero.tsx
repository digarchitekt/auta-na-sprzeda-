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
      {/* Subtle accent glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 30%, rgba(225,29,46,0.25), transparent 50%)',
        }}
      />

      <div className="container-x relative z-10 flex flex-col items-center pb-28 pt-32 text-center md:pb-36 md:pt-40 lg:pb-44 lg:pt-44">
        <Reveal variant="scale" duration={700}>
          <span className="inline-flex items-center gap-2 border border-bg-border bg-bg-elevated/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-text-secondary backdrop-blur">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Gwarantujemy udany zakup
          </span>
        </Reveal>

        <Reveal variant="blur" delay={150} duration={900}>
          <h1 className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-text-primary md:text-7xl">
            Tanie, używane auta na sprzedaż, sprawdzone,{' '}
            <span className="relative inline-block text-accent">
              gotowe do jazdy
              <span
                aria-hidden
                className="draw-line absolute -bottom-1 left-0 h-[3px] w-full bg-accent"
              />
            </span>
          </h1>
        </Reveal>

        <Reveal variant="fade-up" delay={400}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#oferta" className="btn-primary btn-shimmer">
              Zobacz ofertę
            </Link>
            <Link href="/kontakt" className="btn-outline">
              Zapytaj o auto
            </Link>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={600} duration={800}>
          <dl className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-bg-border/60 pt-8">
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Aktualnie w ofercie</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">
                <Counter to={vehicleCount} />
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Sprzedanych aut</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">
                <Counter to={50} suffix="+" />
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Zadowolonych klientów</dt>
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
