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
    slug: 'opel-astra-k-2016',
    brand: 'Opel',
    model: 'Astra K',
    variant: '1.6 CDTI Limited Edition',
    year: 2016,
    price: 39000,
    currency: 'PLN',
    mileage: 149000,
    fuel: 'Diesel',
    transmission: 'Manualna',
    power: 136,
    engine: '1.6 CDTI Turbo (136 KM)',
    bodyType: 'Hatchback',
    color: 'Niebieski',
    shortDescription:
      'Opel Astra K Limited Edition - moje prywatne auto, przebieg 149 000 km, pali tylko 5,5 l/100 km.',
    description:
      'Wystawiam na sprzedaż mojego prywatnego Opla Astrę K w wersji Limited Edition – rocznik 2016, silnik 1.6 diesel z Turbo o mocy 136 KM. Jeździłem nim przez 4 lata i dosłownie nic się w nim nie zepsuło. Auto ma 149 000 km przebiegu i jest naprawdę zadbane, bez żadnych usterek.\n\nTo auto cudownie się prowadzi – zarówno na co dzień po mieście, jak i na dłuższych trasach. Byłem nim w Holandii i jeździło się nim bardzo wygodnie. Jest też bardzo oszczędne – pali tylko 5,5 litra na 100 km.\n\nCo robi największą różnicę na co dzień?\n\nŚwiatła i bezpieczeństwo:\n- Zajebiste światła LUX LED – komfort jazdy po zmroku na zupełnie innym poziomie\n- Tempomat\n\nKomfort:\n- Podgrzewane siedzenia\n- Ekran multimedialny z nawigacją – wszystko pod ręką\n- Całkiem pojemny bagażnik\n\nAuto marzenie do codziennej jazdy. W pełni sprawne, gotowe do jazdy, bez żadnego wkładu finansowego.\n\nCena do negocjacji 39 000 zł.\n\nSamochód do obejrzenia w Jasienicy Rosielnej na Podkarpaciu.',
    highlights: [
      'Wersja Limited Edition',
      'Przebieg 149 000 km',
      'Światła LUX LED',
      'Spalanie tylko 5,5 l/100 km',
      'Tempomat, podgrzewane siedzenia, nawigacja',
      'Prywatne auto - bezawaryjne przez 4 lata',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2016' },
      { label: 'Przebieg', value: '149 000 km' },
      { label: 'Silnik', value: '1.6 CDTI Turbo' },
      { label: 'Moc', value: '136 KM' },
      { label: 'Rodzaj paliwa', value: 'Diesel' },
      { label: 'Spalanie', value: '5,5 l/100 km' },
      { label: 'Skrzynia biegów', value: 'Manualna' },
      { label: 'Napęd', value: 'Na przednie koła' },
      { label: 'Liczba drzwi', value: '5' },
      { label: 'Kolor', value: 'Niebieski' },
      { label: 'Wyposażenie', value: 'Limited Edition' },
    ],
    images: seq('astra-k-2016', 15),
    featured: true,
  },
  {
    slug: 'opel-astra-k-2022',
    brand: 'Opel',
    model: 'Astra K',
    variant: '1.2 Turbo GS Line',
    year: 2021,
    price: 55000,
    currency: 'PLN',
    mileage: 54500,
    fuel: 'Benzyna',
    transmission: 'Manualna',
    power: 145,
    engine: '1.2 Turbo (145 KM)',
    bodyType: 'Hatchback',
    color: 'Czarny Metallic',
    shortDescription:
      'Opel Astra K GS Line - skórzane fotele wentylowane z masażem, kamera cofania a to tylko kilka jego zalet.',
    description:
      'Wystawiam na sprzedaż Opla – rocznik 2021, z przebiegiem zaledwie 54 500 km. Auto jest w stanie idealnym, w pełni sprawdzone i gotowe do jazdy.\n\nNie chcę się tu sztucznie rozpisywać. Zamiast tego po prostu zapraszam Cię na oględziny i jazdę próbną. Uważam, że jak wsiądziesz za kółko, przejedziesz się kawałek i poczujesz to auto, sam najlepiej ocenisz, czy to sprzęt dla Ciebie.\n\nTo nie jest podstawowa wersja. To konfiguracja stworzona dla kogoś bardziej wymagającego, kto szuka komfortu jazdy i świętego spokoju.\n\nCo robi w nim największą różnicę na co dzień?\n\nWygląd i komfort:\nW środku znajdziesz skórzane fotele, dzięki którym auto prezentuje się świetnie. W chłodniejsze dni docenisz błyskawiczne podgrzewanie foteli oraz kierownicy – wnętrze nagrzewa się momentalnie. Zamiast klasycznego radia masz duży, czytelny ekran multimedialny, na którym bez problemu odpalisz mapy i swoją muzykę. Skórzana, multifunkcyjna, podgrzewana kierownica.\n\nBezpieczeństwo i jazda w nocy:\nAuto wyposażone jest w inteligentne światła, które całkowicie zmieniają komfort jazdy po zmroku. Na trasie kapitalnie sprawdza się tempomat. Dodatkowo masz tu asystenta ruszania pod górkę oraz ogromny pakiet czujników z szerokokątną kamerą Full HD. Cofanie i manewrowanie tym autem to zero stresu – idealne rozwiązanie zarówno dla kogoś, kto chce mieć za kółkiem maksimum spokoju, jak i dla mniej doświadczonego kierowcy. Czujniki poziomu powietrza w kołach, czujnik oleju.\n\nDynamika i ekonomia:\nSamochód jest dynamiczny i zrywny, a przy tym idealny do miasta i na codzienne dojazdy, bo pali naprawdę mało.\n\nWizualnie na żywo auto jest po prostu śliczne i bardzo zadbane. Samochód jest w 100% sprawdzony i gotowy do jazdy.\n\nCena do negocjacji 55 000 zł.\n\nSamochód do obejrzenia w Jasienicy Rosielnej.',
    highlights: [
      'Pakiet GS Line',
      'Podgrzewane skórzane siedzenia z masażem',
      'System inteligentnych świateł LED Matrix',
      'Apple CarPlay / Android Auto',
      'Asystent trzymania pasa (Lane Assist)',
      'Najlepsze możliwe wyposażenie',
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
    images: seq('astra-k-2022', 15),
    featured: true,
  },
  {
    slug: 'opel-astra-l-2022',
    brand: 'Opel',
    model: 'Astra L',
    variant: '1.5 GS Line',
    year: 2022,
    price: 65000,
    currency: 'PLN',
    mileage: 104000,
    fuel: 'Diesel',
    transmission: 'Manualna',
    power: 136,
    engine: '1.5 Diesel (136 KM)',
    bodyType: 'Hatchback',
    color: 'Srebrny metalik',
    shortDescription:
      'Opel Astra L GS Line - sportowy wygląd, bardzo wygodne do jazdy, 100km to około 5,5l.',
    description:
      'Opel Astra L w pakiecie GS Line – rocznik 2022, najnowsza generacja, która łączy sportowy, drapieżny wygląd z komfortem jazdy. Małe i zgrabne.\n\nNie chcę się tu sztucznie rozpisywać. Zamiast tego po prostu zapraszam Cię na oględziny i jazdę próbną. Uważam, że jak wsiądziesz za kółko, przejedziesz się kawałek i poczujesz to auto, sam najlepiej ocenisz, czy to sprzęt dla Ciebie.\n\nCo robi w nim największą różnicę na co dzień?\n\nTechnologia i bezpieczeństwo:\n- Virtual Cockpit (cyfrowe zegary) + duży ekran dotykowy\n- Apple CarPlay / Android Auto\n- Kamera 360°, czujniki parkowania z przodu i z tyłu\n- Asystent pasa ruchu, rozpoznawanie znaków drogowych, system awaryjnego hamowania\n- Czujniki deszczu i zmierzchu, jest ich bardzo dużo\n\nKomfort:\n- Podgrzewane fotele przednie, podgrzewana kierownica, podgrzewana przednia szyba\n- Klimatyzacja automatyczna 2-strefowa\n- System bezkluczykowy (Keyless)\n- Elektrycznie składane i podgrzewane lusterka\n- Reflektory Full LED z wyraźną sygnaturą świetlną\n- Skórzana kierownica i sportowo wyprofilowane fotele\n\nAuto jest gotowe do jazdy – nie wymaga żadnego wkładu finansowego. Sprawdź sam jak cudnie prezentuje się na żywo.\n\nCena do negocjacji 65 000 zł.\n\nZapraszamy na jazdę próbną do Jasienicy Rosielnej na Podkarpaciu.',
    highlights: [
      'Pakiet GS Line',
      'Kamera cofania 360°',
      'Virtual Cockpit + Apple CarPlay / Android Auto',
      'Inteligentne światła LED',
      'Podgrzewane fotele i kierownica',
      'Po prostu piękne w środku jak i z zewnątrz',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2022' },
      { label: 'Przebieg', value: '104 000 km' },
      { label: 'Silnik', value: '1.5 Diesel' },
      { label: 'Moc', value: '136 KM' },
      { label: 'Rodzaj paliwa', value: 'Diesel' },
      { label: 'Skrzynia biegów', value: 'Manualna 6-bieg.' },
      { label: 'Napęd', value: 'Na przednie koła' },
      { label: 'Liczba drzwi', value: '5' },
      { label: 'Kolor', value: 'Srebrny metalik' },
      { label: 'Wyposażenie', value: 'GS Line' },
    ],
    images: seq('astra-l-2022', 17),
    featured: true,
  },
  {
    slug: 'opel-astra-opc-2013',
    brand: 'Opel',
    model: 'Astra J GTC OPC',
    variant: '2.0 Turbo',
    year: 2013,
    price: 49000,
    currency: 'PLN',
    mileage: 148000,
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
      { label: 'Przebieg', value: '148 000 km' },
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
    images: seq('astra-opc-2013', 13),
    featured: true,
  },
  {
    slug: 'audi-a3-2018',
    brand: 'Audi',
    model: 'A3',
    variant: '2.0 S-Line',
    year: 2014,
    price: 45000,
    currency: 'PLN',
    mileage: 140000,
    fuel: 'Diesel',
    transmission: 'Manualna',
    power: 150,
    engine: '2.0 TDI (150 KM)',
    bodyType: 'Hatchback 5d',
    color: 'Niebieski',
    shortDescription:
      'Audi A3 (2014) w pakiecie S-Line. Ekonomiczny diesel 2.0 TDI 150 KM, sprowadzone z Niemiec.',
    description:
      'Audi A3 z 2014 roku w pełnym pakiecie S-Line - na zewnątrz i wewnątrz. Sprawdzony silnik 2.0 TDI o mocy 150 KM zapewnia świetną dynamikę przy bardzo rozsądnym spalaniu. Auto serwisowane, sprowadzone z Niemiec, w kolorze niebieskim.',
    highlights: [
      'Pakiet S-Line wewnątrz i na zewnątrz',
      '2.0 TDI - 150 KM',
      'Sprowadzone z Niemiec',
      'Klimatyzacja automatyczna',
    ],
    specs: [
      { label: 'Rok produkcji', value: '2014' },
      { label: 'Przebieg', value: '140 000 km' },
      { label: 'Silnik', value: '2.0 TDI' },
      { label: 'Moc', value: '150 KM' },
      { label: 'Rodzaj paliwa', value: 'Diesel' },
      { label: 'Skrzynia biegów', value: 'Manualna 6-bieg.' },
      { label: 'Napęd', value: 'Na przednie koła' },
      { label: 'Liczba drzwi', value: '5' },
      { label: 'Kolor', value: 'Niebieski' },
      { label: 'Wyposażenie', value: 'S-Line' },
      { label: 'Kraj pochodzenia', value: 'Niemcy' },
    ],
    images: seq('audi-a3-2018', 1),
    // Tymczasowo ukryte na stronie - dane pozostaja zachowane na wypadek powrotu do sprzedazy.
    hidden: true,
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
