import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { ScrollTint } from "../ui/ScrollTint"; 
import { Eyebrow } from "@/app/components/ui/typography";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

// alt text is stored per language in lib/photos
type Img = { src: string; alt: Record<Locale, string> };

type Props = {
  t: Dictionary;
  lang: Locale;
  images: { split: Img; full: Img };
  /**
   * Shape of the full-width photo in the pinned section (width / height).
   * Taller means more scrolling while the text stays pinned.
   */
  fullRatio?: string;
};

// Desktop only (1200 and up). Mobile and tablet use Flow.
// All the text here is placeholder copy from the dictionary until we write the real lines.
export function DesktopFlow({ t, lang, images, fullRatio = "3 / 4" }: Props) {
  const fmt = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-US");

  return (
    <div className="hidden desktop:block">
      <ScrollTint>
        {/* 1. Espresso page with one big line in the middle */}
        <section
          data-anchor="about"
          className="flex min-h-svh flex-col items-center justify-center px-24 text-center text-cream"
        >
          <Reveal className="mx-auto max-w-[1100px]">
            <Eyebrow className="text-sand">{t.craft.eyebrow}</Eyebrow>
            <p className="mt-10 font-display text-[96px] font-light leading-[1.05] rtl:leading-[1.5]">
              {t.craft.title}
            </p>
          </Reveal>
        </section>

        {/* 2. The background eases to moss here: text on one side, a portrait photo on the other */}
        <section
          data-anchor="menu"
          data-tint-trigger
          className="mx-auto grid min-h-svh max-w-[1440px] grid-cols-2 items-center gap-24 px-24 py-24 text-cream"
        >
          <Reveal>
            <Eyebrow className="text-sand">{t.signature.eyebrow}</Eyebrow>
            <h2 className="mt-8 font-display !text-[64px] font-light leading-[1.05] rtl:leading-[1.4]">
              {t.signature.name}
            </h2>
            <span aria-hidden className="mt-10 block h-px w-16 bg-sand/60" />
            <p className="mt-10 max-w-[40ch] text-lg leading-[1.8] text-cream/85">
              {t.signature.description}
            </p>
            <p className="price mt-10 text-4xl !text-sand">
              {fmt.format(t.signature.price)}
            </p>
          </Reveal>

          {/* Portrait photo shown at its own shape, never stretched */}
          <div className="relative aspect-[624/938] h-[86svh] max-h-[900px] justify-self-end">
            <Image
              src="/images/coffee.jpg"
              alt={images.split.alt[lang]}
              fill
              sizes="(min-width: 1200px) 40vw, 0px"
              className="object-cover"
            />
          </div>
        </section>

        {/* 3. A tall photo scrolls past while the text stays pinned in the middle */}
      <section
  data-anchor="atmosphere"
  className="relative min-h-svh w-full"
>
  {/* Half-width image */}
  <div className="absolute inset-y-0 right-0 w-1/2">
    <Image
      src="/images/salmon.jpg"
      alt={images.full.alt[lang]}
      fill
      sizes="50vw"
      quality={100}
      className="object-cover"
    />
  </div>

  <div className="sticky top-0 z-10 flex min-h-svh items-center justify-center px-24 text-center text-cream [text-shadow:0_2px_28px_rgb(65_33_24/0.6)]">
    <Reveal className="mx-auto max-w-[960px]">
      <Eyebrow className="text-sand">{t.about.eyebrow}</Eyebrow>
      <h2 className="mt-8 font-display !text-[80px] font-light leading-[1.05] rtl:leading-[1.4]">
        {t.about.title}
      </h2>
    </Reveal>
  </div>
</section>
      </ScrollTint>
    </div>
  );
}
