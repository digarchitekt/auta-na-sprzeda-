# Prompty do generowania grafik i wideo

Plik z gotowymi promptami pod **Midjourney / DALL-E / Sora / Runway / Kling / Higgsfield**.
Wszystko stylistycznie spojne z dark-mode'em i akcentem #e11d2e.

---

## Czesc 1 — Sekcja HERO (najwazniejsze)

Hero teraz jest pusty (sam tekst + gradient). Trzy podejscia, od najprostszego do najbardziej imponujacego.

### Opcja A — **Statyczne tlo** (najszybsza, najtansza, najpewniejsza)

Cel: jeden ciemny, kinowy obraz auta, ktory bedzie pelnym tlem hero. Tekst lezy na nim z mocnym overlay'em.

#### Prompt (Midjourney v6 / DALL-E 3 / Flux):
```
Cinematic ultra-wide shot of a black Audi A8 sedan parked in a dark empty
underground parking, single dramatic red rim light from above hitting the
hood and side, deep shadows, atmospheric haze, wet concrete floor with
subtle reflections, modern industrial architecture, color grading: deep
blacks, charcoal grays, single accent of crimson red (#e11d2e) on rim light,
shot on ARRI Alexa, 50mm anamorphic lens, f/2.8, photorealistic, ultra
detailed, 16:9 aspect ratio, magazine cover quality, no text, no logos,
no people --ar 16:9 --style raw --v 6
```

#### Alternatywne ujecie:
```
Wide moody shot of a polished Opel Astra OPC viewed from low angle 3/4 front,
parked on a wet asphalt at night, neon red light reflection from a sign just
out of frame, atmospheric fog at street level, urban warehouse district
background heavily blurred, color palette: jet black, charcoal, single red
accent, hyper-realistic, cinematic, 35mm film grain, 16:9 --ar 16:9 --v 6
```

#### Co z tym zrobic:
1. Wygeneruj 4-6 wariantow, wybierz najlepszy
2. Uplada do `/public/images/hero-bg.jpg` (rekomendowane 2560x1440, JPG, ~250-400 KB)
3. Powiedz mi "wstaw jako tlo hero", a podlacze go przez `<Image>` z overlay'em na tekst

---

### Opcja B — **Petla wideo w tle** (efekt premium, ~30 MB)

Cel: cichy, zapetlony klip 6-10 sekund w tle hero. Tekst na wierzchu.

#### Prompt do **Sora / Runway Gen-3 / Kling 1.6 / Higgsfield**:
```
Slow cinematic dolly shot moving along the side of a black Audi A8 sedan in
a dark studio, single key light slowly sweeping across the body revealing
chrome accents and the tail light, atmospheric haze, ultra slow motion,
deep blacks, single warm red accent light, shot on cinema camera, anamorphic
lens, 24fps, no people, no text, seamless loop ready, 16:9, 6 seconds
```

#### Alternatywa — abstrakcyjna:
```
Ultra-close cinematic macro shot of dark wet car body, droplets sliding down
glossy black paint, single red light reflection slowly traveling across the
surface, ultra slow motion, deep blacks, photorealistic, cinematic color
grading, 6 seconds, seamless loop, 16:9, no text
```

#### Wymogi techniczne pod web:
- Format: **MP4 (H.264)** + opcjonalnie WebM
- Rozdzielczosc: 1920x1080
- Dlugosc: **6-10 s** (dluzsze = za duzy plik)
- Bitrate: 4-6 Mbps (max 30 MB!)
- **Bez dzwieku** (autoplay tylko bez audio dziala)
- Skompresuj przez https://handbrake.fr (Web Optimized = ON)
- Plik: `/public/videos/hero.mp4` + `/public/videos/hero-poster.jpg` (1 klatka jako fallback)

#### Daj mi znac ze chcesz video w hero — dodam komponent z `<video autoplay muted loop playsinline>` + plakat na pierwsze 0.5s zanim wideo sie zaladuje.

---

### Opcja C — **Hybryda: 3D-like ilustracja auta + text** (najbardziej "design-y")

Cel: stylizowana, prawie wektorowa ilustracja auta z neonowym podswietleniem, ktora wyglada jak na plakacie filmowym.

#### Prompt (Midjourney v6, DALL-E 3, Flux dev):
```
Stylized minimalist illustration of a black Opel Astra OPC car in profile
view, ultra dark background with subtle red glow underneath, neon underglow
effect in crimson red (#e11d2e), strong rim lighting on car silhouette,
high contrast, clean lines, photorealistic but graphic, automotive poster
style, dark gradient background from black to charcoal, isolated subject,
PNG with transparent shadow underneath, magazine ad quality, no text,
no logos, 16:9 --ar 16:9 --v 6 --style raw
```

#### Co z tym zrobic:
- Zapisz jako PNG transparent
- Daje jako element dekoracyjny w hero (np. po prawej stronie albo wycentrowany na dole pod tekstem)
- Latwo skalowac, wyglada premium

---

## Czesc 2 — Inne miejsca na stronie

### Tlo sekcji "O nas"

Ciemny, nieagresywny pattern, ktory doda glebi:

```
Subtle dark abstract texture pattern, brushed metal surface in deep black,
faint horizontal scratches catching light, single subtle red gradient bloom
in upper left corner, suitable as background for dark website, low contrast,
high quality, seamless tileable, 4K, no text --ar 16:9
```

Uzycie: wstaw jako `bg-image` na sekcji `#o-nas`.

### Plakaty w stylu "polaroid" pod opinie klientow (jezeli dodasz testimoniale)

```
Cinematic dark photo of a man's hand holding a key fob next to a black
luxury sedan, soft warm light, depth of field, photorealistic, dark moody
atmosphere, no faces visible, 1:1 aspect ratio --ar 1:1 --v 6
```

### OG image (do social mediow — gdy ktos wkleja link na FB/WhatsApp)

```
Wide cinematic banner image, black Audi A8 in dark studio with red accent
lighting, large bold text overlay reading "AUTANASPRZEDAZ.COM" in
condensed white sans-serif font, lower-third positioning, magazine cover
style, 1200x630 pixels, dark background, professional automotive
advertising aesthetic --ar 1.91:1 --v 6
```

Wymogi: **1200x630 px**, JPG/PNG, max 1 MB. Wgraj jako `/public/og-image.jpg`.

### Favicon / logo

Jezeli nie masz:
```
Minimalist automotive logo monogram, letter "A" stylized as car silhouette
or speed line, single color: crimson red on transparent background, flat
vector style, 512x512, clean, modern, no text, no gradient --ar 1:1
```

---

## Czesc 3 — Wideo prezentacyjne aut (kazde auto osobno)

### Prompt do AI video (Sora / Runway / Kling) jezeli nie masz wlasnego materialu

```
Cinematic 30-second car commercial of a [BRAND MODEL] in [COLOR] color,
multiple shots: slow 360 rotation in dark studio, close-up macro of front
grille, interior dashboard sweep, key fob being pressed with door unlocking
animation, headlights turning on dramatically, exterior detail of wheel
spinning slowly, all shots with deep blacks, single red accent lighting,
atmospheric haze, professional automotive cinematography, ARRI Alexa look,
anamorphic lens, no people visible, no text, no logos, seamless cuts,
16:9, 4K
```

### Lepsze: nakrec sam telefonem (jak w BRIEFING.md sekcja 4) i polacz w CapCut/Premiere

AI video do aut konkretnego modelu **nie odda dokladnie Twojego egzemplarza** — bedzie generycznym renderem. Lepsze do tla/atmosfery niz do prezentacji konkretnego auta na sprzedaz.

---

## Czesc 4 — Co konkretnie wstawic w hero, zeby przestal byc "smutny"

Moj **ranking pomyslow** (od najwiekszej zmiany przy najmniejszym wysilku):

### 1. Najprostsze: jedno mocne zdjecie tla (Opcja A)
- Czas: 10 minut (Midjourney + crop + upload)
- Efekt: ogromny — z "smutnego" robi sie "premium"
- Koszt: ~10 PLN za Midjourney lub free w Imagen/Flux

### 2. Petla wideo w tle (Opcja B)
- Czas: 1-2h (generowanie, rendering, kompresja)
- Efekt: WOW
- Koszt: $10-30 za kredyty na Sora/Runway lub free na Kling
- Uwaga: dodaje 15-30 MB do strony, ale opaque mozna lazy-load

### 3. Zostaw tlo gradientowe + dodaj **animowany subtelny element** (np. swiecaca linia akcentowa, pulsujaca kropka, particle dots)
- Czas: 30 minut (dodam Ci to w kodzie, bez generowania)
- Efekt: maly ale uatrakcyjnia
- Koszt: 0

### 4. Po prawej stronie umiesc **maly element graficzny** (Opcja C)
- Wbrew temu ze chciales pelne wycentrowanie - gdyby to byl LEKKI element (np. transparent PNG samochodu z neonem) a nie kafelek tekstowy, moze to zadzialac
- Mogę zrobic eksperyment

---

## Moja rekomendacja kolejnosci

1. **Najpierw**: wygeneruj jedno tlo hero (Opcja A, 1. prompt z Audi A8) → wrzuc do `/public/images/hero-bg.jpg`
2. Daj mi znac, podpinam je z dark overlay
3. Jezeli efekt Cie zadowoli — koniec
4. Jezeli chcesz wiecej "ruchu" — generujesz wideo (Opcja B), wymieniam tlo na video
5. Wygeneruj OG image → social media zaczynaja wygladac profesjonalnie
6. Jezeli masz logo → favicon

---

## Narzedzia do generowania (linki + ceny)

### Grafika
- **Midjourney** ($10/mc, najlepsza jakosc filmowa, Discord) — https://midjourney.com
- **DALL-E 3** (w ChatGPT Plus, $20/mc) — https://chatgpt.com
- **Flux 1.1 Pro** (free na fal.ai, replicate.com) — https://flux-ai.io
- **Imagen 4** (Google, free w Vertex AI / Gemini) — https://aistudio.google.com
- **Ideogram** (free 25 dziennie, dobry do tekstu) — https://ideogram.ai

### Wideo
- **Sora** (OpenAI, $20/mc Plus) — https://sora.com — najwyzsza jakosc, krotkie klipy
- **Runway Gen-3** ($15/mc) — https://runwayml.com — fajny w ruch kamery
- **Kling 1.6** (chinski, free trial) — https://klingai.com — bardzo dobry stosunek jakosci do ceny
- **Higgsfield** (ten ze skill-u w Twoim Claude!) — https://higgsfield.ai — opcja jezeli chcesz spinac z MCP

### Kompresja po generacji
- Obrazy: https://squoosh.app (free, w przegladarce, Mozjpeg)
- Wideo: HandBrake (https://handbrake.fr) — Preset "Web Optimized"

---

## TL;DR

1. Daj mi znac ktora opcje wybierasz (A, B, C lub mix)
2. Wygeneruj asset (10 min - 2h)
3. Wrzuc plik do projektu (drag-drop do folderu `public/`)
4. Pisz mi nazwe pliku i miejsce — podlaczam w 30 sek
5. Push na git, deploy
