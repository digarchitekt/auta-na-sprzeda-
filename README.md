# autanasprzedaz.com

Profesjonalny portal sprzedazowy dla wyselekcjonowanych aut marek **Opel** i **Audi**.
Stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Nodemailer**.

---

## 1. Stack technologiczny — uzasadnienie

| Warstwa | Technologia | Dlaczego |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | SSR/ISR + statyczne podstrony aut → idealne dla Core Web Vitals i SEO |
| UI | **React 18 + Tailwind CSS** | Zero CSS-in-JS, mala paczka, latwa estetyka dark mode |
| Jezyk | **TypeScript** | Bezpieczenstwo typow w danych pojazdow |
| Mailing | **Nodemailer + SMTP** | Dziala na dowolnym VPS, bez vendor lock-in |
| Hosting | **VPS + Node.js + Nginx (reverse proxy) + PM2** | Pelna kontrola, niski koszt, latwa skala |
| Obrazy | **Next/Image (AVIF/WebP)** | Automatyczna optymalizacja, lazy load, responsive |

---

## 2. Struktura katalogow

```
autanasprzedaz/
├── app/
│   ├── api/
│   │   ├── contact/route.ts          # POST: formularz kontaktowy
│   │   ├── sell/route.ts             # POST: zgloszenia skupu
│   │   └── vehicle-inquiry/route.ts  # POST: zapytanie o konkretne auto
│   ├── auta/[slug]/page.tsx          # dynamiczna podstrona auta
│   ├── kontakt/page.tsx
│   ├── sprzedaj-auto/page.tsx
│   ├── globals.css
│   ├── layout.tsx                    # globalny layout (dark mode)
│   ├── not-found.tsx
│   └── page.tsx                      # strona glowna (Hero + listing)
├── components/
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Gallery.tsx                   # galeria zdjec z miniaturkami
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── SellForm.tsx
│   ├── VehicleCard.tsx
│   └── VehicleInquiryForm.tsx
├── data/
│   ├── company.ts                    # NAP — nazwa, adres, telefon
│   └── vehicles.ts                   # KONFIGURACJA POJAZDOW (uzupelniaj tutaj)
├── lib/
│   └── mailer.ts                     # transporter SMTP + helpery
├── public/
│   └── images/vehicles/<slug>/01.jpg # zdjecia (4 na auto)
├── .env.example
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 3. Uzupelnianie danych pojazdow

Edytuj **`data/vehicles.ts`** — kazdy obiekt to jedno auto. Pola:

- `slug` — segment URL: `/auta/<slug>`
- `brand`, `model`, `variant`, `year`, `price`, `mileage`, `power`, `engine` — dane kluczowe
- `highlights[]` — bullety pod galeria
- `specs[]` — pelna tabelka tech (label/value)
- `images[]` — sciezki do `public/images/vehicles/<slug>/*.jpg` (4 zdjecia, format 4:3, najlepiej 1600x1200)
- `featured: true` — wyroznienie

Dodanie nowego auta = jeden nowy obiekt w tablicy. Dane firmy/NAP edytujesz w `data/company.ts`.

---

## 4. Lokalne uruchomienie

```bash
cd autanasprzedaz
npm install
cp .env.example .env.local      # uzupelnij SMTP (lub zostaw puste — formularze logowane do konsoli)
npm run dev                     # http://localhost:3000
```

Build produkcyjny:

```bash
npm run build
npm run start                   # serwer Node na porcie 3000
```

---

## 5. Deployment na VPS (Ubuntu 22.04 LTS)

### 5.1. Przygotowanie serwera

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git

# PM2 (process manager)
sudo npm install -g pm2
```

### 5.2. Wgranie projektu

```bash
sudo mkdir -p /var/www/autanasprzedaz
sudo chown -R $USER:$USER /var/www/autanasprzedaz
cd /var/www/autanasprzedaz
git clone <twoje-repo> .
# lub: scp -r ./autanasprzedaz/* user@vps:/var/www/autanasprzedaz/

npm ci --omit=dev=false
cp .env.example .env
nano .env                       # uzupelnij SMTP_*, MAIL_TO, MAIL_FROM
npm run build
```

### 5.3. PM2 + autostart

```bash
pm2 start npm --name autanasprzedaz -- run start
pm2 save
pm2 startup systemd             # wykonaj polecenie ktore wypisze
```

### 5.4. Nginx jako reverse proxy + HTTPS

`/etc/nginx/sites-available/autanasprzedaz`:

```nginx
server {
    listen 80;
    server_name autanasprzedaz.com www.autanasprzedaz.com;

    # Cache statycznych assetow
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/autanasprzedaz /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# HTTPS — Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d autanasprzedaz.com -d www.autanasprzedaz.com
```

### 5.5. Aktualizacja po wgraniu zmian

```bash
cd /var/www/autanasprzedaz
git pull
npm ci
npm run build
pm2 reload autanasprzedaz
```

---

## 6. Konfiguracja SMTP (formularze)

W pliku `.env` na VPS:

```
SMTP_HOST=smtp.gmail.com           # lub OVH, Hetzner, sendgrid
SMTP_PORT=587
SMTP_USER=biuro@autanasprzedaz.com
SMTP_PASS=app-password-tutaj
MAIL_FROM="Auta Na Sprzedaz <biuro@autanasprzedaz.com>"
MAIL_TO=biuro@autanasprzedaz.com
```

Bez SMTP formularze nadal dzialaja — tresc trafia do logow PM2 (`pm2 logs autanasprzedaz`).

---

## 7. Wydajnosc / Core Web Vitals — checklist

- [x] Dark mode bez przelaczania → brak FOUC
- [x] Brak ciezkich animacji JS
- [x] Czcionki Google z `display=swap` + preconnect
- [x] Naglowki cache dla `/_next/static/`
- [x] AVIF/WebP wlaczone w `next.config.mjs`
- [x] Brak `Image` do nieoptymalizowanych assetow zewnetrznych
- [x] Statyczne generowanie podstron aut (`generateStaticParams`)
- [ ] **TODO klienta:** wgrac realne zdjecia 1600x1200 do `public/images/vehicles/<slug>/`
- [ ] **TODO klienta:** dodac favicon i `og-image.jpg` do `/public`

---

## 8. Co dalej (opcjonalnie)

- Panel admin (np. **Sanity** / **Payload CMS**) zamiast edytowania `vehicles.ts` w kodzie
- Integracja z Otomoto API
- Analytics (Plausible / GA4)
- Sitemap.xml + robots.txt (`app/sitemap.ts`, `app/robots.ts`)
