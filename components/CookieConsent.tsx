'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Cookie consent banner zgodny z RODO oraz polskim Prawem komunikacji
 * elektronicznej (PKE) / art. 173-174 Prawa telekomunikacyjnego.
 *
 * Wymogi które spełnia:
 *  - symetria wyboru: "Akceptuj wszystkie" i "Odrzuc wszystkie" tej samej wagi
 *  - granularnosc: oddzielne zgody dla funkcjonalnych, analitycznych, marketingowych
 *  - aktywna zgoda: zadne pole nie jest domyslnie zaznaczone (poza niezbednymi)
 *  - mozliwosc wycofania: przycisk "Ustawienia cookies" w stopce / globalny event
 *  - transparentnosc: link do Polityki cookies i Polityki prywatnosci
 *  - wersjonowanie: zapis wraz z wersja zgody i timestamp
 */

type ConsentCategories = {
  necessary: true; // zawsze true - art. 173 ust. 3 PT
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

type ConsentRecord = {
  version: number;
  timestamp: string;
  categories: ConsentCategories;
};

const CONSENT_VERSION = 1;
const STORAGE_KEY = 'ans-cookie-consent';
export const CONSENT_EVENT = 'ans-cookie-consent-change';
export const OPEN_PREFERENCES_EVENT = 'ans-open-cookie-preferences';

const defaultCategories: ConsentCategories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(categories: ConsentCategories) {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    window.dispatchEvent(
      new CustomEvent(CONSENT_EVENT, { detail: record }),
    );
  } catch {
    // localStorage moze byc niedostepne (np. tryb prywatny)
  }
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [categories, setCategories] = useState<ConsentCategories>(defaultCategories);

  useEffect(() => {
    setMounted(true);
    const existing = readConsent();
    if (!existing) {
      setOpen(true);
    } else {
      setCategories(existing.categories);
    }

    const handleOpen = () => {
      const current = readConsent();
      if (current) setCategories(current.categories);
      setShowPrefs(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handleOpen);
  }, []);

  if (!mounted || !open) return null;

  const acceptAll = () => {
    const all: ConsentCategories = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    writeConsent(all);
    setCategories(all);
    setOpen(false);
    setShowPrefs(false);
  };

  const rejectAll = () => {
    const minimal: ConsentCategories = { ...defaultCategories };
    writeConsent(minimal);
    setCategories(minimal);
    setOpen(false);
    setShowPrefs(false);
  };

  const saveSelection = () => {
    writeConsent(categories);
    setOpen(false);
    setShowPrefs(false);
  };

  const toggle = (key: keyof Omit<ConsentCategories, 'necessary'>) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[150] flex justify-center px-3 pb-3 sm:px-6 sm:pb-6"
    >
      <div className="w-full max-w-3xl border border-bg-border bg-bg-elevated shadow-2xl">
        {/* Glowna sekcja banera */}
        {!showPrefs && (
          <div className="p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Zm-3 8a1 1 0 1 1-1 1 1 1 0 0 1 1-1Zm0 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1Zm5 1a1 1 0 1 1-1 1 1 1 0 0 1 1-1Zm2-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
                </svg>
              </span>
              <div className="min-w-0">
                <h2
                  id="cookie-banner-title"
                  className="font-display text-lg uppercase tracking-wide text-text-primary sm:text-xl"
                >
                  Pliki cookies
                </h2>
                <p
                  id="cookie-banner-desc"
                  className="mt-2 text-sm leading-relaxed text-text-secondary"
                >
                  Korzystamy z plików cookies, aby strona działała poprawnie,
                  analizować ruch i ulepszać nasze usługi. Niezbędne cookies są
                  wymagane do działania serwisu (art. 173 ust. 3 Prawa
                  telekomunikacyjnego). Pozostałe kategorie wymagają Twojej
                  dobrowolnej, świadomej zgody (RODO + Prawo komunikacji
                  elektronicznej). Zgodę możesz wycofać w każdej chwili.
                </p>
                <p className="mt-2 text-xs text-text-muted">
                  Szczegóły:{' '}
                  <Link
                    href="/polityka-cookies"
                    className="text-accent hover:underline"
                  >
                    Polityka cookies
                  </Link>
                  {' · '}
                  <Link
                    href="/polityka-prywatnosci"
                    className="text-accent hover:underline"
                  >
                    Polityka prywatności
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={rejectAll}
                className="border border-bg-border bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary transition hover:border-text-primary"
              >
                Odrzuć wszystkie
              </button>
              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                className="border border-bg-border bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary transition hover:border-text-primary"
              >
                Dostosuj
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="border border-accent bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:opacity-90"
              >
                Akceptuj wszystkie
              </button>
            </div>
          </div>
        )}

        {/* Panel preferencji */}
        {showPrefs && (
          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg uppercase tracking-wide text-text-primary sm:text-xl">
                  Preferencje cookies
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Wybierz kategorie, na które wyrażasz zgodę. Możesz w każdej
                  chwili zmienić te ustawienia.
                </p>
              </div>
            </div>

            <ul className="mt-5 divide-y divide-bg-border border border-bg-border">
              <CategoryRow
                title="Niezbędne"
                description="Zapewniają podstawowe funkcjonowanie serwisu (sesja, bezpieczeństwo, formularze). Nie wymagają zgody - art. 173 ust. 3 Prawa telekomunikacyjnego."
                checked
                disabled
              />
              <CategoryRow
                title="Funkcjonalne"
                description="Zapamiętują Twoje wybory (np. ostatnio przeglądane auta) aby ułatwić korzystanie z serwisu."
                checked={categories.functional}
                onChange={() => toggle('functional')}
              />
              <CategoryRow
                title="Analityczne / statystyczne"
                description="Pomagają zrozumieć w jaki sposób korzystasz z serwisu (najczęściej odwiedzane sekcje, czas pobytu). Dane są anonimowe i zbiorcze."
                checked={categories.analytics}
                onChange={() => toggle('analytics')}
              />
              <CategoryRow
                title="Marketingowe"
                description="Wykorzystywane do personalizacji reklam i mierzenia ich skuteczności na zewnętrznych platformach. Aktualnie nie używamy tego typu plików, ale możemy w przyszłości."
                checked={categories.marketing}
                onChange={() => toggle('marketing')}
              />
            </ul>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={rejectAll}
                className="border border-bg-border bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary transition hover:border-text-primary"
              >
                Odrzuć wszystkie
              </button>
              <button
                type="button"
                onClick={saveSelection}
                className="border border-bg-border bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary transition hover:border-text-primary"
              >
                Zapisz wybór
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="border border-accent bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:opacity-90"
              >
                Akceptuj wszystkie
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-wide text-text-primary">
          {title}
          {disabled && (
            <span className="ml-2 text-[10px] font-normal normal-case tracking-normal text-text-muted">
              (zawsze aktywne)
            </span>
          )}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary">{description}</p>
      </div>
      <label
        className={`relative inline-flex h-6 w-11 shrink-0 items-center ${
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-bg-border transition peer-checked:bg-accent" />
        <span className="absolute left-0.5 inline-block h-5 w-5 translate-x-0 rounded-full bg-white transition peer-checked:translate-x-5" />
      </label>
    </li>
  );
}

/** Helper: trigger ponownego otwarcia preferencji (np. z linku w stopce) */
export function openCookiePreferences() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
