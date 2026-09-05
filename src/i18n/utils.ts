import en from './en.json';
import ar from './ar.json';

export const locales = ['en', 'ar'] as const;
export type Locale = typeof locales[number];

const dictionaries = { en, ar } as const;
export type Dictionary = typeof en;

export function useTranslations(locale: string | undefined): Dictionary {
  const key = (locale ?? 'en') as Locale;
  return dictionaries[key] ?? dictionaries.en;
}

export function getDirection(locale: string | undefined): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function getOppositeLocale(locale: string | undefined): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}

export function localePath(locale: string | undefined, path: string = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'ar') return `/ar${clean === '/' ? '' : clean}`;
  return clean;
}

/**
 * Route prefixes that exist in English only, with no /ar counterpart.
 * Keep in sync with src/pages. The language switcher and the hreflang tags
 * both derive from this, so listing a prefix here covers both at once.
 */
export const EN_ONLY_PREFIXES = ['/blog'] as const;

/** Strip a leading /ar and any trailing slash so both locales compare equal. */
function toBasePath(path: string): string {
  const stripped = path.replace(/^\/ar(?=\/|$)/, '');
  const clean = stripped.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

/** Whether this route has a counterpart in the other locale. */
export function hasTranslation(path: string): boolean {
  const base = toBasePath(path);
  return !EN_ONLY_PREFIXES.some((p) => base === p || base.startsWith(`${p}/`));
}

/**
 * Where the language switcher should point from `path`.
 * Routes with no counterpart fall back to the target locale's home page,
 * rather than linking to a URL that was never built.
 */
export function switchLocalePath(locale: string | undefined, path: string): string {
  const target = getOppositeLocale(locale);
  if (!hasTranslation(path)) return target === 'ar' ? '/ar/' : '/';
  if (target === 'ar') return path === '/' ? '/ar/' : `/ar${path}`;
  const stripped = path.replace(/^\/ar(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}
