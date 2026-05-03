export const company = {
  name: 'Auta Na Sprzedaz',
  domain: 'autanasprzedaz.com',
  phone: '+48 600 000 000',
  email: 'biuro@autanasprzedaz.com',
  address: {
    street: 'ul. Przykladowa 1',
    city: '36-200 Brzozow',
    region: 'podkarpackie',
    country: 'Polska',
  },
  // Geographic coords (Brzozow, Podkarpacie) - update with actual location
  geo: {
    latitude: 49.7018,
    longitude: 22.0177,
  },
  // Cities/areas we deliver to (used in copy + LocalBusiness areaServed schema)
  servicedCities: [
    'Brzozow',
    'Krosno',
    'Rzeszow',
    'Sanok',
    'Jaslo',
    'Przemysl',
    'Tarnow',
    'Krakow',
    'Lublin',
    'Mielec',
    'Stalowa Wola',
    'Debica',
    'Nowy Sacz',
  ],
  hours: [
    { day: 'Pon - Pt', value: '09:00 - 18:00' },
    { day: 'Sobota', value: '10:00 - 14:00' },
    { day: 'Niedziela', value: 'Po umowieniu' },
  ],
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
  },
};
