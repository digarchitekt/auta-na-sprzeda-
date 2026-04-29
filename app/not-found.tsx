import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-x grid place-items-center py-32 text-center">
      <span className="font-display text-[8rem] leading-none text-accent">404</span>
      <h1 className="mt-4 font-display text-3xl uppercase tracking-tight">Nie znaleziono strony</h1>
      <p className="mt-2 max-w-md text-text-secondary">
        Strona, ktorej szukasz, nie istnieje lub zostala przeniesiona.
      </p>
      <Link href="/" className="btn-primary mt-8">Wroc na strone glowna</Link>
    </section>
  );
}
