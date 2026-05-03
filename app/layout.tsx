import type { Metadata, Viewport } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { company } from '@/data/company';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const bebas = Bebas_Neue({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://autanasprzedaz.com'),
  title: {
    default: 'Auta Na Sprzedaz | Wyselekcjonowane Opel i Audi',
    template: '%s | Auta Na Sprzedaz',
  },
  description:
    'Sprawdzone, wyselekcjonowane samochody marki Opel i Audi. Sprowadzane z zagranicy, przygotowane do jazdy, 3 miesiace gwarancji.',
  keywords: ['skup aut', 'komis Opel', 'komis Audi', 'sprzedaz aut', 'Astra OPC', 'Audi A8', 'auta uzywane'],
  authors: [{ name: company.name }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Auta Na Sprzedaz | Wyselekcjonowane Opel i Audi',
    description:
      'Sprawdzone, wyselekcjonowane samochody marki Opel i Audi. 30 lat doswiadczenia, 500+ aut.',
    url: 'https://autanasprzedaz.com',
    siteName: 'Auta Na Sprzedaz',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/images/audi-front.webp',
        width: 1920,
        height: 1080,
        alt: 'Auta Na Sprzedaz - Opel i Audi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auta Na Sprzedaz | Wyselekcjonowane Opel i Audi',
    description:
      'Sprawdzone, wyselekcjonowane samochody marki Opel i Audi. 30 lat doswiadczenia.',
    images: ['/images/audi-front.webp'],
  },
  robots:
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? { index: true, follow: true }
      : { index: false, follow: false, noarchive: true, nosnippet: true },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

const autoDealerSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: company.name,
  url: `https://${company.domain}`,
  telephone: company.phone,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressCountry: 'PL',
  },
  priceRange: '$$',
  openingHoursSpecification: company.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.day,
    description: h.value,
  })),
  image: `https://${company.domain}/images/audi-front.webp`,
  areaServed: 'PL',
  description:
    'Komis aut. Wyselekcjonowane Opel i Audi sprowadzane z zagranicy. 30 lat doswiadczenia, 500+ przygotowanych aut, gwarancja 3 miesiace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`dark ${inter.variable} ${bebas.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-text-primary">
        {/* Skip to content for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Przejdz do tresci
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileNav />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(autoDealerSchema) }}
        />
      </body>
    </html>
  );
}
