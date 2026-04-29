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
      <div className="container-x grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 border border-bg-border bg-bg-elevated px-3 py-1 text-xs font-semibold uppercase tracking-widest text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Opel &middot; Audi &middot; Selekcja
          </span>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-text-primary md:text-7xl">
            Sprawdzone auta.
            <br />
            <span className="text-accent">Bez kompromisu.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-text-secondary md:text-lg">
            Selekcjonujemy kazdy egzemplarz osobiscie. Pelna historia, jasna
            cena, transparentne dokumenty. Twoj nastepny samochod nie powinien
            byc loteria.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#oferta" className="btn-primary">
              Zobacz oferte
            </Link>
            <Link href="/sprzedaj-auto" className="btn-outline">
              Sprzedaj swoje auto
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-bg-border pt-8">
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Auta w ofercie</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary">5+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Lat na rynku</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary">10</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Zadowolonych</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary">500+</dd>
            </div>
          </dl>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-accent/10 via-transparent to-transparent blur-2xl" />
          <div className="relative aspect-[5/4] border border-bg-border bg-bg-elevated">
            <div className="absolute inset-0 grid place-items-center font-display text-[10rem] leading-none tracking-widest text-bg-border">
              A8
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-bg-border pt-4 text-xs uppercase tracking-widest text-text-secondary">
              <span>Edycja Kolekcjonerska</span>
              <span className="text-accent">- 2026 -</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
