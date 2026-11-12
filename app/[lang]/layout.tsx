import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Jost, Vazirmatn } from "next/font/google";
import "../globals.css";
import { getDir, hasLocale, locales } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jost",
  display: "swap",
});

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-vazir",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      languages: { en: "/en", fa: "/fa" },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={getDir(lang)}
      className={`${cormorant.variable} ${jost.variable} ${vazir.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}