'use client';

import { openCookiePreferences } from './CookieConsent';

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="text-left hover:text-accent"
    >
      Ustawienia cookies
    </button>
  );
}
