import nodemailer from 'nodemailer';

let cached: nodemailer.Transporter | null = null;

export function getTransporter(): nodemailer.Transporter | null {
  if (cached) return cached;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return cached;
}

export async function sendMail(opts: {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();
  const to = process.env.MAIL_TO ?? process.env.SMTP_USER;
  const from = process.env.MAIL_FROM ?? process.env.SMTP_USER;

  if (!transporter || !to || !from) {
    console.warn('[mailer] SMTP not configured — message would have been:', opts);
    return { skipped: true as const };
  }

  await transporter.sendMail({
    from,
    to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
  });
  return { skipped: false as const };
}

export function escapeHtml(s: unknown) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
