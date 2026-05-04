export const company = {
  name: 'Auta Na Sprzedaz',
  domain: 'autanasprzedaz.com',
  phone: '+48 782 035 878',
  email: 'gracjan.preisner@gmail.com',
  address: {
    street: 'Jasienica Rosielna 292',
    city: '36-220 Jasienica Rosielna',
    region: 'podkarpackie',
    country: 'Polska',
  },
  // Geographic coords (Jasienica Rosielna, Podkarpacie)
  geo: {
    latitude: 49.7589,
    longitude: 21.9486,
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
