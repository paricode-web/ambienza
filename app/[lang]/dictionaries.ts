import type { Locale } from "@/lib/i18n";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  fa: () => import("@/dictionaries/fa.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;