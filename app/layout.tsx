import type { Metadata, Viewport } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import Preloader from '@/components/Preloader';
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
    default: 'Tanie uzywane auta na sprzedaz - Opel i Audi | Podkarpacie, Krosno, Rzeszow',
    template: '%s | Auta Na Sprzedaz',
  },
  description:
    'Uzywane auta na sprzedaz - Opel i Audi. Sprawdzone egzemplarze sprowadzane z zagranicy oraz z kraju, gotowe do jazdy. 25 lat doswiadczenia, 250+ przygotowanych aut. Brzozow, Krosno, Rzeszow - klienci z calej Polski.',
  keywords: [
    'uzywane auta na sprzedaz',
    'auta na sprzedaz',
    'tanie auta na sprzedaz',
    'tanie uzywane auta',
    'auta uzywane Podkarpacie',
    'komis aut Krosno',
    'komis aut Rzeszow',
    'komis aut Brzozow',
    'auta uzywane Krakow',
    'samochody na sprzedaz',
    'komis Opel',
    'komis Audi',
    'Opel Astra na sprzedaz',
    'Audi A8 na sprzedaz',
    'auto z gwarancja',
    'sprowadzanie aut z zagranicy',
    'tanie samochody Podkarpacie',
  ],
  authors: [{ name: company.name }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tanie uzywane auta na sprzedaz - Opel i Audi | Podkarpacie',
    description:
      'Sprawdzone uzywane auta na sprzedaz. Opel i Audi sprowadzane z zagranicy, gotowe do jazdy. Brzozow, Krosno, Rzeszow.',
    url: 'https://autanasprzedaz.com',
    siteName: 'Auta Na Sprzedaz',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/images/audi-front.webp',
        width: 1920,
        height: 1080,
        alt: 'Tanie uzywane auta na sprzedaz - Opel i Audi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanie uzywane auta na sprzedaz - Opel i Audi | Podkarpacie',
    description:
      'Sprawdzone uzywane auta na sprzedaz. Opel i Audi gotowe do jazdy. Brzozow, Krosno, Rzeszow.',
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
  '@id': `https://${company.domain}/#dealer`,
  name: company.name,
  url: `https://${company.domain}`,
  telephone: company.phone,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    addressCountry: 'PL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: company.geo.latitude,
    longitude: company.geo.longitude,
  },
  priceRange: '$$',
  openingHoursSpecification: company.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.day,
    description: h.value,
  })),
  image: `https://${company.domain}/images/audi-front.webp`,
  // Service area: cala Polska, glownie Podkarpacie i okoliczne wojewodztwa
  areaServed: [
    { '@type': 'Country', name: 'Polska' },
    { '@type': 'AdministrativeArea', name: 'wojewodztwo podkarpackie' },
    { '@type': 'AdministrativeArea', name: 'wojewodztwo malopolskie' },
    { '@type': 'AdministrativeArea', name: 'wojewodztwo lubelskie' },
    { '@type': 'AdministrativeArea', name: 'wojewodztwo swietokrzyskie' },
    ...company.servicedCities.map((c) => ({ '@type': 'City', name: c })),
  ],
  description:
    'Tanie uzywane auta na sprzedaz - Opel i Audi. Komis aut sprowadzajacy egzemplarze z zagranicy oraz z kraju. Brzozow, Krosno, Rzeszow, Sanok, Tarnow, Lublin. 25 lat doswiadczenia, 250+ przygotowanych aut. Sprzedaz dla klientow z calej Polski.',
  knowsLanguage: ['pl', 'Polish'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `https://${company.domain}/#website`,
  url: `https://${company.domain}`,
  name: company.name,
  inLanguage: 'pl-PL',
  publisher: { '@id': `https://${company.domain}/#dealer` },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`dark ${inter.variable} ${bebas.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-text-primary">
        <Preloader />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
