// Lingue dell'interfaccia. La lingua sta nell'indirizzo (/it/..., /en/...),
// così ogni pagina si può preparare in anticipo per entrambe.

export const LOCALES = ["it", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "it";
export const LOCALE_COOKIE = "ditto_lingua";

export const hasLocale = (value: string | undefined): value is Locale =>
  (LOCALES as readonly string[]).includes(value ?? "");

// Lingua da usare quando l'indirizzo non la indica:
// prima la scelta salvata, poi le preferenze del browser, infine l'italiano.
export function pickLocale(
  savedChoice: string | undefined,
  acceptLanguage: string | null,
): Locale {
  if (hasLocale(savedChoice)) return savedChoice;
  const preferred = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((x, y) => y.q - x.q)
    .find((entry) => hasLocale(entry.lang));
  return (preferred?.lang as Locale | undefined) ?? DEFAULT_LOCALE;
}

// Restituisce la lingua all'inizio di un percorso, se c'è.
export function localeFromPath(pathname: string): Locale | undefined {
  const first = pathname.split("/")[1];
  return hasLocale(first) ? first : undefined;
}

// Percorso interno sicuro dove mandare l'utente dopo il link di accesso:
// solo indirizzi dell'app con una lingua, mai siti esterni.
export function safeNextPath(next: string | null, fallback: string): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return localeFromPath(next) ? next : fallback;
}
