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
};

export const vehicles: Vehicle[] = [
  {
    slug: 'opel-astra-k-2017',
    brand: 'Opel',
    model: 'Astra K',
    variant: '1.4 Turbo Elite',
    year: 2017,
    price: 39900,
    currency: 'PLN',
    mileage: 142000,
    fuel: 'Benzyna',
    transmission: 'Manualna',
    power: 150,
    engine: '1.4 Turbo',
    bodyType: 'Hatchback',
    color: 'Czarny metalik',
    shortDescription:
      'Zadbany egzemplarz Astry K w bogatej wersji wyposazenia. Pierwszy wlasciciel w Polsce.',
    description:
      '[OPIS PLACEHOLDER] Pelny opis pojazdu zostanie dodany w panelu administracyjnym. Auto serwisowane w ASO, komplet kluczy, bezwypadkowe, faktura VAT 23%.',
    highlights: [
      'Pierwszy wlasciciel w PL',
      'Bezwypadkowy',
      'Pelna historia serwisowa',
      'Komplet kol zimowych',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2017' },
      { label: 'Przebieg', value: '142 000 km' },
      { label: 'Pojemnosc silnika', value: '1364 cm3' },
      { label: 'Moc', value: '150 KM' },
      { label: 'Rodzaj paliwa', value: 'Benzyna' },
      { label: 'Skrzynia biegow', value: 'Manualna 6-bieg.' },
      { label: 'Naped', value: 'Na przednie kola' },
      { label: 'Liczba drzwi', value: '5' },
      { label: 'Kolor', value: 'Czarny metalik' },
      { label: 'Kraj pochodzenia', value: 'Polska' },
    ],
    images: [
      '/images/vehicles/astra-k-2017/01.jpg',
      '/images/vehicles/astra-k-2017/02.jpg',
      '/images/vehicles/astra-k-2017/03.jpg',
      '/images/vehicles/astra-k-2017/04.jpg',
    ],
    featured: true,
  },
  {
    slug: 'opel-astra-k-2022',
    brand: 'Opel',
    model: 'Astra K',
    variant: '1.5 CDTI GS Line',
    year: 2022,
    price: 69900,
    currency: 'PLN',
    mileage: 78000,
    fuel: 'Diesel',
    transmission: 'Automatyczna',
    power: 122,
    engine: '1.5 CDTI',
    bodyType: 'Hatchback',
    color: 'Bialy perlowy',
    shortDescription:
      'Najnowsza generacja Astry w sportowej linii GS. Ekonomiczny diesel, automat 9-bieg.',
    description:
      '[OPIS PLACEHOLDER] Auto z gwarancja, salon Polska, faktura VAT marza. Pelne wyposazenie pakietu GS Line.',
    highlights: [
      'Salon Polska',
      'Gwarancja producenta',
      'Adaptive Cruise Control',
      'Matrix LED',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2022' },
      { label: 'Przebieg', value: '78 000 km' },
      { label: 'Pojemnosc silnika', value: '1499 cm3' },
      { label: 'Moc', value: '122 KM' },
      { label: 'Rodzaj paliwa', value: 'Diesel' },
      { label: 'Skrzynia biegow', value: 'Automatyczna 9-bieg.' },
      { label: 'Naped', value: 'Na przednie kola' },
      { label: 'Liczba drzwi', value: '5' },
      { label: 'Kolor', value: 'Bialy perlowy' },
      { label: 'Kraj pochodzenia', value: 'Polska' },
    ],
    images: [
      '/images/vehicles/astra-k-2022/01.jpg',
      '/images/vehicles/astra-k-2022/02.jpg',
      '/images/vehicles/astra-k-2022/03.jpg',
      '/images/vehicles/astra-k-2022/04.jpg',
    ],
    featured: true,
  },
  {
    slug: 'opel-astra-opc-2013',
    brand: 'Opel',
    model: 'Astra OPC',
    variant: '2.0 Turbo',
    year: 2013,
    price: 54900,
    currency: 'PLN',
    mileage: 168000,
    fuel: 'Benzyna',
    transmission: 'Manualna',
    power: 280,
    engine: '2.0 Turbo',
    bodyType: 'Coupe 3d',
    color: 'Niebieski OPC',
    shortDescription:
      'Kultowy hot-hatch Opel Astra OPC. 280 KM, dyferencjal Drexler, fotele Recaro.',
    description:
      '[OPIS PLACEHOLDER] Egzemplarz dla kolekcjonera, stan bardzo dobry. Pelna historia, bez torowych przebiegow.',
    highlights: [
      '280 KM z fabryki',
      'Fotele Recaro Performance',
      'Dyferencjal Drexler LSD',
      'Pakiet Performance',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2013' },
      { label: 'Przebieg', value: '168 000 km' },
      { label: 'Pojemnosc silnika', value: '1998 cm3' },
      { label: 'Moc', value: '280 KM' },
      { label: 'Rodzaj paliwa', value: 'Benzyna' },
      { label: 'Skrzynia biegow', value: 'Manualna 6-bieg.' },
      { label: 'Naped', value: 'Na przednie kola' },
      { label: 'Liczba drzwi', value: '3' },
      { label: 'Kolor', value: 'Niebieski OPC' },
      { label: 'Kraj pochodzenia', value: 'Niemcy' },
    ],
    images: [
      '/images/vehicles/astra-opc-2013/01.jpg',
      '/images/vehicles/astra-opc-2013/02.jpg',
      '/images/vehicles/astra-opc-2013/03.jpg',
      '/images/vehicles/astra-opc-2013/04.jpg',
    ],
    featured: true,
  },
  {
    slug: 'opel-astra-h-2022',
    brand: 'Opel',
    model: 'Astra H',
    variant: '1.6 Edition',
    year: 2022,
    price: 18900,
    currency: 'PLN',
    mileage: 198000,
    fuel: 'Benzyna',
    transmission: 'Manualna',
    power: 115,
    engine: '1.6 16V',
    bodyType: 'Sedan',
    color: 'Srebrny',
    shortDescription:
      'Idealne auto miejskie z niskim kosztem utrzymania. Sprawdzony silnik 1.6.',
    description:
      '[OPIS PLACEHOLDER] Auto po wymianie wszystkich plynow eksploatacyjnych, gotowe do jazdy. Faktura VAT marza.',
    highlights: [
      'Niskie koszty utrzymania',
      'Klimatyzacja sprawna',
      'Po przegladzie technicznym',
      'Aktualne OC',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2022' },
      { label: 'Przebieg', value: '198 000 km' },
      { label: 'Pojemnosc silnika', value: '1598 cm3' },
      { label: 'Moc', value: '115 KM' },
      { label: 'Rodzaj paliwa', value: 'Benzyna' },
      { label: 'Skrzynia biegow', value: 'Manualna 5-bieg.' },
      { label: 'Naped', value: 'Na przednie kola' },
      { label: 'Liczba drzwi', value: '4' },
      { label: 'Kolor', value: 'Srebrny' },
      { label: 'Kraj pochodzenia', value: 'Polska' },
    ],
    images: [
      '/images/vehicles/astra-h-2022/01.jpg',
      '/images/vehicles/astra-h-2022/02.jpg',
      '/images/vehicles/astra-h-2022/03.jpg',
      '/images/vehicles/astra-h-2022/04.jpg',
      '/images/vehicles/astra-h-2022/05.jpg',
      '/images/vehicles/astra-h-2022/06.jpg',
      '/images/vehicles/astra-h-2022/07.jpg',
      '/images/vehicles/astra-h-2022/08.jpg',
      '/images/vehicles/astra-h-2022/09.jpg',
      '/images/vehicles/astra-h-2022/10.jpg',
      '/images/vehicles/astra-h-2022/11.jpg',
      '/images/vehicles/astra-h-2022/12.jpg',
      '/images/vehicles/astra-h-2022/13.jpg',
    ],
  },
  {
    slug: 'audi-a8-2016',
    brand: 'Audi',
    model: 'A8',
    variant: '4.2 TDI Quattro Long',
    year: 2016,
    price: 129900,
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
      '[OPIS PLACEHOLDER] Auto w stanie kolekcjonerskim. Pelne wyposazenie - masaze, wentylowane fotele, B&O, night vision.',
    highlights: [
      'Wersja Long (+13 cm)',
      'Bang & Olufsen Advanced',
      'Wentylowane fotele z masazem',
      'Night Vision Assistant',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2016' },
      { label: 'Przebieg', value: '184 000 km' },
      { label: 'Pojemnosc silnika', value: '4134 cm3' },
      { label: 'Moc', value: '385 KM' },
      { label: 'Rodzaj paliwa', value: 'Diesel' },
      { label: 'Skrzynia biegow', value: 'Automatyczna Tiptronic 8-bieg.' },
      { label: 'Naped', value: 'Quattro 4x4' },
      { label: 'Liczba drzwi', value: '4' },
      { label: 'Kolor', value: 'Czarny Phantom' },
      { label: 'Kraj pochodzenia', value: 'Niemcy' },
    ],
    images: [
      '/images/vehicles/audi-a8-2016/01.jpg',
      '/images/vehicles/audi-a8-2016/02.jpg',
      '/images/vehicles/audi-a8-2016/03.jpg',
      '/images/vehicles/audi-a8-2016/04.jpg',
    ],
    featured: true,
  },
];

export const getVehicleBySlug = (slug: string): Vehicle | undefined =>
  vehicles.find((v) => v.slug === slug);

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('pl-PL').format(price) + ' PLN';

export const formatMileage = (mileage: number): string =>
  new Intl.NumberFormat('pl-PL').format(mileage) + ' km';
