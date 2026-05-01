# Deployment Guide — autanasprzedaz.com

Kompletny przewodnik: od pustego VPS-a do dzialajacej strony pod **https://autanasprzedaz.com**
z auto-deploy z GitHub na kazdy push do `main`.

**Stack docelowy:**
- VPS Hostinger (Docker + Traefik — masz juz zainstalowane)
- Domena: autanasprzedaz.com (zarejestrowana w SEOHost)
- Repo: github.com/digarchitekt/auta-na-sprzeda-
- Auto-deploy: GitHub Actions → SSH → `git pull` + `docker compose up -d --build`

---

## KROK 1 — DNS (SEOHost)

Domena jest u SEOHost, ale wskazuje gdzies indziej. Trzeba ja skierowac na IP VPS-a.

### 1.1. Sprawdz IP VPS-a
W panelu Hostinger → VPS → Twoja maszyna → znajdz **IPv4** (np. `89.117.45.123`).

### 1.2. Wejdz w panel SEOHost
1. Zaloguj sie na seohost.pl
2. Przejdz do **Moje uslugi → Domeny → autanasprzedaz.com**
3. Znajdz **Strefa DNS** lub **Zarzadzanie DNS**
4. Usun istniejace rekordy A/CNAME wskazujace gdzie indziej
5. Dodaj **dwa rekordy A**:

   | Typ | Nazwa | Wartosc | TTL |
   |-----|-------|---------|-----|
   | A   | @     | <IP_VPS_HOSTINGER> | 3600 |
   | A   | www   | <IP_VPS_HOSTINGER> | 3600 |

6. Zapisz. Propagacja DNS zajmuje 15 min – 4h (typowo 30 min).

### 1.3. Sprawdz propagacje
Po ~15 minutach z PowerShell:
```bash
nslookup autanasprzedaz.com
nslookup www.autanasprzedaz.com
```
Powinno zwrocic IP VPS-a. Mozesz tez sprawdzic na https://dnschecker.org

---

## KROK 2 — VPS: przygotowanie

### 2.1. Polacz sie z VPS przez SSH
W panelu Hostinger znajdz **Hasło root** lub klucz SSH. Zaloguj sie:
```bash
ssh root@<IP_VPS_HOSTINGER>
```

### 2.2. Stworz dedykowanego usera (jezeli jeszcze nie masz)
Lepiej nie deployowac jako root.
```bash
# tylko jezeli logujesz sie jako root
adduser deploy
usermod -aG docker deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

Wyloguj sie i zaloguj jako `deploy`:
```bash
ssh deploy@<IP_VPS_HOSTINGER>
```

### 2.3. Sprawdz Docker + Traefik
```bash
docker --version
docker compose version
docker network ls   # powinna byc siec o nazwie 'traefik'
```

**Jezeli sieci `traefik` nie ma** (znaczy ze Twoj Traefik moze uzywac innej):
```bash
# znajdz nazwe sieci Twojego Traefika
docker inspect traefik --format='{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{"\n"}}{{end}}'
```
Jezeli nazwa jest inna niz `traefik` — w `docker-compose.yml` zmien `traefik` na faktyczna nazwe (3 miejsca).

### 2.4. Sprawdz Traefik resolver dla Let's Encrypt
W konfiguracji Twojego Traefika musi byc skonfigurowany cert resolver o nazwie **`letsencrypt`**.
Sprawdz plik konfiguracyjny Traefika (zwykle `/opt/traefik/traefik.yml`):
```bash
sudo cat /opt/traefik/traefik.yml
# albo gdzie indziej:
docker inspect traefik | grep -A 20 Mounts
```
Powinno byc cos takiego:
```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      email: twoj@email.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web
```
**Jezeli cert resolver nazywa sie inaczej (np. `myresolver`)** — w `docker-compose.yml` zmien `letsencrypt` na faktyczna nazwe.

---

## KROK 3 — VPS: klonowanie repo i pierwszy deploy

### 3.1. Klonuj repo
```bash
mkdir -p ~/apps
cd ~/apps
git clone https://github.com/digarchitekt/auta-na-sprzeda-.git autanasprzedaz
cd autanasprzedaz
```

### 3.2. Skonfiguruj `.env`
```bash
cp .env.example .env
nano .env
```
Wypelnij minimum:
```
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_SITE_URL=https://autanasprzedaz.com

# SMTP do wysylki formularzy (mozesz dodac pozniej)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
MAIL_FROM=
MAIL_TO=
```
Zapisz: `Ctrl+O`, `Enter`, `Ctrl+X`.

### 3.3. Pierwszy build
```bash
docker compose up -d --build
```
Pierwszy build ~3-5 minut (instalacja deps + build Next).

### 3.4. Sprawdz logi
```bash
docker compose logs -f
# Ctrl+C zeby wyjsc
```
Powinno byc cos w stylu `Ready in Xms`.

### 3.5. Sprawdz w przegladarce
Po propagacji DNS i pierwszym certyfikacie SSL (~30 sekund po pierwszym requeście):
- https://autanasprzedaz.com → powinna sie zaladowac strona
- https://www.autanasprzedaz.com → powinno przekierowac na bez www

**Jezeli pojawia sie blad SSL "ERR_CERT_AUTHORITY_INVALID"** — poczekaj 30 sek i odswiez. Traefik wlasnie generuje certyfikat z Let's Encrypt.

---

## KROK 4 — GitHub Actions: auto-deploy

Teraz konfigurujemy zeby kazdy `git push` do main automatycznie deployowal.

### 4.1. Wygeneruj klucz SSH dla GitHub Actions
**Na Twoim komputerze** (Windows PowerShell lub Git Bash):
```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/autanasprzedaz_deploy -N ""
```
Powstana 2 pliki:
- `~/.ssh/autanasprzedaz_deploy` (private — pojdzie do GitHub Secrets)
- `~/.ssh/autanasprzedaz_deploy.pub` (public — pojdzie na VPS)

### 4.2. Dodaj public key na VPS
**Skopiuj zawartosc `.pub`:**
```bash
cat ~/.ssh/autanasprzedaz_deploy.pub
```
Zaloguj sie na VPS jako `deploy` i dodaj klucz:
```bash
ssh deploy@<IP_VPS>
echo "<wklej_zawartosc_pub_tutaj>" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 4.3. Dodaj sekrety w GitHub
Wejdz na: https://github.com/digarchitekt/auta-na-sprzeda-/settings/secrets/actions

Kliknij **New repository secret** i dodaj 4 sekrety:

| Nazwa | Wartosc |
|-------|---------|
| `VPS_HOST` | IP VPS-a (np. `89.117.45.123`) |
| `VPS_USER` | `deploy` |
| `VPS_PORT` | `22` (lub Twoj custom) |
| `VPS_SSH_KEY` | **Cala zawartosc** pliku `~/.ssh/autanasprzedaz_deploy` (private key, lacznie z liniami `-----BEGIN/END-----`) |

Pokaz private key:
```bash
cat ~/.ssh/autanasprzedaz_deploy
```

### 4.4. Test workflow
Workflow `.github/workflows/deploy.yml` jest juz w repo. Po dodaniu sekretow:
- Zrob jakas zmiane w kodzie (np. zmien tekst)
- `git push`
- Wejdz na https://github.com/digarchitekt/auta-na-sprzeda-/actions
- Zobacz jak workflow `Deploy to VPS` sie uruchamia

Mozesz tez recznie odpalic: **Actions → Deploy to VPS → Run workflow**.

---

## KROK 5 — workflow codzienny

Od teraz Twoj flow to po prostu:

```bash
# lokalnie
cd "C:/1 ARTIFICAL INTELLIGENCE/1-Claude Code/autanasprzedaz"
# robisz zmiany w kodzie...
git add .
git commit -m "opis zmian"
git push
# w 60 sek strona jest zaktualizowana na produkcji
```

GitHub Actions:
1. Loguje sie SSH na VPS
2. Robi `git pull`
3. Buduje obraz Docker na nowo
4. Restartuje kontener
5. Czysci stare obrazy

---

## TROUBLESHOOTING

### Strona nie laduje sie po DNS
```bash
# na VPS
docker compose logs autanasprzedaz
docker compose ps
docker logs traefik 2>&1 | grep autanasprzedaz
```

### Certyfikat SSL nie generuje sie
- Sprawdz czy port 80 jest otwarty (Let's Encrypt potrzebuje go do challenge)
- Sprawdz logi Traefika: `docker logs traefik 2>&1 | grep -i acme`
- Sprawdz czy DNS faktycznie wskazuje na VPS: `nslookup autanasprzedaz.com`

### "network traefik not found"
W `docker-compose.yml` na koncu zmien:
```yaml
networks:
  traefik:
    external: true
    name: <faktyczna_nazwa_sieci>  # dodaj te linie
```

### Build dziala lokalnie ale failuje w Docker
- Sprawdz czy `.env.local` jest tylko lokalnie a `.env` na VPS
- Sprawdz logi: `docker compose logs --tail=100 autanasprzedaz`

### Auto-deploy nie startuje
- GitHub → Actions → ostatni run → klikaj w jobs zeby zobaczyc error
- Najczestszy problem: zly format `VPS_SSH_KEY` (musi byc CALY plik z `-----BEGIN OPENSSH PRIVATE KEY-----` do `-----END OPENSSH PRIVATE KEY-----`)

---

## OPCJONALNE — basic auth (zanim wyslesz koledze/bratu)

Jezeli na samym poczatku NIE chcesz zeby strona byla dostepna publicznie (np. dopoki nie skonczysz):

**Wlacz przez `NEXT_PUBLIC_ENV=staging`** w `.env` na VPS:
```bash
ssh deploy@<IP_VPS>
cd ~/apps/autanasprzedaz
nano .env
# zmien:
NEXT_PUBLIC_ENV=staging
# zapisz, restart:
docker compose up -d --build
```
Wtedy `robots.txt` blokuje crawlery (Google nie zaindeksuje), a meta-tagi maja `noindex,nofollow`. Strona jest "ukryta" przed wyszukiwarkami, ale dostepna pod URL-em dla kazdego kto zna link.

**Albo prawdziwy basic auth przez Traefik** — daj znac to dodam middleware.

---

## TL;DR — co masz do zrobienia (raz)

1. **DNS w SEOHost** — 2 rekordy A na IP VPS-a (5 min)
2. **VPS** — `git clone`, `cp .env.example .env`, `docker compose up -d --build` (10 min)
3. **GitHub Secrets** — wgrac 4 sekrety SSH (5 min)
4. Push do main → strona aktualizuje sie sama na produkcji

Po tym setupie **nie wracasz do VPS-a** — wszystko leci przez `git push`.

Gdyby cos sie wywalilo na ktoryms kroku — kopiujesz error i mowisz mi co sie stalo.
