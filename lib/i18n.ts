export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDir(locale: Locale) {
  return locale === "fa" ? "rtl" : "ltr";
}