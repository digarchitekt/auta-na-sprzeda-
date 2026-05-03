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
    'Uzywane auta na sprzedaz - Opel i Audi. Sprawdzone egzemplarze sprowadzane z zagranicy, gotowe do jazdy. 30 lat doswiadczenia, 500+ przygotowanych aut. Brzozow, Krosno, Rzeszow, Sanok, Krakow, Lublin - dojezdzamy do 500 km.',
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
      'Sprawdzone uzywane auta na sprzedaz. Opel i Audi sprowadzane z zagranicy, gotowe do jazdy. Brzozow, Krosno, Rzeszow, Krakow.',
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
      'Sprawdzone uzywane auta na sprzedaz. Opel i Audi z gwarancja. Krosno, Rzeszow, Krakow.',
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
  // Service area: Podkarpacie + 500km radius (covering most of Poland)
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'wojewodztwo podkarpackie' },
    { '@type': 'AdministrativeArea', name: 'wojewodztwo malopolskie' },
    { '@type': 'AdministrativeArea', name: 'wojewodztwo lubelskie' },
    { '@type': 'AdministrativeArea', name: 'wojewodztwo swietokrzyskie' },
    ...company.servicedCities.map((c) => ({ '@type': 'City', name: c })),
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    geoRadius: '500000', // meters = 500km
  },
  description:
    'Tanie uzywane auta na sprzedaz - Opel i Audi. Komis aut sprowadzajacy egzemplarze z zagranicy. Brzozow, Krosno, Rzeszow, Sanok, Krakow, Tarnow, Lublin. 30 lat doswiadczenia, 500+ przygotowanych aut, 3 miesiace gwarancji.',
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
