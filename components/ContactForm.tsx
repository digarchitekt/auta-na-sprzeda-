'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/contact', {
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
    <form onSubmit={onSubmit} className="card space-y-4 p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-name">Imię i nazwisko *</label>
          <input id="c-name" name="name" required className="input" placeholder="Jan Kowalski" />
        </div>
        <div>
          <label className="label" htmlFor="c-phone">Telefon</label>
          <input id="c-phone" name="phone" type="tel" className="input" placeholder="+48 600 000 000" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="c-email">E-mail *</label>
        <input id="c-email" name="email" required type="email" className="input" placeholder="ty@example.com" />
      </div>

      <div>
        <label className="label" htmlFor="c-subject">Temat</label>
        <input id="c-subject" name="subject" className="input" placeholder="Pytanie o ofertę" />
      </div>

      <div>
        <label className="label" htmlFor="c-msg">Wiadomość *</label>
        <textarea
          id="c-msg"
          name="message"
          required
          rows={6}
          className="input resize-none"
          placeholder="Treść wiadomości..."
        />
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
        {status === 'sending' ? 'Wysylam...' : 'Wyślij wiadomość'}
      </button>

      {status === 'ok' && (
        <p className="border border-green-700/40 bg-green-900/20 px-4 py-3 text-sm text-green-300">
          Dziekujemy. Odpowiemy najszybciej jak to mozliwe.
        </p>
      )}
      {status === 'error' && (
        <p className="border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm text-red-300">
          Nie udało się wysłać wiadomości. {error}
        </p>
      )}
    </form>
  );
}
