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
            3 miesiace gwarancji
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
            <Link href="/kontakt" className="btn-outline">
              Zapytaj o auto
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-bg-border pt-8">
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">W ofercie</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary">6+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Sprzedanych aut</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary">50+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted">Zadowolonych klientow</dt>
              <dd className="mt-1 font-display text-3xl text-text-primary">50+</dd>
            </div>
          </dl>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-accent/10 via-transparent to-transparent blur-2xl" />
          <div className="relative border border-bg-border bg-bg-elevated p-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Komis aut uzywanych
            </span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
              Auta na sprzedaz.
              <br />
              <span className="text-text-secondary">Gotowe do jazdy.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary">
              Auta sprowadzone z zagranicy, sprawdzone mechanicznie i
              przygotowane do jazdy. Czysta historia, gotowe dokumenty, mozesz
              odjechac od reki.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                'Sprowadzone i odprawione',
                'Mechanicznie sprawdzone',
                'Detailing przed wydaniem',
                '3 miesiace gwarancji w cenie',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-text-primary">
                  <span className="grid h-5 w-5 place-items-center bg-accent text-[10px] font-bold text-white">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-between border-t border-bg-border pt-5 text-xs uppercase tracking-widest text-text-secondary">
              <span>Selekcja Opel &middot; Audi</span>
              <span className="text-accent">- 2026 -</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
