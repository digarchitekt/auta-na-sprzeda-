'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function SellForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('ok');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Blad wysylki');
    }
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="s-brand">Marka i model *</label>
          <input id="s-brand" name="brandModel" required className="input" placeholder="Opel Astra K, Audi A4..." />
        </div>
        <div>
          <label className="label" htmlFor="s-year">Rocznik *</label>
          <input id="s-year" name="year" required type="number" min="1980" max={new Date().getFullYear()} className="input" placeholder="2018" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="s-mileage">Przebieg (km) *</label>
          <input id="s-mileage" name="mileage" required type="number" min="0" className="input" placeholder="125000" />
        </div>
        <div>
          <label className="label" htmlFor="s-price">Cena oczekiwana (PLN) *</label>
          <input id="s-price" name="price" required type="number" min="0" className="input" placeholder="45000" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="s-fuel">Rodzaj paliwa</label>
          <select id="s-fuel" name="fuel" className="input">
            <option>Benzyna</option>
            <option>Diesel</option>
            <option>LPG</option>
            <option>Hybryda</option>
            <option>Elektryk</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="s-vin">VIN (opcjonalnie)</label>
          <input id="s-vin" name="vin" className="input" placeholder="WAUZZZ4..." maxLength={17} />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="s-notes">Dodatkowe informacje</label>
        <textarea
          id="s-notes"
          name="notes"
          rows={4}
          className="input resize-none"
          placeholder="Stan techniczny, historia serwisowa, wyposazenie..."
        />
      </div>

      <hr className="border-bg-border" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="s-name">Imie i nazwisko *</label>
          <input id="s-name" name="name" required className="input" placeholder="Jan Kowalski" />
        </div>
        <div>
          <label className="label" htmlFor="s-phone">Telefon *</label>
          <input id="s-phone" name="phone" required type="tel" className="input" placeholder="+48 600 000 000" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="s-email">E-mail</label>
        <input id="s-email" name="email" type="email" className="input" placeholder="ty@example.com" />
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
        {status === 'sending' ? 'Wysylam...' : 'Wyslij zgloszenie'}
      </button>

      {status === 'ok' && (
        <p className="border border-green-700/40 bg-green-900/20 px-4 py-3 text-sm text-green-300">
          Dziekujemy za zgloszenie. Odezwiemy sie po weryfikacji w ciagu 24h.
        </p>
      )}
      {status === 'error' && (
        <p className="border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm text-red-300">
          Nie udalo sie wyslac zgloszenia. {error}
        </p>
      )}

      <p className="text-[11px] text-text-muted">
        * Pola wymagane. Wysylajac formularz wyrazasz zgode na kontakt zwrotny.
      </p>
    </form>
  );
}
