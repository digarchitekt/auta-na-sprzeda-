import { NextResponse } from 'next/server';
import { sendMail, escapeHtml } from '@/lib/mailer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vehicleSlug, vehicleLabel, name, phone, email, message } = body ?? {};

    if (!vehicleSlug || !name || !phone) {
      return new NextResponse('Brakuje wymaganych pol', { status: 400 });
    }

    await sendMail({
      subject: `[Auto] Zapytanie: ${vehicleLabel || vehicleSlug}`,
      replyTo: email ? String(email) : undefined,
      text: `Pojazd: ${vehicleLabel} (${vehicleSlug})\nImie: ${name}\nTelefon: ${phone}\nE-mail: ${email || '-'}\n\n${message || '-'}`,
      html: `
        <h2>Nowe zapytanie o pojazd</h2>
        <p><strong>Pojazd:</strong> ${escapeHtml(vehicleLabel)} (<code>${escapeHtml(vehicleSlug)}</code>)</p>
        <p><strong>Imię:</strong> ${escapeHtml(name)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email || '-')}</p>
        <hr />
        <p>${escapeHtml(message || '-').replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return new NextResponse('Blad serwera', { status: 500 });
  }
}
