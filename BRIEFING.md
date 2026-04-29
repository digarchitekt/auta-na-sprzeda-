# BRIEFING — co musisz uzupelnic

Ten plik to **kompletna check-lista** wszystkiego, czego potrzebuje strona zanim pojdzie na produkcje.
Wypelnij sekcje po kolei. Pola oznaczone `WAZNE` sa wymagane prawnie albo dla SEO.

---

## 1. DANE FIRMY (do `data/company.ts`)

### 1.1. Podstawowe (WAZNE)
- [ ] Pelna nazwa firmy (np. "Auta Na Sprzedaz Jan Kowalski"):
- [ ] Forma prawna (JDG / sp. z o.o. / sp.k.):
- [ ] **NIP** (10 cyfr):
- [ ] **REGON** (9 lub 14 cyfr):
- [ ] **KRS** (jezeli sp. z o.o. / sp.k.):
- [ ] **BDO** (jezeli wprowadzasz pojazdy do obrotu):

### 1.2. Adres (WAZNE — Google Maps + wizytowka)
- [ ] Ulica i numer:
- [ ] Kod pocztowy:
- [ ] Miasto:
- [ ] Wojewodztwo:
- [ ] Link do mapy Google (Embed → udostepnij → kopiuj iframe):

### 1.3. Kontakt
- [ ] Telefon glowny:
- [ ] Telefon dodatkowy / WhatsApp:
- [ ] E-mail biuro:
- [ ] E-mail do skupu (moze byc ten sam):
- [ ] Profile spolecznosciowe:
  - Facebook (URL):
  - Instagram (URL):
  - YouTube (URL):
  - TikTok (URL):
  - OtoMoto (link do profilu komisu):

### 1.4. Godziny otwarcia
- [ ] Pon - Pt: od ___ do ___
- [ ] Sobota: od ___ do ___ (lub "zamkniete")
- [ ] Niedziela: od ___ do ___ (lub "po umowieniu")

### 1.5. Konto bankowe (do umow / faktur — opcjonalnie na stronie)
- [ ] Bank:
- [ ] Numer konta:

---

## 2. DANE KAZDEGO AUTA (do `data/vehicles.ts`)

Powtorz dla **kazdego z 5 aut** (Astra K 2017, Astra K 2022, Astra OPC 2013, Astra H 2022, Audi A8 2016) + dla nowych aut, ktore dodasz.

### Auto #__: ___________________

#### Identyfikatory
- [ ] Slug URL (bez polskich znakow, malymi literami, np. `audi-a8-2016`):
- [ ] Marka (Opel / Audi):
- [ ] Model (np. "Astra K"):
- [ ] Wersja / wariant (np. "1.4 Turbo Elite"):

#### Cena i dostepnosc
- [ ] **Cena PLN** (sama liczba, np. 39900):
- [ ] Status (dostepne / zarezerwowane / sprzedane):
- [ ] Forma sprzedazy (faktura VAT 23% / VAT marza / umowa):

#### Dane techniczne (WAZNE — SEO + zaufanie kupujacego)
- [ ] **Rok produkcji**:
- [ ] **Przebieg** (km, sama liczba):
- [ ] Pojemnosc silnika (cm3):
- [ ] **Moc** (KM):
- [ ] Moment obrotowy (Nm) — opcjonalnie:
- [ ] **Rodzaj paliwa** (Benzyna / Diesel / LPG / Hybryda / Elektryk):
- [ ] Spalanie sredn. (l/100km) — opcjonalnie:
- [ ] **Skrzynia biegow** (Manualna 5/6-bieg / Automatyczna X-bieg):
- [ ] **Naped** (Przedni / Tylny / 4x4 / Quattro):
- [ ] Liczba drzwi:
- [ ] Liczba miejsc:
- [ ] **Kolor** (np. "Czarny metalik"):
- [ ] Typ nadwozia (Hatchback / Sedan / Kombi / SUV / Coupe):
- [ ] **VIN** (17 znakow — pokazujemy publicznie tylko ostatnie 4):
- [ ] Numer rejestracyjny — **NIE PUBLIKOWAC** (zostawiamy w dokumentach):
- [ ] Pierwsza rejestracja (data):
- [ ] **Kraj pochodzenia** (Polska / Niemcy / itp.):
- [ ] Bezwypadkowy? (tak / nie / serwisowany po stluczce):
- [ ] Pierwszy wlasciciel? (tak / nie):
- [ ] Faktura / ksiazka serwisowa? (tak / nie):

#### Wyposazenie — TOP 4-6 highlights (na karte i jako bullety)
Wybierz najmocniejsze argumenty sprzedazowe, np.:
- [ ] Highlight 1:
- [ ] Highlight 2:
- [ ] Highlight 3:
- [ ] Highlight 4:
- [ ] (opcjonalnie) Highlight 5:
- [ ] (opcjonalnie) Highlight 6:

#### Opis
- [ ] **Krotki opis** (1-2 zdania, max 200 znakow — wyswietla sie na karcie i w meta-description):
- [ ] **Pelny opis** (3-6 akapitow — historia auta, stan, co bylo zrobione, co warto wymienic, dlaczego warto kupic akurat to):

#### Zdjecia
- [ ] Min. **8 zdjec**, idealnie 12-15. Wymogi w sekcji 3 ponizej.

#### Wideo (opcjonalnie ale mocne)
- [ ] Plik wideo lub link YouTube — wymogi w sekcji 4.

---

## 3. ZDJECIA AUT — PROFESJONALNY ZESTAW

### 3.1. Specyfikacja techniczna
- **Format**: JPG (najlepiej) lub PNG
- **Rozmiar**: minimum 1600x1200 px (4:3) lub 1920x1080 (16:9)
- **Waga pliku**: max 500 KB po kompresji (wstaw przez https://squoosh.app)
- **Liczba zdjec na auto**: minimum 8, idealnie 12-15
- **Nazewnictwo**: `01.jpg`, `02.jpg`, `03.jpg`... (puttane do folderu `public/images/vehicles/<slug>/`)

### 3.2. Lista ujec (zrob KAZDE z tej listy)
**Zewnetrzne (8 podstawowych):**
1. **3/4 z przodu z lewej** (klasyczne ujecie "okladkowe" — to zdjecie nr 01)
2. **3/4 z tylu z prawej**
3. Profil z lewej (boczny, wprost)
4. Profil z prawej
5. Frontem na wprost
6. Tylem na wprost
7. Przod z lotu ptaka / pod katem 45° z gory (jezeli mozesz)
8. Detal felgi + opona

**Wnetrze (4-5 ujec):**
9. Caly kokpit z fotela kierowcy (przez otwarte drzwi)
10. Deska rozdzielcza + kierownica + ekran (uruchomione zaplon, zegary widoczne)
11. **Licznik z aktualnym przebiegiem** (WAZNE — dowod uczciwosci)
12. Tylna kanapa
13. Bagaznik (otwarty, pusty)

**Detale (sprzedajace):**
14. Logo / emblemat (Opel/Audi rings)
15. Skora foteli z bliska / fotele Recaro (jezeli sa)
16. Ekran multimediow z menu (pokaze rocznik / wersje softu)
17. Komora silnika (czysta!)
18. Numer VIN na tabliczce (mozesz **zamazac ostatnie 4 znaki**)

### 3.3. Wskazowki "jak zrobic dobre zdjecie"
- **Pora dnia**: zlota godzina (godzine po wschodzie / przed zachodem) lub pochmurny dzien
- **Tlo**: jednolite, bez balaganu — sciana, hala, parking pusty, las z dystansu
- **Auto czyste** (umyte + opony nablyszczone — zmiana totalna)
- **Telefon trzymaj POZIOMO** (landscape!) na wysokosci reflektorow
- **NIE rob zdjec w podziemnym garazu** (zolte swiatlo zabija kolory)
- **NIE w slonce z tylu** (kontrowe podswietlenie spali front)
- 1 zdjecie = 1 ujecie. Nie kombinuj.

### 3.4. Co usunac przed wgraniem
- [ ] Zamazac tablice rejestracyjna (na kazdym zdjeciu) — pixelizacja albo czarny prostokat
- [ ] Zamazac VIN (jezeli widoczny w pelnej formie)
- [ ] Sprawdz, czy na tle nie ma osob postronnych
- [ ] Sprawdz, czy nie widac papierow z danymi osobowymi (np. dowod rej. na desce)

---

## 4. WIDEO Z AUTEM — JAK ZROBIC I JAK WSTAWIC

### 4.1. Plan ujec na klip (30-60 sekund)
Zrob telefonem w 4K@30fps, pozniej zmontujesz w CapCut / Premiere.

| Czas | Ujecie |
|---|---|
| 0:00-0:03 | Dynamiczne wjecie kamery wzdluz boku auta |
| 0:03-0:08 | 360° dookola auta (chodz dookola, nagrywaj wolno) |
| 0:08-0:13 | Detal grilla / loga / felg (bardzo blisko, ostrzenie) |
| 0:13-0:20 | Wnetrze — slow-pan po desce + fotele |
| 0:20-0:25 | Wlaczenie silnika (dzwiek silnika SLYSZALNY!) |
| 0:25-0:35 | Krotka jazda — odjazd auta od kamery |
| 0:35-0:50 | B-roll: detale, feldze, ekran multimediow |
| 0:50-0:60 | Stojace auto + napis + logotyp + telefon kontaktowy |

### 4.2. Wymogi techniczne
- **Format**: MP4 (H.264)
- **Rozdzielczosc**: 1920x1080 (Full HD) lub 3840x2160 (4K)
- **Bitrate**: 8-12 Mbps (FHD), 35-45 Mbps (4K)
- **Dlugosc**: 30-60 sekund (krotsze = wieksze CTR)
- **Waga**: max 30 MB (skompresuj przez https://handbrake.fr)
- **Audio**: muzyka + ewentualnie dzwiek silnika

### 4.3. Muzyka — gdzie wziac LEGALNIE
**NIE bierz muzyki z radia / Spotify / YouTube — copyright strike murowany.**

Darmowe (komercyjne uzycie OK):
- **YouTube Audio Library** — https://studio.youtube.com → Biblioteka audio
- **Pixabay Music** — https://pixabay.com/music/
- **Uppbeat** — https://uppbeat.io (10 utworow / mc free)

Platne (1 raz placisz, masz na zawsze):
- **Artlist** (~200 USD/rok) — https://artlist.io
- **Epidemic Sound** (~150 USD/rok) — https://www.epidemicsound.com
- **Musicbed** — https://www.musicbed.com

**Klimat dla automotive**: cinematic trap, deep house, lo-fi hip-hop, atmospheric electronic. NIE bierz piosenek z wokalem (rozprasza).

### 4.4. Jak wstawic wideo na strone — 3 opcje

**Opcja A: YouTube (REKOMENDOWANE)**
- Wgraj jako "niepubliczne" lub "publiczne"
- Dodaj URL do `data/vehicles.ts` w polu `videoUrl`
- Ja dodam komponent z `<iframe>` i lazy-loadem
- Plus: zero kosztow transferu na VPS, dziala na kazdym urzadzeniu, SEO bonus
- Minus: branding YouTube na koncu

**Opcja B: Plik MP4 hostowany na VPS**
- Wgraj plik do `public/videos/<slug>.mp4`
- Dodaj plakat (klatka z filmu) jako `public/videos/<slug>.jpg`
- Plus: pelna kontrola, brak brandingu
- Minus: zjada transfer VPS (przy 10k odslon/mc liczy sie)

**Opcja C: Vimeo**
- Jak YouTube, tylko bez reklam
- Plan platny od ~7 USD/mc

**Moja rekomendacja**: YouTube + niepubliczny tryb. Dla 1-2 hero-aut mozesz dac hostowany MP4 + autoplay/muted/loop bez kontrolek (krotki "tease loop" 6-8 sekund w hero sekcji).

### 4.5. Co podaj mi, zebym to wstawil
Dla kazdego auta z wideo:
- [ ] Slug auta:
- [ ] URL YouTube (jezeli A) lub plik MP4 (jezeli B):
- [ ] Plakat (1 zdjecie z filmu, np. najladniejsza klatka):

---

## 5. TRESCI MARKETINGOWE NA STRONIE

### 5.1. Hero (sekcja glowna na startowej)
- [ ] Glowny slogan (obecnie: "Sprawdzone auta. Bez kompromisu.") — chcesz zmienic?
- [ ] Tekst pod sloganem (1-2 zdania o tym czym sie zajmujecie):
- [ ] **Statystyki w hero**:
  - Auta w ofercie (obecnie "5+"):
  - Lat na rynku (obecnie "10"):
  - Zadowolonych klientow (obecnie "500+"):

### 5.2. Sekcja "dlaczego my" (3 boxy)
- [ ] Box 1 - Selekcja: opis (lub zostawic obecny):
- [ ] Box 2 - Transparentnosc: opis:
- [ ] Box 3 - Wsparcie: opis:

### 5.3. Polityka prywatnosci (WAZNE — RODO!)
- [ ] Tresc polityki (mozesz uzyc generatora https://gospodarz.pl/wzory-pism/polityka-prywatnosci):
- [ ] Tresc regulaminu skupu (jak skupujesz auta, jakie warunki):
- [ ] Klauzula RODO przy formularzach (kto przetwarza dane, jak dlugo):

### 5.4. SEO — meta opisy
- [ ] Meta title strony glownej (max 60 znakow):
- [ ] Meta description strony glownej (max 160 znakow):
- [ ] Slowa kluczowe (np. "komis Opel Warszawa", "skup aut Audi"):

---

## 6. ELEMENTY WIZUALNE FIRMY

- [ ] **Logo** w SVG lub PNG (transparent background, min 512x512)
- [ ] Logo na dark background (jasna wersja)
- [ ] Favicon (32x32 i 192x192) — moze byc wygenerowany z logo: https://realfavicongenerator.net
- [ ] **OG image** (1200x630 — to widac przy udostepnianiu na FB/WhatsApp)
- [ ] Ewentualnie: kolory firmowe (jezeli masz brand book)

---

## 7. INTEGRACJE / KONTA

- [ ] **Skrzynka pocztowa SMTP** (np. biuro@autanasprzedaz.com przez OVH/Hetzner):
  - Host SMTP:
  - Port:
  - Login:
  - Haslo (lub haslo aplikacji):
- [ ] **Domena**: zarejestrowana? gdzie? (OVH/home.pl/cyber_folks):
- [ ] **VPS**: u kogo? (Hetzner / Mikr.us / Atman / OVH):
- [ ] **Google Search Console** — chcesz, zebym podpial?
- [ ] **Google Analytics 4** — chcesz, zebym podpial? (lub Plausible — szybszy, bez ciasteczek)
- [ ] **Facebook Pixel / Meta Pixel** — jezeli planujesz reklamy:
- [ ] **Google Maps API key** (jezeli chcesz interaktywna mape — wystarczy embed bez API):

---

## 8. JAK MI TO ODDAC

Najszybsza forma:
1. Wypelnij ten plik (skopiuj do Worda / Notion / Google Docs i odpisuj pod kazdym pytaniem)
2. Zdjecia wrzuc do **jednego folderu na Dysku Google / Dropbox** — po jednym podfolderze na auto, nazwane slugami (np. `audi-a8-2016/`)
3. Filmiki — jak w sekcji 4.4 (najprosciej YouTube unlisted)
4. Logotypy + favicon — w osobnym folderze "marka"

Mozesz tez zrobic to w transzach: najpierw firma + 1 auto, potem reszta. Aktualizacje sa szybkie.

---

# JAK PRZENIESC TO DO AI DESIGN TOOLI (V0 / LOVABLE / CLAUDE.AI)

Pytales o "cloud design" — domyslam sie ze chodzi o jeden z tych tooli. Oto rekomendacje + co konkretnie zrobic.

## Opcja 1: **v0.dev** (Vercel) — najlepsze do Next.js
**Plus**: native obsluga Next.js + Tailwind, bezposredni eksport komponentow, generuje z screenshotow.
**Minus**: dziala na komponent, nie na cala aplikacja jednoczesnie.

**Workflow:**
1. Wejdz na https://v0.dev
2. Wez screenshot strony, ktora Ci sie podoba (np. bananowefury.pl)
3. Promptuj: *"Recreate this hero section as a Next.js + Tailwind component, dark mode, automotive industry, brand color #e11d2e"*
4. Skopiuj wygenerowany kod do `components/Hero.tsx` (zastapi obecny)

## Opcja 2: **Lovable.dev** — najlepsze do calej aplikacji
**Plus**: generuje cala aplikacja od zera + deploy na 1 klik. Ma vision do screenshotow.
**Minus**: stosuje wlasna struktura — jezeli chcesz zachowac tot kod ktory mam, lepiej v0.

## Opcja 3: **Claude.ai (artifacts)** lub **Bolt.new**
**Plus**: jedno okno, mozna dac caly projekt jako kontekst.
**Minus**: trudniejszy eksport.

## **MOJA REKOMENDACJA dla Ciebie:**

Zostan przy obecnym kodzie (jest gotowy, dziala, wdrozony) i **zlec v0/Lovable konkretne ulepszenia**, nie cala strone od nowa. Konkretnie:

### Promptu, ktory daj v0.dev:

```
Build a hero section for a premium used car dealership selling Opel and Audi.

Requirements:
- Next.js 14 + Tailwind CSS, single component file
- Dark mode only (background #0a0a0a, accent #e11d2e)
- Typography: Bebas Neue for display, Inter for body
- Subtle animations using framer-motion: text fade-up on load, parallax background
- Background: animated gradient mesh + subtle grid pattern + slow-floating accent blob
- Headline: "Sprawdzone auta. Bez kompromisu." (Polish)
- Two CTAs: primary "Zobacz oferte", outline "Sprzedaj swoje auto"
- Stats row at bottom: 5+ aut, 10 lat, 500+ klientow
- Right side: large car silhouette with neon underglow effect
- Mobile-first responsive
- Performance: avoid heavy libraries, no parallax on mobile, prefers-reduced-motion respected
- Aesthetic reference: bananowefury.pl, premium automotive, masculine, high contrast
```

Wynikowy kod wkleja do `components/Hero.tsx`. Robimy tak komponent po komponencie.

## ANIMACJE — co dodac, zeby strona "zyla", ale nie spowolnic CWV

Konkretne propozycje (mozemy zrobic teraz, w obecnym projekcie):

### Lekkie (CSS only, zero kosztow performance)
1. **Hover na kartach aut**: lekkie podniesienie + cien (juz jest scale, mozemy dodac translate-y)
2. **Akcent migajacy w hero** (slow pulse na czerwonej kropce): 2 linie CSS
3. **Underline animowany** w nawigacji: 3 linie CSS
4. **Smooth scroll** miedzy sekcjami: 1 linia CSS

### Srednie (framer-motion, ~12KB gzip — akceptowalne)
5. **Fade-up na wejsciu** sekcji (gdy wjedzie do viewportu) — Intersection Observer
6. **Counter animation** dla statystyk w hero (5+, 10, 500+ liczy sie od zera)
7. **Stagger animation** kart aut (pojawiaja sie po kolei, 80ms odstep)

### Ciezsze (rozwazyc czy warto)
8. **Lenis smooth scroll** (efekt "premium" — strona przewija sie miekko)
9. **GSAP scroll-trigger** dla parallaxu w hero
10. **Auto wyjezdza zza ramki** w hero (SVG / 3D model przez @react-three/fiber)

### **MOJA REKOMENDACJA: zrob #1, #2, #3, #4, #5, #6, #7. Nie #8-10.**
Dlaczego: pierwsza siodemka kosztuje <15KB gzip, daje "premium feel", nie spowalnia LCP.
8-10 wyglada wow ale dodaje 50-100KB i ryzykuje INP > 200ms (Google penalizuje).

Daj znac, ktore z animacji chcesz, a wprowadze je w kodzie. Mozemy tez najpierw zaczac od ulepszenia hero przez v0 i pozniej przeniesc to tutaj.

---

## TL;DR — co zrobic teraz

1. Wypelnij sekcje **1, 2, 3, 6, 7** (firma, auta, zdjecia, logo, SMTP)
2. Wrzuc na Drive/Dropbox folder z plikami i daj mi link
3. Zdecyduj czy chcesz wideo (sekcja 4) — jezeli tak, podaj plan dla kazdego auta
4. Powiedz mi, **ktore animacje chcesz** (z listy 1-7 wyzej)
5. Wrzucam wszystko do projektu, robie deployment na VPS, oddaje gotowa strone

Jezeli chcesz najpierw pobawic sie designem w v0/Lovable — uzyj promptu wyzej. Wynik mozemy zaimportowac.
