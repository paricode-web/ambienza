import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { photos } from "@/lib/photos";
import { getDictionary } from "./dictionaries";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/sections/Hero";
import { Flow } from "../components/sections/Flow";
import { DesktopFlow } from "../components/sections/DesktopFlow";
import { Footer } from "../components/sections/Footer";
import { AnchorScroll } from "../components/ui/AnchorScroll"; 

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <main>
      <AnchorScroll />

      <Navbar
        lang={lang}
        links={[
          { label: t.nav.about, href: "#about" },
          { label: t.nav.menu, href: "#menu" },
          { label: t.nav.atmosphere, href: "#atmosphere" },
          { label: t.nav.reserve, href: "#reserve" },
        ]}
        switchLabel={t.lang.switchTo}
        openLabel={t.nav.open}
        closeLabel={t.nav.close}
      />

      <Hero
        {...t.hero}
        photo={photos.hero.src}
        gallery={[
          photos.room1.src,
          photos.signature.src,
          photos.room2.src,
          photos.fish.src,
          photos.rolls.src,
          photos.room3.src,
          photos.cake.src,
          photos.texture.src,
          photos.heat.src,
        ]}
      />

      {/* Mobile and tablet */}
      <Flow
        t={t}
        lang={lang}
        images={{
          room4: photos.room1,
          dish2: photos.fish,
          salmon: photos.signature,
          roll: photos.rolls,
          room3: photos.room3,
        }}
      />

      {/* Desktop (1200 and up) */}
      <DesktopFlow
        t={t}
        lang={lang}
        images={{ split: photos.signature, full: photos.light }}
      />

      <Footer t={t.footer} lang={lang} switchLabel={t.lang.switchTo} />
    </main>
  );
}
