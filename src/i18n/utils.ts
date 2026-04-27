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
