import { NextResponse } from 'next/server';
import { sendMail, escapeHtml } from '@/lib/mailer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brandModel, year, mileage, price, fuel, vin, notes, name, phone, email } = body ?? {};

    if (!brandModel || !year || !mileage || !price || !name || !phone) {
      return new NextResponse('Brakuje wymaganych pol', { status: 400 });
    }

    const text = [
      `Marka/Model: ${brandModel}`,
      `Rocznik: ${year}`,
      `Przebieg: ${mileage} km`,
      `Cena oczekiwana: ${price} PLN`,
      `Paliwo: ${fuel || '-'}`,
      `VIN: ${vin || '-'}`,
      '',
      `Imie: ${name}`,
      `Telefon: ${phone}`,
      `E-mail: ${email || '-'}`,
      '',
      'Uwagi:',
      notes || '-',
    ].join('\n');

    await sendMail({
      subject: `[Skup] Zgloszenie: ${brandModel} (${year})`,
      replyTo: email ? String(email) : undefined,
      text,
      html: `
        <h2>Nowe zgloszenie skupu</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Marka / Model</strong></td><td>${escapeHtml(brandModel)}</td></tr>
          <tr><td><strong>Rocznik</strong></td><td>${escapeHtml(year)}</td></tr>
          <tr><td><strong>Przebieg</strong></td><td>${escapeHtml(mileage)} km</td></tr>
          <tr><td><strong>Cena oczekiwana</strong></td><td>${escapeHtml(price)} PLN</td></tr>
          <tr><td><strong>Paliwo</strong></td><td>${escapeHtml(fuel || '-')}</td></tr>
          <tr><td><strong>VIN</strong></td><td>${escapeHtml(vin || '-')}</td></tr>
        </table>
        <hr />
        <p><strong>Kontakt:</strong> ${escapeHtml(name)} &middot; ${escapeHtml(phone)} &middot; ${escapeHtml(email || '-')}</p>
        <p><strong>Uwagi:</strong></p>
        <p>${escapeHtml(notes || '-').replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return new NextResponse('Blad serwera', { status: 500 });
  }
}
