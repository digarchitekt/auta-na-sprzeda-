'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function VehicleInquiryForm({
  vehicleSlug,
  vehicleLabel,
}: {
  vehicleSlug: string;
  vehicleLabel: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      vehicleSlug,
      vehicleLabel,
      name: fd.get('name'),
      phone: fd.get('phone'),
      email: fd.get('email'),
      message: fd.get('message'),
    };
    try {
      const res = await fetch('/api/vehicle-inquiry', {
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
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <div>
        <h3 className="font-display text-2xl uppercase tracking-tight">Zapytaj o to auto</h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-text-muted">
          {vehicleLabel}
        </p>
      </div>

      <div>
        <label className="label" htmlFor="vi-name">Imie i nazwisko</label>
        <input id="vi-name" name="name" required className="input" placeholder="Jan Kowalski" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="vi-phone">Telefon</label>
          <input id="vi-phone" name="phone" required type="tel" className="input" placeholder="+48 600 000 000" />
        </div>
        <div>
          <label className="label" htmlFor="vi-email">E-mail</label>
          <input id="vi-email" name="email" type="email" className="input" placeholder="ty@example.com" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="vi-msg">Wiadomosc</label>
        <textarea
          id="vi-msg"
          name="message"
          rows={4}
          className="input resize-none"
          placeholder="Czy auto jest jeszcze dostepne? Chcialbym umowic ogledziny..."
          defaultValue={`Dzien dobry, jestem zainteresowany ofertal: ${vehicleLabel}.`}
        />
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
        {status === 'sending' ? 'Wysylam...' : 'Wyslij zapytanie'}
      </button>

      {status === 'ok' && (
        <p className="border border-green-700/40 bg-green-900/20 px-4 py-3 text-sm text-green-300">
          Dziekujemy. Skontaktujemy sie tak szybko jak to mozliwe.
        </p>
      )}
      {status === 'error' && (
        <p className="border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm text-red-300">
          Nie udalo sie wyslac wiadomosci. {error}
        </p>
      )}
      <p className="text-[11px] text-text-muted">
        Wysylajac formularz wyrazasz zgode na kontakt zwrotny zgodnie z polityka prywatnosci.
      </p>
    </form>
  );
}
