import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-bg-border bg-bg">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(225,29,46,0.18), transparent 45%), radial-gradient(circle at 80% 70%, rgba(225,29,46,0.10), transparent 50%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="container-x flex flex-col items-center py-24 text-center md:py-32">
        <span className="inline-flex items-center gap-2 border border-bg-border bg-bg-elevated px-3 py-1 text-xs font-semibold uppercase tracking-widest text-text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          3 miesiace gwarancji
        </span>
        <h1 className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-text-primary md:text-7xl">
          Auta na sprzedaz,
          <br />
          sprawdzone,{' '}
          <span className="text-accent">gotowe do jazdy</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
          Znajdziesz tu uzywane samochody w roznych segmentach cenowych - dla
          rodziny, do miasta i bardziej wymagajacych. Kazdy znajdzie cos dla
          siebie. Rozejrzyj sie po ofercie.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="#oferta" className="btn-primary">
            Zobacz oferte
          </Link>
          <Link href="/kontakt" className="btn-outline">
            Zapytaj o auto
          </Link>
        </div>

        <dl className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-bg-border pt-8">
          <div>
            <dt className="text-xs uppercase tracking-wider text-text-muted">W ofercie</dt>
            <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">6+</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-text-muted">Sprzedanych aut</dt>
            <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">50+</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-text-muted">Zadowolonych klientow</dt>
            <dd className="mt-1 font-display text-3xl text-text-primary md:text-4xl">50+</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
