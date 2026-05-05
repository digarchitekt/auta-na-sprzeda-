// Adds Polish diacritics to user-facing text strings.
// Uses regex word boundaries so it never touches URL slugs, identifiers, or substrings.
// Run from project root: node scripts/add-diacritics.mjs

import { promises as fs } from 'node:fs';
import path from 'node:path';

const FILES = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/auta/page.tsx',
  'app/auta/[slug]/page.tsx',
  'app/kontakt/page.tsx',
  'app/sprzedaj-auto/page.tsx',
  'app/polityka-prywatnosci/page.tsx',
  'app/polityka-cookies/page.tsx',
  'app/regulamin/page.tsx',
  'app/api/contact/route.ts',
  'app/api/sell/route.ts',
  'app/api/vehicle-inquiry/route.ts',
  'components/Hero.tsx',
  'components/Footer.tsx',
  'components/Header.tsx',
  'components/MobileNav.tsx',
  'components/VehicleCard.tsx',
  'components/ContactForm.tsx',
  'components/SellForm.tsx',
  'components/VehicleInquiryForm.tsx',
  'data/vehicles.ts',
  'data/company.ts',
];

// Each entry: [from, to]. Order matters when one string is a prefix of another — longer first.
const REPLACEMENTS = [
  // Cities (Nominative form only — declined forms like Brzozowie keep no diacritic by Polish rules)
  ['Brzozow', 'Brzozów'],
  ['Krakow', 'Kraków'],
  ['Rzeszow', 'Rzeszów'],
  ['Tarnow', 'Tarnów'],
  ['Przemysl', 'Przemyśl'],
  ['Jaslo', 'Jasło'],
  ['Debica', 'Dębica'],
  ['Sacz', 'Sącz'],

  // Regions
  ['malopolskie', 'małopolskie'],
  ['Malopolskie', 'Małopolskie'],
  ['malopolska', 'małopolska'],
  ['Malopolska', 'Małopolska'],
  ['Malopolski', 'Małopolski'],
  ['malopolski', 'małopolski'],
  ['swietokrzyskie', 'świętokrzyskie'],
  ['Swietokrzyskie', 'Świętokrzyskie'],
  ['wojewodztwo', 'województwo'],
  ['Wojewodztwo', 'Województwo'],
  ['wojewodztwa', 'województwa'],
  ['wojewodztw', 'województw'],

  // Common words — longest first so prefixes don't clobber suffixes
  ['uzywanego', 'używanego'],
  ['uzywanych', 'używanych'],
  ['uzywanym', 'używanym'],
  ['uzywanej', 'używanej'],
  ['uzywany', 'używany'],
  ['uzywana', 'używana'],
  ['uzywane', 'używane'],
  ['Uzywane', 'Używane'],
  ['UZYWANE', 'UŻYWANE'],

  ['Sprzedazy', 'Sprzedaży'],
  ['sprzedazy', 'sprzedaży'],
  ['SPRZEDAZ', 'SPRZEDAŻ'],
  ['Sprzedaz', 'Sprzedaż'],
  ['sprzedaz', 'sprzedaż'],

  ['doswiadczenia', 'doświadczenia'],
  ['doswiadczeniem', 'doświadczeniem'],
  ['doswiadczenie', 'doświadczenie'],
  ['Doswiadczenie', 'Doświadczenie'],

  ['wlascicielu', 'właścicielu'],
  ['wlasciciela', 'właściciela'],
  ['Wlasciciel', 'Właściciel'],
  ['wlasciciel', 'właściciel'],
  ['wlasnosc', 'własność'],
  ['wlasnej', 'własnej'],
  ['wlasnym', 'własnym'],
  ['wlasna', 'własna'],
  ['wlasne', 'własne'],
  ['Wlasna', 'Własna'],

  ['Wczesniej', 'Wcześniej'],
  ['wczesniej', 'wcześniej'],

  ['klientow', 'klientów'],
  ['samochodow', 'samochodów'],
  ['samochod', 'samochód'],

  ['Polske', 'Polskę'],

  ['poludniowej', 'południowej'],
  ['poludniowa', 'południowa'],

  ['calego', 'całego'],
  ['calej', 'całej'],
  ['Calego', 'Całego'],
  ['Calej', 'Całej'],
  ['cala', 'cała'],
  ['cale', 'całe'],
  ['caly', 'cały'],
  ['Cala', 'Cała'],
  ['Cale', 'Całe'],
  ['Caly', 'Cały'],

  ['jezeli', 'jeżeli'],
  ['Jezeli', 'Jeżeli'],

  ['mozliwie', 'możliwie'],
  ['mozliwosc', 'możliwość'],
  ['mozliwa', 'możliwa'],
  ['Mozliwe', 'Możliwe'],
  ['umozliwiajacy', 'umożliwiający'],

  ['mozemy', 'możemy'],
  ['mozesz', 'możesz'],
  ['Mozna', 'Można'],
  ['mozna', 'można'],
  ['moze', 'może'],
  ['Moze', 'Może'],
  ['moga', 'mogą'],
  ['Moga', 'Mogą'],

  ['Zgloszenie', 'Zgłoszenie'],
  ['zgloszenie', 'zgłoszenie'],
  ['zglaszac', 'zgłaszać'],
  ['Zglos', 'Zgłoś'],
  ['zglos', 'zgłoś'],

  ['Uslugi', 'Usługi'],
  ['uslugi', 'usługi'],
  ['Usluga', 'Usługa'],
  ['usluga', 'usługa'],
  ['usluge', 'usługę'],
  ['uslug', 'usług'],

  ['Imie', 'Imię'],
  ['imie', 'imię'],

  ['Tresc', 'Treść'],
  ['tresc', 'treść'],
  ['tresci', 'treści'],

  ['panstwowych', 'państwowych'],
  ['panstwowy', 'państwowy'],
  ['panstwa', 'państwa'],
  ['panstwo', 'państwo'],
  ['panstw', 'państw'],

  ['niespodzianek', 'niespodzianek'], // no change

  ['Posrednik', 'Pośrednik'],
  ['posrednik', 'pośrednik'],
  ['posrednikami', 'pośrednikami'],
  ['posrednikow', 'pośredników'],

  ['nizsza', 'niższa'],
  ['nizszy', 'niższy'],
  ['Nizsza', 'Niższa'],

  ['Zaden', 'Żaden'],
  ['zaden', 'żaden'],
  ['zadnych', 'żadnych'],
  ['zadne', 'żadne'],
  ['zadnej', 'żadnej'],
  ['zadnego', 'żadnego'],
  ['zadna', 'żadna'],

  ['Kazda', 'Każda'],
  ['Kazde', 'Każde'],
  ['Kazdy', 'Każdy'],
  ['kazda', 'każda'],
  ['kazde', 'każde'],
  ['kazdy', 'każdy'],
  ['kazdej', 'każdej'],
  ['kazdym', 'każdym'],
  ['kazdego', 'każdego'],

  ['Ktorego', 'Którego'],
  ['Ktorej', 'Której'],
  ['Ktora', 'Która'],
  ['Ktore', 'Które'],
  ['Ktory', 'Który'],
  ['ktorego', 'którego'],
  ['ktorej', 'której'],
  ['ktorych', 'których'],
  ['ktora', 'która'],
  ['ktore', 'które'],
  ['ktory', 'który'],

  ['Roznych', 'Różnych'],
  ['Rozny', 'Różny'],
  ['Rozna', 'Różna'],
  ['Rozne', 'Różne'],
  ['Rozno', 'Różno'],
  ['rozne', 'różne'],
  ['roznych', 'różnych'],
  ['rozny', 'różny'],
  ['rozna', 'różna'],

  ['Oferte', 'Ofertę'],
  ['oferte', 'ofertę'],
  // NOTE: "oferta" intentionally NOT converted — collides with "oferta" (nominative)
  //       and with anchor IDs/URLs like #oferta and id="oferta".

  ['Obslugujemy', 'Obsługujemy'],
  ['obslugujemy', 'obsługujemy'],
  ['obsluga', 'obsługa'],
  ['Obsluga', 'Obsługa'],
  ['obsluge', 'obsługę'],
  ['obslugi', 'obsługi'],

  ['Pelne', 'Pełne'],
  ['Pelna', 'Pełna'],
  ['Pelny', 'Pełny'],
  ['pelne', 'pełne'],
  ['pelna', 'pełna'],
  ['pelny', 'pełny'],
  ['pelnia', 'pełnia'],
  ['pelnym', 'pełnym'],
  ['pelnej', 'pełnej'],
  ['pelnego', 'pełnego'],

  ['szczegolnosci', 'szczególności'],
  ['szczegolnie', 'szczególnie'],
  ['szczegoly', 'szczegóły'],

  ['Dojezdzamy', 'Dojeżdżamy'],
  ['dojezdzamy', 'dojeżdżamy'],

  ['osobiscie', 'osobiście'],
  ['Osobiscie', 'Osobiście'],

  ['Glownie', 'Głównie'],
  ['glownie', 'głównie'],
  ['glowny', 'główny'],
  ['glowna', 'główna'],
  ['glowne', 'główne'],

  ['skorzane', 'skórzane'],
  ['skorzana', 'skórzana'],
  ['skorzanej', 'skórzanej'],

  ['plynow', 'płynów'],
  ['plyn', 'płyn'],

  ['Niz', 'Niż'],
  ['niz', 'niż'],

  // Single-form short words — \b prevents substring matches
  // NOTE: "ze" is intentionally NOT converted — it's a Polish preposition
  // ("z" used before sibilants, e.g. "ze strony"). Conversion is context-dependent.
  ['sa', 'są'],
  ['Sa', 'Są'],

  ['umozliwia', 'umożliwia'],
  ['zwlaszcza', 'zwłaszcza'],
  ['rowne', 'równe'],
  ['rownych', 'równych'],

  // Specific phrases
  ['salon Polska', 'salon Polska'], // no change
  ['Polske', 'Polskę'],

  // Adjective declensions
  ['Bialy', 'Biały'],
  ['bialy', 'biały'],
  ['biala', 'biała'],
  ['biale', 'białe'],
  ['Bialym', 'Białym'],

  ['perlowy', 'perłowy'],

  // Vehicle-specific
  ['naped', 'napęd'],
  ['Naped', 'Napęd'],

  ['silnika', 'silnika'], // no change
  ['silnik', 'silnik'], // no change

  ['Pelne wyposazenie', 'Pełne wyposażenie'],
  ['wyposazenie', 'wyposażenie'],
  ['wyposazenia', 'wyposażenia'],
  ['Wyposazenie', 'Wyposażenie'],

  ['gwarancja', 'gwarancja'], // no change
  ['gwarancj', 'gwarancj'], // no change in stem

  ['miesiace', 'miesiące'],
  ['miesiacach', 'miesiącach'],
  ['miesiecy', 'miesięcy'],
  ['miesiac', 'miesiąc'],

  ['kierunek', 'kierunek'],
  ['krotkim', 'krótkim'],
  ['krotko', 'krótko'],

  // additional
  ['nieuzywane', 'nieużywane'],
  ['uzywanymi', 'używanymi'],

  ['Sily', 'Siły'],
  ['silami', 'siłami'],

  ['poznac', 'poznać'],
  ['nieposiadac', 'nieposiadać'],

  ['polerujemy', 'polerujemy'], // no change
  ['polerowanie', 'polerowanie'], // no change

  ['niewlasciwe', 'niewłaściwe'],
  ['wlasciwych', 'właściwych'],
  ['wlasciwy', 'właściwy'],
  ['wlasciwa', 'właściwa'],

  ['zaawansowany', 'zaawansowany'], // no change

  ['samodzielnie', 'samodzielnie'], // no change

  // Action verbs we want
  ['kierownice', 'kierownicę'],
  ['pulapke', 'pułapkę'],

  ['mowi', 'mówi'],
  ['mowie', 'mówię'],
  ['mowimy', 'mówimy'],

  ['rzeczywiscie', 'rzeczywiście'],

  ['plac', 'płać'],
  ['placic', 'płacić'],
  ['placi', 'płaci'],

  ['poznaj', 'poznaj'], // no change
  ['poznasz', 'poznasz'], // no change

  // Remaining
  ['zgodzie', 'zgodzie'], // no change
  ['zgodnie', 'zgodnie'], // no change
  ['zaczyna', 'zaczyna'], // no change
  ['zachowac', 'zachować'],
  ['zachowanie', 'zachowanie'], // no change

  ['Jasienica', 'Jasienica'], // no change in name (no diacritic in Jasienica Rosielna)
  ['Rosielna', 'Rosielna'],

  // Round 2 — extended vocab
  ['dzialalnosc', 'działalność'],
  ['dzialalnosci', 'działalności'],
  ['dzialaniem', 'działaniem'],
  ['dzialan', 'działań'],
  ['dziala', 'działa'],
  ['dzialaja', 'działają'],
  ['dzialania', 'działania'],
  ['dzialalnym', 'działalnym'],

  ['dostepnego', 'dostępnego'],
  ['dostepnej', 'dostępnej'],
  ['dostepnym', 'dostępnym'],
  ['dostepnym', 'dostępnym'],
  ['dostepny', 'dostępny'],
  ['dostepna', 'dostępna'],
  ['dostepne', 'dostępne'],
  ['dostepnych', 'dostępnych'],
  ['dostepnosci', 'dostępności'],
  ['dostepu', 'dostępu'],
  ['dostepem', 'dostępem'],
  ['dostepne', 'dostępne'],
  ['Dostepne', 'Dostępne'],
  ['dostepne od reki', 'dostępne od ręki'],

  ['nastepujace', 'następujące'],
  ['nastepujacych', 'następujących'],
  ['nastepujaca', 'następująca'],
  ['nastepuje', 'następuje'],
  ['nastepuja', 'następują'],

  ['pojazdow', 'pojazdów'],
  ['pojazd', 'pojazd'],
  ['pojazdu', 'pojazdu'],

  ['prawidlowego', 'prawidłowego'],
  ['prawidlowo', 'prawidłowo'],
  ['prawidlowa', 'prawidłowa'],
  ['prawidlowe', 'prawidłowe'],
  ['prawidlowy', 'prawidłowy'],
  ['prawidlowosci', 'prawidłowości'],
  ['prawidlowych', 'prawidłowych'],

  ['urzadzenie', 'urządzenie'],
  ['urzadzenia', 'urządzenia'],
  ['urzadzeniu', 'urządzeniu'],

  ['przegladarka', 'przeglądarka'],
  ['przegladarce', 'przeglądarce'],
  ['przegladane', 'przeglądane'],
  ['przegladanie', 'przeglądanie'],

  ['swiadczenia', 'świadczenia'],
  ['swiadczeniu', 'świadczeniu'],
  ['swiadczy', 'świadczy'],

  ['marza', 'marża'],
  ['marzy', 'marży'],

  ['pochodza', 'pochodzą'],
  ['pochodzace', 'pochodzące'],

  ['zrodel', 'źródeł'],
  ['zrodlo', 'źródło'],
  ['zrodel', 'źródeł'],

  ['niemniej', 'niemniej'],

  ['zawierac', 'zawierać'],
  ['zawiera', 'zawiera'],

  ['zaklocenie', 'zakłócenie'],
  ['zaklocania', 'zakłócania'],

  ['proby', 'próby'],

  ['zasobow', 'zasobów'],

  ['bezplatne', 'bezpłatne'],
  ['bezplatny', 'bezpłatny'],
  ['bezplatnie', 'bezpłatnie'],

  ['bylo', 'było'],
  ['byla', 'była'],
  ['byly', 'były'],

  ['czyscimy', 'czyścimy'],
  ['czyscic', 'czyścić'],

  ['wybrac', 'wybrać'],
  ['wybierac', 'wybierać'],

  ['jakosc', 'jakość'],
  ['jakosci', 'jakości'],

  ['dokladnie', 'dokładnie'],
  ['dokladnej', 'dokładnej'],

  ['wyglada', 'wygląda'],
  ['wygladaja', 'wyglądają'],

  ['sprzedaza', 'sprzedażą'],

  ['wczesniejszego', 'wcześniejszego'],
  ['wczesniejsza', 'wcześniejsza'],

  ['wszelkie', 'wszelkie'],

  ['konkretnego', 'konkretnego'],

  ['ustawy', 'ustawy'],

  ['wystapienia', 'wystąpienia'],

  ['zwiazane', 'związane'],
  ['zwiazany', 'związany'],
  ['zwiazana', 'związana'],

  ['skontaktuj', 'skontaktuj'],
  ['skontaktowac', 'skontaktować'],

  ['inspekcje', 'inspekcję'],

  ['dyferencjal', 'dyferencjał'],

  ['bezposrednio', 'bezpośrednio'],

  ['niedostepne', 'niedostępne'],

  ['niestety', 'niestety'],

  ['mialeś', 'miałeś'],
  ['miales', 'miałeś'],

  ['dotyczace', 'dotyczące'],
  ['dotycza', 'dotyczą'],
  ['dotyczacych', 'dotyczących'],

  ['okreslac', 'określać'],
  ['okreslane', 'określane'],
  ['okresla', 'określa'],
  ['okreslaja', 'określają'],
  ['okreslone', 'określone'],
  ['okreslany', 'określany'],

  ['niewlasciwe', 'niewłaściwe'],

  ['serwisowane', 'serwisowane'],

  ['pierwszy', 'pierwszy'],
  ['pierwsza', 'pierwsza'],

  ['niski', 'niski'],
  ['niska', 'niska'],

  ['Bezwypadkowy', 'Bezwypadkowy'],
  ['bezwypadkowy', 'bezwypadkowy'],

  ['kolekcjonera', 'kolekcjonera'],

  ['stan', 'stan'],

  ['historia', 'historia'],
  ['historii', 'historii'],
  ['historie', 'historię'],

  ['wewnatrz', 'wewnątrz'],
  ['zewnatrz', 'zewnątrz'],

  ['zewnetrznych', 'zewnętrznych'],
  ['zewnetrzny', 'zewnętrzny'],

  ['kola', 'koła'],
  ['Kolo', 'Koło'],

  ['Pojemnosc', 'Pojemność'],
  ['pojemnosc', 'pojemność'],

  ['biegow', 'biegów'],
  ['Biegow', 'Biegów'],

  ['masaze', 'masaże'],
  ['masazem', 'masażem'],
  ['masaz', 'masaż'],

  ['Wczesniej', 'Wcześniej'],

  ['mozliwosc', 'możliwość'],
  ['mozliwosci', 'możliwości'],

  ['umozliwiajacy', 'umożliwiający'],
  ['umozliwia', 'umożliwia'],
  ['umozliwic', 'umożliwić'],
  ['uniemozliwic', 'uniemożliwić'],

  ['rozumieniu', 'rozumieniu'],

  ['Rozporzadzenia', 'Rozporządzenia'],
  ['rozporzadzenie', 'rozporządzenie'],

  ['prowadzaca', 'prowadząca'],
  ['prowadzacy', 'prowadzący'],

  ['niezbedne', 'niezbędne'],
  ['niezbedny', 'niezbędny'],
  ['niezbedna', 'niezbędna'],

  ['celow', 'celów'],

  ['zostaly', 'zostały'],
  ['zostala', 'została'],
  ['zostal', 'został'],
  ['zostac', 'zostać'],

  ['wynikajacy', 'wynikający'],
  ['wynika', 'wynika'],

  ['przepisow', 'przepisów'],

  ['roszczen', 'roszczeń'],

  ['doszlo', 'doszło'],

  ['udostepniac', 'udostępniać'],
  ['udostepnia', 'udostępnia'],

  ['rachunkowemu', 'rachunkowemu'],

  ['obowiazku', 'obowiązku'],
  ['obowiazek', 'obowiązek'],
  ['obowiazki', 'obowiązki'],

  ['Posiadasz', 'Posiadasz'],

  ['urzedu', 'urzędu'],
  ['Urzedu', 'Urzędu'],

  ['skargi', 'skargi'],

  ['powyzszych', 'powyższych'],
  ['powyzsza', 'powyższa'],

  ['Dobrowolnosc', 'Dobrowolność'],
  ['dobrowolnosc', 'dobrowolność'],

  ['Profilowanie', 'Profilowanie'],

  ['zautomatyzowanego', 'zautomatyzowanego'],

  ['uzywa', 'używa'],
  ['uzywaja', 'używają'],
  ['uzywac', 'używać'],
  ['uzywania', 'używania'],

  ['poczatku', 'początku'],
  ['poczatek', 'początek'],

  ['ciasteczka', 'ciasteczka'],

  ['wysylane', 'wysyłane'],
  ['wysyla', 'wysyła'],

  ['zachowanie', 'zachowanie'],

  ['preferencje', 'preferencje'],
  ['preferencji', 'preferencji'],

  ['wyswietlania', 'wyświetlania'],

  ['poprawnie', 'poprawnie'],

  ['wymagaja', 'wymagają'],

  ['zapamietuja', 'zapamiętują'],
  ['zapamietanie', 'zapamiętanie'],

  ['ostatnio', 'ostatnio'],

  ['pozwalaja', 'pozwalają'],

  ['dostosowac', 'dostosować'],

  ['anonimowe', 'anonimowe'],
  ['anonimowych', 'anonimowych'],

  ['najczesciej', 'najczęściej'],

  ['odwiedzane', 'odwiedzane'],

  ['kraj', 'kraj'],

  ['ulepszac', 'ulepszać'],

  ['aktywne', 'aktywne'],

  ['wyrazeniu', 'wyrażeniu'],
  ['wyrazenia', 'wyrażenia'],

  ['zgody', 'zgody'],
  ['zgoda', 'zgoda'],

  ['nieuzywane', 'nieużywane'],

  ['przyszlosci', 'przyszłości'],

  ['skutecznosci', 'skuteczności'],

  ['uprzedniej', 'uprzedniej'],

  ['osadzac', 'osadzać'],

  ['dostawcow', 'dostawców'],

  ['zewnetrznych', 'zewnętrznych'],

  ['czcionki', 'czcionki'],

  ['wlasnych', 'własnych'],

  ['polityki', 'polityki'],

  ['Zarzadzanie', 'Zarządzanie'],
  ['zarzadzanie', 'zarządzanie'],

  ['ustawienia', 'ustawienia'],

  ['Wylaczenie', 'Wyłączenie'],
  ['wylaczenie', 'wyłączenie'],
  ['wylacznie', 'wyłącznie'],

  ['wplynac', 'wpłynąć'],

  ['funkcjonalnosc', 'funkcjonalność'],

  ['Instrukcje', 'Instrukcje'],

  ['popularnych', 'popularnych'],

  ['kazdorazowe', 'każdorazowe'],
  ['kazdej chwili', 'każdej chwili'],

  ['informowanie', 'informowanie'],

  ['umieszczaniu', 'umieszczaniu'],

  ['serwisu', 'serwisu'],
  ['Serwisu', 'Serwisu'],

  ['internetowy', 'internetowy'],
  ['internetowego', 'internetowego'],

  ['adresie', 'adresie'],

  ['siedziba', 'siedzibą'],

  ['podanie', 'podanie'],

  ['danych', 'danych'],

  ['udostepnia', 'udostępnia'],

  ['udziela', 'udziela'],

  ['stosujemy', 'stosujemy'],

  ['ograniczenia', 'ograniczenia'],

  ['przenoszenia', 'przenoszenia'],

  ['sprzeciwu', 'sprzeciwu'],

  // Form-related
  ['Sprawdz', 'Sprawdź'],
  ['sprawdz', 'sprawdź'],

  ['tradycyjna', 'tradycyjna'],

  ['Postanowienia', 'Postanowienia'],
  ['ogolne', 'ogólne'],
  ['Ogolne', 'Ogólne'],

  ['Uzytkownik', 'Użytkownik'],
  ['uzytkownik', 'użytkownik'],
  ['uzytkownika', 'użytkownika'],
  ['uzytkownikow', 'użytkowników'],

  ['zobowiazuje', 'zobowiązuje'],

  ['sposob', 'sposób'],
  ['sposobu', 'sposobu'],

  ['osob', 'osób'],
  ['osoba', 'osoba'],
  ['Osob', 'Osób'],

  ['godnosc', 'godność'],

  ['naruszajacych', 'naruszających'],
  ['narusza', 'narusza'],

  ['majacych', 'mających'],
  // NOTE: "maja" intentionally NOT converted — collides with "maja" (genitive of "May" in dates)

  ['Wyslanie', 'Wysłanie'],
  ['wyslanie', 'wysłanie'],
  ['wysylanie', 'wysyłanie'],

  ['nawiazania', 'nawiązania'],
  ['nawiazac', 'nawiązać'],

  ['checi', 'chęci'],

  ['krotkim', 'krótkim'],
  ['krotki', 'krótki'],

  ['odpowiedzi', 'odpowiedzi'],

  ['Pelni', 'Pełni'],
  ['pelni', 'pełni'],

  ['ustalanych', 'ustalanych'],

  ['Zawarcie', 'Zawarcie'],

  ['umowy', 'umowy'],

  ['odrebnej', 'odrębnej'],

  ['umowy pisemnej', 'umowy pisemnej'],

  ['VAT marza', 'VAT marża'],

  ['uzgodnionym', 'uzgodnionym'],

  ['miejscu', 'miejscu'],

  ['Wszelkie', 'Wszelkie'],

  ['techniczne', 'techniczne'],

  ['weryfikacji', 'weryfikacji'],

  ['starannosci', 'staranności'],

  ['zaleca', 'zaleca'],

  ['osobiste', 'osobiste'],

  ['obejrzenie', 'obejrzenie'],

  ['Reklamacje', 'Reklamacje'],

  ['nalezy', 'należy'],

  ['Zgloszenie reklamacyjne', 'Zgłoszenie reklamacyjne'],

  ['date', 'datę'],

  ['rozpatrzy', 'rozpatrzy'],

  ['terminie', 'terminie'],

  ['otrzymania', 'otrzymania'],

  ['publikowane', 'publikowane'],

  ['chronione', 'chronione'],

  ['stanowia', 'stanowią'],

  ['Kopiowanie', 'Kopiowanie'],

  ['rozpowszechnianie', 'rozpowszechnianie'],

  ['wykorzystanie', 'wykorzystanie'],

  ['zabronione', 'zabronione'],

  ['Postanowienia koncowe', 'Postanowienia końcowe'],
  ['koncowe', 'końcowe'],
  ['konca', 'końca'],

  ['nieuregulowanych', 'nieuregulowanych'],

  ['Regulaminem', 'Regulaminem'],

  ['stosuje', 'stosuje'],

  ['Kodeksu', 'Kodeksu'],

  ['cywilnego', 'cywilnego'],

  ['ustawy', 'ustawy'],

  ['lipca', 'lipca'],

  ['elektroniczna', 'elektroniczną'],

  ['publikacje', 'publikację'],

  ['nowej', 'nowej'],

  ['wersji', 'wersji'],

  ['Aktualna', 'Aktualna'],

  ['Spory', 'Spory'],

  ['wynikajace', 'wynikające'],

  ['rozstrzyga', 'rozstrzyga'],

  ['sad', 'sąd'],
  ['Sad', 'Sąd'],

  ['stanowia', 'stanowią'],

  ['inaczej', 'inaczej'],

  // Forms
  ['Telefon', 'Telefon'],

  // misc
  ['mialy', 'miały'],
  ['siegaja', 'sięgają'],
  ['siega', 'sięga'],
  ['szczer', 'szczer'],

  // ze - DELIBERATELY OMITTED — context-dependent. See note above.

  // Round 3 — high-frequency words still missing
  ['sie', 'się'],
  ['Sie', 'Się'],

  ['plikow', 'plików'],
  ['Plikow', 'Plików'],

  ['rodzajow', 'rodzajów'],

  ['prywatnosci', 'prywatności'],
  ['Prywatnosci', 'Prywatności'],

  ['wydajnosci', 'wydajności'],

  ['podmiotow', 'podmiotów'],

  ['Sluza', 'Służą'],
  ['sluza', 'służą'],
  ['sluzy', 'służy'],

  ['Niezbedne', 'Niezbędne'],

  ['umozliwiaja', 'umożliwiają'],

  ['zbieraja', 'zbierają'],

  ['Pomagaja', 'Pomagają'],

  ['zarzadzania', 'zarządzania'],

  ['przegladarek', 'przeglądarek'],

  ['wiadomosci', 'wiadomości'],

  ['Wlascicielem', 'Właścicielem'],

  ['zlozenie', 'złożenie'],

  ['informacji', 'informacji'],

  ['producent', 'producent'],

  ['niewlasc', 'niewłaśc'],

  ['oferty', 'oferty'],

  ['handlowej', 'handlowej'],

  ['wyswietlania', 'wyświetlania'],

  ['sesji', 'sesji'],

  // Footer / page.tsx leftovers visible in earlier diff
  ['dostepne od reki', 'dostępne od ręki'],
  ['od reki', 'od ręki'],
  ['reki', 'ręki'],

  ['weryfikacje', 'weryfikację'],

  ['inspekcje techniczna', 'inspekcję techniczną'],
  ['inspekcje', 'inspekcję'],

  // NOTE: "historia" NOT converted — used as nominative in "Pełna historia serwisowa".

  ['wylacznie', 'wyłącznie'],
  ['wylacznym', 'wyłącznym'],

  ['informacyjna', 'informacyjną'],
  ['techniczna', 'techniczną'],
  ['organicznie', 'organicznie'],

  ['kupna-sprzedazy', 'kupna-sprzedaży'],

  ['niewazne', 'nieważne'],

  ['kola', 'koła'],

  ['Skrzynia', 'Skrzynia'],

  ['Manualna', 'Manualna'],
  ['Automatyczna', 'Automatyczna'],

  ['Hatchback', 'Hatchback'],

  ['Czarny', 'Czarny'],

  // common verbs
  ['idzie', 'idzie'],
  ['idziesz', 'idziesz'],

  ['mowimy', 'mówimy'],
  ['mowi', 'mówi'],
  ['mowil', 'mówił'],
  ['mowila', 'mówiła'],
  ['mowi sie', 'mówi się'],

  // declensions
  ['Skontaktuj sie', 'Skontaktuj się'],
  ['Skontaktuj', 'Skontaktuj'],

  // misc
  ['handlowej', 'handlowej'],

  ['historie', 'historię'],

  ['celow', 'celów'],

  ['Zbieramy', 'Zbieramy'],

  ['kategorie', 'kategorie'],

  ['nazwisko', 'nazwisko'],

  ['kierowanego', 'kierowanego'],

  ['statystycznych', 'statystycznych'],

  ['statystyk', 'statystyk'],

  ['Cel', 'Cel'],

  // NOTE: "podstawa prawna" NOT converted — collides with nominative heading.

  ['Obsługa', 'Obsługa'],

  ['Realizacja', 'Realizacja'],

  ['Cele', 'Cele'],

  ['interes', 'interes'],

  ['administratora', 'administratora'],

  ['kontaktu', 'kontaktu'],

  ['osoba', 'osoba'],

  ['zainteresowana', 'zainteresowaną'],

  // ['oferta', 'ofertą'] — REMOVED. Was breaking anchor IDs and nominative usage.

  ['art\\.', 'art.'],

  ['lit\\.', 'lit.'],

  ['ust\\.', 'ust.'],

  ['Obowiazki', 'Obowiązki'],

  ['biuru', 'biuru'],

  ['Posiadasz', 'Posiadasz'],

  ['nastepujace prawa', 'następujące prawa'],

  ['Uzywam', 'Używam'],

  ['Twoich', 'Twoich'],

  ['EOG', 'EOG'],

  ['Wlasnym', 'Własnym'],

  // newly visible
  ['poczatku dokumentu', 'początku dokumentu'],
  ['poczatku', 'początku'],

  ['Zmiany', 'Zmiany'],

  ['polityki', 'polityki'],

  ['niniejszej', 'niniejszej'],

  ['Aktualna wersja', 'Aktualna wersja'],

  ['zawsze', 'zawsze'],

  ['stronie', 'stronie'],

  ['wprowadzania', 'wprowadzania'],

  ['Zastrzegamy', 'Zastrzegamy'],

  ['prawo', 'prawo'],

  ['umowy kupna-sprzedazy', 'umowy kupna-sprzedaży'],

  ['Faktura', 'Faktura'],

  ['umyte', 'umyte'],

  ['Pomocnik', 'Pomocnik'],

  ['poleruje', 'poleruje'],

  ['polerujemy', 'polerujemy'],

  ['lakier', 'lakier'],

  ['Naprawiamy', 'Naprawiamy'],

  ['naprawiamy', 'naprawiamy'],

  ['odpryski', 'odpryski'],

  ['drobne', 'drobne'],

  ['defekty', 'defekty'],

  ['nowe', 'nowe'],

  ['dopasowane', 'dopasowane'],

  ['Twoich potrzeb', 'Twoich potrzeb'],

  ['potrzeb', 'potrzeb'],

  ['Doradzamy', 'Doradzamy'],

  ['szczerze', 'szczerze'],

  ['plusy', 'plusy'],

  ['minusy', 'minusy'],

  // accusative ą after preposition "przez"
  ['nasza akceptacji', 'naszą akceptacją'],
  ['osobistej akceptacji', 'osobistej akceptacji'],

  // page.tsx specific
  ['Auta dostepne od reki', 'Auta dostępne od ręki'],

  // Round 4 — still missed
  ['jestesmy', 'jesteśmy'],
  ['Jestesmy', 'Jesteśmy'],
  ['Skad', 'Skąd'],
  ['skad', 'skąd'],
  ['Niezbedne', 'Niezbędne'],
  ['Sluza', 'Służą'],
  ['sluza', 'służą'],
  ['Czyscimy', 'Czyścimy'],
  ['czyscimy', 'czyścimy'],
  ['dobra jakość', 'dobrą jakość'],
  ['pełna inspekcję', 'pełną inspekcję'],
  ['pełna inspekcja', 'pełna inspekcja'],
  ['osciennych', 'ościennych'],
  ['oscienne', 'ościenne'],
  ['oscienia', 'ościennia'],
  ['oscieny', 'ościenny'],
  ['osciene', 'ościenne'],
  ['oscien', 'ościen'],
  ['Doswiadczeniem', 'Doświadczeniem'],
  ['doswiadczeniem', 'doświadczeniem'],
  ['Wlascicielem', 'Właścicielem'],
  ['Niezbedny', 'Niezbędny'],
  ['niezbedny', 'niezbędny'],
  ['niezbedna', 'niezbędna'],
  ['niezbedne', 'niezbędne'],
  ['Pelna inspekcję', 'Pełną inspekcję'],
  ['szczegoly', 'szczegóły'],
  ['Szczegoly', 'Szczegóły'],
  ['Wlasciwy', 'Właściwy'],
  ['Wszelkich', 'Wszelkich'],
  ['rozumieniu', 'rozumieniu'],
  ['osciennych', 'ościennych'],
  ['Polski rynku', 'polskim rynku'],
  ['rynku', 'rynku'],
  ['osciene', 'ościenne'],
  ['Czesto', 'Często'],
  ['czesto', 'często'],
  ['zadawane', 'zadawane'],
  ['pytania', 'pytania'],
  ['Wykonujemy', 'Wykonujemy'],
  ['oferujemy', 'oferujemy'],
  ['Oferujemy', 'Oferujemy'],
  ['Bazujemy', 'Bazujemy'],
  ['sprawdzony', 'sprawdzony'],
  ['Skad sprowadzane', 'Skąd sprowadzane'],
  ['marze', 'marżę'],
  ['marza', 'marża'],
  ['VAT marza', 'VAT marża'],
  ['VAT marze', 'VAT marżę'],
  ['nie znalazles', 'nie znalazłeś'],
  ['znalazles', 'znalazłeś'],
  ['Znalazles', 'Znalazłeś'],

  // Round 5 — last sweep
  ['zgloszenia', 'zgłoszenia'],
  ['Zgloszenia', 'Zgłoszenia'],
  ['zgloszen', 'zgłoszeń'],
  ['Imie', 'Imię'],
  ['imie', 'imię'],
  ['przegladarki', 'przeglądarki'],
  ['przegladarka', 'przeglądarka'],
  ['wyslac', 'wysłać'],
  ['wyslanie', 'wysłanie'],
  ['Wyslanie', 'Wysłanie'],
  ['wysylania', 'wysyłania'],
  ['udalo', 'udało'],
  ['Udalo', 'Udało'],
  ['Wypelnij', 'Wypełnij'],
  ['wypelnij', 'wypełnij'],
  ['wypelnic', 'wypełnić'],
  ['Zglos', 'Zgłoś'],
  ['Odezwiemy', 'Odezwiemy'],
  ['odezwiemy', 'odezwiemy'],
  ['Sprzedaj', 'Sprzedaj'],
  ['Pomocnik', 'Pomocnik'],
  ['Wyslij', 'Wyślij'],
  ['wyslij', 'wyślij'],
  ['weryfikacji', 'weryfikacji'],
  ['Wlasciwy', 'Właściwy'],
  ['nieobowiazkowe', 'nieobowiązkowe'],
  ['niejasnosci', 'niejasności'],
  ['Pomocy', 'Pomocy'],
  ['Niesp', 'Niesp'],
  ['Wszelkie', 'Wszelkie'],

  // Round 6 — final
  ['Wiadomosc', 'Wiadomość'],
  ['wiadomosc', 'wiadomość'],
  ['Najwazniejsze', 'Najważniejsze'],
  ['najwazniejsze', 'najważniejsze'],
  ['najwazniejszy', 'najważniejszy'],
  ['waznych', 'ważnych'],
  ['wazne', 'ważne'],
  ['wazna', 'ważna'],
  ['wazny', 'ważny'],
  ['Wazne', 'Ważne'],
  ['Wazna', 'Ważna'],
  ['Wazny', 'Ważny'],
];

const ALPHA = 'A-Za-z\\u00C0-\\u017F';
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function compileRule([from, to]) {
  // Word boundary that respects Unicode letters: not preceded/followed by a letter.
  const re = new RegExp(`(?<![${ALPHA}])${escapeRegex(from)}(?![${ALPHA}])`, 'g');
  return [re, to];
}

const compiled = REPLACEMENTS.filter(([a, b]) => a !== b).map(compileRule);

let totalChanges = 0;
const fileReport = [];

for (const rel of FILES) {
  const abs = path.resolve(rel);
  let src;
  try {
    src = await fs.readFile(abs, 'utf8');
  } catch {
    console.warn(`SKIP (missing): ${rel}`);
    continue;
  }
  let out = src;
  let count = 0;
  for (const [re, to] of compiled) {
    out = out.replace(re, () => {
      count += 1;
      return to;
    });
  }
  if (count > 0) {
    await fs.writeFile(abs, out);
    totalChanges += count;
    fileReport.push({ rel, count });
  }
}

for (const { rel, count } of fileReport) {
  console.log(`${count.toString().padStart(4)}  ${rel}`);
}
console.log(`\nTotal: ${totalChanges} replacements across ${fileReport.length} files.`);
