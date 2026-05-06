export type VehicleSpec = {
  label: string;
  value: string;
};

export type Vehicle = {
  slug: string;
  brand: 'Opel' | 'Audi';
  model: string;
  variant?: string;
  year: number;
  price: number;
  currency: 'PLN';
  mileage: number;
  fuel: 'Benzyna' | 'Diesel' | 'LPG' | 'Hybryda' | 'Elektryk';
  transmission: 'Manualna' | 'Automatyczna';
  power: number;
  engine: string;
  bodyType: string;
  color: string;
  vin?: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: VehicleSpec[];
  images: string[];
  featured?: boolean;
  /** Jezeli true — auto pozostaje w pliku, ale nie jest pokazywane w serwisie. */
  hidden?: boolean;
};

const seq = (slug: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) =>
    `/images/vehicles/${slug}/${String(i + 1).padStart(2, '0')}.webp`,
  );

/**
 * Pelna lista pojazdow — uwzglednia rowniez te oznaczone jako hidden.
 * Sluzy jako kopia zapasowa, gdyby ktores auto wrocilo do sprzedazy.
 */
export const allVehicles: Vehicle[] = [
  {
    slug: 'opel-astra-k-2022',
    brand: 'Opel',
    model: 'Astra K',
    variant: '1.5 CDTI GS Line',
    year: 2022,
    price: 39999,
    currency: 'PLN',
    mileage: 78000,
    fuel: 'Diesel',
    transmission: 'Automatyczna',
    power: 122,
    engine: '1.5 CDTI',
    bodyType: 'Hatchback',
    color: 'Biały perłowy',
    shortDescription:
      'Najnowsza generacja Astry w sportowej linii GS. Ekonomiczny diesel, automat 9-bieg.',
    description:
      '[OPIS PLACEHOLDER] Auto z gwarancja, salon Polska, faktura VAT marża. Pełne wyposażenie pakietu GS Line.',
    highlights: [
      'Salon Polska',
      'Gwarancja producenta',
      'Adaptive Cruise Control',
      'Matrix LED',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2022' },
      { label: 'Przebieg', value: '78 000 km' },
      { label: 'Pojemność silnika', value: '1499 cm3' },
      { label: 'Moc', value: '122 KM' },
      { label: 'Rodzaj paliwa', value: 'Diesel' },
      { label: 'Skrzynia biegów', value: 'Automatyczna 9-bieg.' },
      { label: 'Napęd', value: 'Na przednie koła' },
      { label: 'Liczba drzwi', value: '5' },
      { label: 'Kolor', value: 'Biały perłowy' },
      { label: 'Kraj pochodzenia', value: 'Polska' },
    ],
    images: seq('astra-k-2022', 16),
    featured: true,
  },
  {
    slug: 'opel-astra-l-2022',
    brand: 'Opel',
    model: 'Astra L',
    variant: '1.2 Turbo Edition',
    year: 2022,
    price: 69999,
    currency: 'PLN',
    mileage: 45000,
    fuel: 'Benzyna',
    transmission: 'Manualna',
    power: 130,
    engine: '1.2 Turbo',
    bodyType: 'Hatchback',
    color: 'Srebrny metalik',
    shortDescription:
      'Najnowsza generacja Astry L. Nowoczesny silnik 1.2 Turbo, niski przebieg.',
    description:
      '[OPIS PLACEHOLDER] Auto serwisowane w ASO, pierwszy właściciel, faktura VAT marża.',
    highlights: [
      'Pierwszy właściciel',
      'Niski przebieg',
      'Pełna historia serwisowa',
      'Bezwypadkowy',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2022' },
      { label: 'Przebieg', value: '45 000 km' },
      { label: 'Pojemność silnika', value: '1199 cm3' },
      { label: 'Moc', value: '130 KM' },
      { label: 'Rodzaj paliwa', value: 'Benzyna' },
      { label: 'Skrzynia biegów', value: 'Manualna 6-bieg.' },
      { label: 'Napęd', value: 'Na przednie koła' },
      { label: 'Liczba drzwi', value: '5' },
      { label: 'Kolor', value: 'Srebrny metalik' },
      { label: 'Kraj pochodzenia', value: 'Polska' },
    ],
    images: seq('astra-l-2022', 14),
    featured: true,
  },
  {
    slug: 'opel-astra-opc-2013',
    brand: 'Opel',
    model: 'Astra OPC',
    variant: '2.0 Turbo',
    year: 2013,
    price: 39999,
    currency: 'PLN',
    mileage: 168000,
    fuel: 'Benzyna',
    transmission: 'Manualna',
    power: 280,
    engine: '2.0 Turbo',
    bodyType: 'Coupe 3d',
    color: 'Niebieski OPC',
    shortDescription:
      'Kultowy hot-hatch Opel Astra OPC. 280 KM, dyferencjał Drexler, fotele Recaro.',
    description:
      '[OPIS PLACEHOLDER] Egzemplarz dla kolekcjonera, stan bardzo dobry. Pełna historia, bez torowych przebiegow.',
    highlights: [
      '280 KM z fabryki',
      'Fotele Recaro Performance',
      'Dyferencjal Drexler LSD',
      'Pakiet Performance',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2013' },
      { label: 'Przebieg', value: '168 000 km' },
      { label: 'Pojemność silnika', value: '1998 cm3' },
      { label: 'Moc', value: '280 KM' },
      { label: 'Rodzaj paliwa', value: 'Benzyna' },
      { label: 'Skrzynia biegów', value: 'Manualna 6-bieg.' },
      { label: 'Napęd', value: 'Na przednie koła' },
      { label: 'Liczba drzwi', value: '3' },
      { label: 'Kolor', value: 'Niebieski OPC' },
      { label: 'Kraj pochodzenia', value: 'Niemcy' },
    ],
    images: seq('astra-opc-2013', 14),
    featured: true,
  },
  {
    slug: 'audi-a3-2018',
    brand: 'Audi',
    model: 'A3',
    variant: '2.0 TDI S-Line',
    year: 2018,
    price: 69999,
    currency: 'PLN',
    mileage: 145000,
    fuel: 'Diesel',
    transmission: 'Manualna',
    power: 150,
    engine: '2.0 TDI',
    bodyType: 'Hatchback 5d',
    color: 'Czarny metalik',
    shortDescription:
      'Audi A3 w pakiecie S-Line. Ekonomiczny diesel 2.0 TDI, doskonale wyposażenie.',
    description:
      '[OPIS PLACEHOLDER] Auto serwisowane, pełna historia. Pakiet S-Line wewnątrz i na zewnątrz.',
    highlights: [
      'Pakiet S-Line',
      'Bi-Xenon LED',
      'Tempomat',
      'Klimatyzacja automatyczna',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2018' },
      { label: 'Przebieg', value: '145 000 km' },
      { label: 'Pojemność silnika', value: '1968 cm3' },
      { label: 'Moc', value: '150 KM' },
      { label: 'Rodzaj paliwa', value: 'Diesel' },
      { label: 'Skrzynia biegów', value: 'Manualna 6-bieg.' },
      { label: 'Napęd', value: 'Na przednie koła' },
      { label: 'Liczba drzwi', value: '5' },
      { label: 'Kolor', value: 'Czarny metalik' },
      { label: 'Kraj pochodzenia', value: 'Niemcy' },
    ],
    images: seq('audi-a3-2018', 1),
  },
  {
    slug: 'audi-a8-2016',
    brand: 'Audi',
    model: 'A8',
    variant: '4.2 TDI Quattro Long',
    year: 2016,
    price: 250000,
    currency: 'PLN',
    mileage: 184000,
    fuel: 'Diesel',
    transmission: 'Automatyczna',
    power: 385,
    engine: '4.2 TDI V8',
    bodyType: 'Sedan',
    color: 'Czarny Phantom',
    shortDescription:
      'Flagowa limuzyna Audi A8 Long w bezkompromisowej wersji 4.2 TDI 385 KM.',
    description:
      '[OPIS PLACEHOLDER] Auto w stanie kolekcjonerskim. Pełne wyposażenie - masaże, wentylowane fotele, B&O, night vision.',
    highlights: [
      'Wersja Long (+13 cm)',
      'Bang & Olufsen Advanced',
      'Wentylowane fotele z masażem',
      'Night Vision Assistant',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2016' },
      { label: 'Przebieg', value: '184 000 km' },
      { label: 'Pojemność silnika', value: '4134 cm3' },
      { label: 'Moc', value: '385 KM' },
      { label: 'Rodzaj paliwa', value: 'Diesel' },
      { label: 'Skrzynia biegów', value: 'Automatyczna Tiptronic 8-bieg.' },
      { label: 'Napęd', value: 'Quattro 4x4' },
      { label: 'Liczba drzwi', value: '4' },
      { label: 'Kolor', value: 'Czarny Phantom' },
      { label: 'Kraj pochodzenia', value: 'Niemcy' },
    ],
    images: seq('audi-a8-2016', 3),
    featured: true,
    // Tymczasowo ukryte na stronie - dane pozostaja zachowane na wypadek powrotu do sprzedazy.
    hidden: true,
  },
];

/** Pojazdy widoczne publicznie w serwisie (bez ukrytych). */
export const vehicles: Vehicle[] = allVehicles.filter((v) => !v.hidden);

export const getVehicleBySlug = (slug: string): Vehicle | undefined =>
  vehicles.find((v) => v.slug === slug);

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('pl-PL').format(price) + ' PLN';

export const formatMileage = (mileage: number): string =>
  new Intl.NumberFormat('pl-PL').format(mileage) + ' km';
