import type { Metadata, Viewport } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import Preloader from '@/components/Preloader';
import CookieConsent from '@/components/CookieConsent';
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
    default: 'Tanie używane auta na sprzedaż - Opel i Audi | Podkarpacie, Krosno, Rzeszów',
    template: '%s | Auta Na Sprzedaż',
  },
  description:
    'Używane auta na sprzedaż - Opel i Audi. Sprawdzone egzemplarze sprowadzane z zagranicy oraz z kraju, gotowe do jazdy. 25 lat doświadczenia, 250+ przygotowanych aut. Brzozów, Krosno, Rzeszów - klienci z całej Polski.',
  keywords: [
    'używane auta na sprzedaż',
    'auta na sprzedaż',
    'tanie auta na sprzedaż',
    'tanie używane auta',
    'auta używane Podkarpacie',
    'komis aut Krosno',
    'komis aut Rzeszów',
    'komis aut Brzozów',
    'auta używane Kraków',
    'samochody na sprzedaż',
    'komis Opel',
    'komis Audi',
    'Opel Astra na sprzedaż',
    'Audi A8 na sprzedaż',
    'auto z gwarancja',
    'sprowadzanie aut z zagranicy',
    'tanie samochody Podkarpacie',
  ],
  authors: [{ name: company.name }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tanie używane auta na sprzedaż - Opel i Audi | Podkarpacie',
    description:
      'Sprawdzone używane auta na sprzedaż. Opel i Audi sprowadzane z zagranicy, gotowe do jazdy. Brzozów, Krosno, Rzeszów.',
    url: 'https://autanasprzedaz.com',
    siteName: 'Auta Na Sprzedaż',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/images/audi-front.webp',
        width: 1920,
        height: 1080,
        alt: 'Tanie używane auta na sprzedaż - Opel i Audi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanie używane auta na sprzedaż - Opel i Audi | Podkarpacie',
    description:
      'Sprawdzone używane auta na sprzedaż. Opel i Audi gotowe do jazdy. Brzozów, Krosno, Rzeszów.',
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
  // Service area: cała Polska, głównie Podkarpacie i okoliczne województwa
  areaServed: [
    { '@type': 'Country', name: 'Polska' },
    { '@type': 'AdministrativeArea', name: 'województwo podkarpackie' },
    { '@type': 'AdministrativeArea', name: 'województwo małopolskie' },
    { '@type': 'AdministrativeArea', name: 'województwo lubelskie' },
    { '@type': 'AdministrativeArea', name: 'województwo świętokrzyskie' },
    ...company.servicedCities.map((c) => ({ '@type': 'City', name: c })),
  ],
  description:
    'Tanie używane auta na sprzedaż - Opel i Audi. Komis aut sprowadzajacy egzemplarze z zagranicy oraz z kraju. Brzozów, Krosno, Rzeszów, Sanok, Tarnów, Lublin. 25 lat doświadczenia, 250+ przygotowanych aut. Sprzedaż dla klientów z całej Polski.',
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
          Przejdz do treści
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileNav />
        <CookieConsent />
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
