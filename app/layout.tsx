import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
  metadataBase: new URL('https://autanasprzedaz.com'),
  title: {
    default: 'Auta Na Sprzedaz | Wyselekcjonowane Opel i Audi',
    template: '%s | Auta Na Sprzedaz',
  },
  description:
    'Sprawdzone, wyselekcjonowane samochody marki Opel i Audi. Pelna historia, gwarancja, finansowanie. Skup i komis aut.',
  keywords: ['skup aut', 'komis Opel', 'komis Audi', 'sprzedaz aut', 'Astra OPC', 'Audi A8'],
  openGraph: {
    title: 'Auta Na Sprzedaz | Wyselekcjonowane Opel i Audi',
    description: 'Sprawdzone, wyselekcjonowane samochody marki Opel i Audi.',
    url: 'https://autanasprzedaz.com',
    siteName: 'Auta Na Sprzedaz',
    locale: 'pl_PL',
    type: 'website',
  },
  robots:
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? { index: true, follow: true }
      : { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg text-text-primary">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
