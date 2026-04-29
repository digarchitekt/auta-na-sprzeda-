import { NextResponse } from 'next/server';
import { sendMail, escapeHtml } from '@/lib/mailer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body ?? {};

    if (!name || !email || !message) {
      return new NextResponse('Brakuje wymaganych pol', { status: 400 });
    }
    if (typeof message !== 'string' || message.length > 5000) {
      return new NextResponse('Nieprawidlowa wiadomosc', { status: 400 });
    }

    await sendMail({
      subject: `[Kontakt] ${subject || 'Wiadomosc ze strony'}`,
      replyTo: String(email),
      text: `Imie: ${name}\nE-mail: ${email}\nTelefon: ${phone || '-'}\nTemat: ${subject || '-'}\n\n${message}`,
      html: `
        <h2>Nowa wiadomosc z formularza kontaktowego</h2>
        <p><strong>Imie:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone || '-')}</p>
        <p><strong>Temat:</strong> ${escapeHtml(subject || '-')}</p>
        <hr />
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return new NextResponse('Blad serwera', { status: 500 });
  }
}
