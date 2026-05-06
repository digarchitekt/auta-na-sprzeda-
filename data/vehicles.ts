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
    variant: '1.2 Turbo',
    year: 2021,
    price: 39999,
    currency: 'PLN',
    mileage: 54500,
    fuel: 'Benzyna',
    transmission: 'Manualna',
    power: 145,
    engine: '1.2 Turbo (145 KM)',
    bodyType: 'Hatchback',
    color: 'Czarny Metallic',
    shortDescription:
      'Opel Astra K (2021) - skóra, fotel AGR, LED. Bezwypadkowy, sprowadzony z Niemiec, niski przebieg.',
    description:
      'Na sprzedaż wyjątkowo zadbany Opel Astra K z 2021 roku. To samochód dla kogoś, kto szuka pewnego, nowoczesnego auta na długie lata, bez widma ciągłych wizyt u mechanika. Egzemplarz sprowadzony z Niemiec, w 100% bezwypadkowy, z bardzo niskim, autentycznym przebiegiem.\n\nSilnik 1.2 Turbo o mocy 145 KM to optymalny kompromis - zapewnia świetną dynamikę przy wyprzedzaniu, a jednocześnie spala na tyle mało, że codzienne dojazdy nie bolą portfela. Auto jest zwarte, sztywne i prowadzi się jakby wczoraj wyjechało z salonu.\n\nWyposażenie, które robi różnicę:\nWiększość Astr na rynku to ubogie wersje flotowe. Ten egzemplarz to zupełnie inna półka:\n\n- Komfort klasy Premium: pełna skórzana tapicerka oraz zaawansowany fotel kierowcy AGR (8 kierunków regulacji, wsparcie lędźwiowe). Nawet po 1000 km trasy wysiądziesz z niego bez bólu pleców.\n- Reflektory LED: mocne, białe światło, które drastycznie poprawia bezpieczeństwo i komfort jazdy po zmroku.\n- Zimowy komfort: dodatkowe elektryczne ogrzewanie nawiewu (ciepło w kabinie natychmiast po starcie) oraz 2-strefowa automatyczna klimatyzacja.\n- Technologia na pokładzie: 7-calowy ekran dotykowy z Apple CarPlay / Android Auto. Twoje mapy, Spotify i asystent głosowy zawsze pod ręką.\n- Systemy bezpieczeństwa: auto samo czyta pasy ruchu (Lane Assist), ostrzega przed kolizją i automatycznie hamuje w razie zagrożenia. Posiada też czujniki parkowania z tyłu.\n- Design: czarny lakier metallic, 17-calowe felgi aluminiowe, przyciemniane szyby i czarna podsufitka nadają mu agresywnego, bardzo nowoczesnego wyglądu.\n\nSamochód nie wymaga absolutnie żadnego wkładu finansowego, jest czysty i gotowy do drogi. To pewna inwestycja w spokój i bezpieczeństwo Twoje oraz Twojej rodziny na najbliższe lata.',
    highlights: [
      'Bezwypadkowy, sprowadzony z Niemiec',
      'Skórzana tapicerka + fotel AGR',
      'Reflektory LED',
      'Apple CarPlay / Android Auto',
      'Lane Assist + automatyczne hamowanie',
      '17" felgi aluminiowe',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2021' },
      { label: 'Przebieg', value: '54 500 km' },
      { label: 'Silnik', value: '1.2 Turbo' },
      { label: 'Moc', value: '145 KM' },
      { label: 'Rodzaj paliwa', value: 'Benzyna' },
      { label: 'Skrzynia biegów', value: 'Manualna' },
      { label: 'Napęd', value: 'Na przednie koła' },
      { label: 'Liczba drzwi', value: '5' },
      { label: 'Kolor', value: 'Czarny Metallic' },
      { label: 'Stan', value: 'Bezwypadkowy' },
      { label: 'Kraj pochodzenia', value: 'Niemcy' },
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
    model: 'Astra J GTC OPC',
    variant: '2.0 Turbo',
    year: 2013,
    price: 39999,
    currency: 'PLN',
    mileage: 168000,
    fuel: 'Benzyna',
    transmission: 'Manualna',
    power: 280,
    engine: '2.0 Turbo (280 KM / 400 Nm)',
    bodyType: 'Coupe 3d',
    color: 'Czarny',
    shortDescription:
      'Opel Astra J GTC OPC z 2013 roku. 2.0 Turbo 280 KM / 400 Nm, sprowadzony z Niemiec, bezwypadkowy.',
    description:
      'Sprzedam Opla Astrę J w wersji GTC OPC z 2013 roku. Samochód został sprowadzony z Niemiec i jest utrzymany w stanie bezwypadkowym.\n\nDane techniczne:\n- Silnik: 2.0 Turbo (280 KM / 400 Nm)\n- Rok produkcji: 2013\n- Kolor: Czarny\n- Status: auto bezwypadkowe, sprowadzone\n\nWyposażenie:\n- Oryginalny pakiet zewnętrzny i wewnętrzny OPC\n- Fotele kubełkowe Performance\n- Adaptacyjne zawieszenie FlexRide\n- Układ hamulcowy Brembo\n- Mechanizm różnicowy o ograniczonym poślizgu (LSD)\n\nSamochód do obejrzenia w Jasienicy Rosielnej na Podkarpaciu.',
    highlights: [
      '2.0 Turbo - 280 KM / 400 Nm',
      'Fotele kubełkowe Performance',
      'Adaptacyjne zawieszenie FlexRide',
      'Hamulce Brembo + LSD',
      'Bezwypadkowy, sprowadzony z Niemiec',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2013' },
      { label: 'Przebieg', value: '168 000 km' },
      { label: 'Silnik', value: '2.0 Turbo' },
      { label: 'Moc', value: '280 KM' },
      { label: 'Moment obrotowy', value: '400 Nm' },
      { label: 'Rodzaj paliwa', value: 'Benzyna' },
      { label: 'Skrzynia biegów', value: 'Manualna 6-bieg.' },
      { label: 'Napęd', value: 'Na przednie koła (LSD)' },
      { label: 'Liczba drzwi', value: '3' },
      { label: 'Kolor', value: 'Czarny' },
      { label: 'Stan', value: 'Bezwypadkowy' },
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
