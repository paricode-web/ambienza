import { Reveal } from "../ui/Reveal";
import { Photo } from "../ui/photo";
import { ButtonLink } from "../ui/Buttons";
import { Eyebrow } from "@/app/components/ui/typography";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// alt text is stored per language in lib/photos
type Img = { src: string; alt: Record<Locale, string> };

type Props = {
  t: Dictionary;
  lang: Locale;
  images: { room4: Img; dish2: Img; salmon: Img; roll: Img; room3: Img };
};

type LineProps = {
  n: string;
  eyebrow: string;
  name: string;
  price: string;
  description: string;
};

// One menu entry: number, tag, name ········ price, then a short description
function MenuLine({ n, eyebrow, name, price, description }: LineProps) {
  return (
    <Reveal>
      <div className="flex items-center gap-3">
        <span className="label text-sand">{n}</span>
        <span aria-hidden className="h-px w-10 bg-sand/50" />
        <Eyebrow className="text-sand">{eyebrow}</Eyebrow>
      </div>

      <div className="mt-8 flex items-end gap-3">
        <h3 className="font-display !text-[30px] font-normal leading-[1.1] md:!text-[40px] rtl:leading-[1.4]">
          {name}
        </h3>
        <span
          aria-hidden
          className="mb-2 min-w-6 flex-1 border-b border-dashed border-sand/60"
        />
        <span className="price mb-0.5 text-2xl !text-sand md:text-3xl">
          {price}
        </span>
      </div>

      <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.8] text-cream/80 md:text-base">
        {description}
      </p>
    </Reveal>
  );
}

// Menu text panel
const PANEL =
  "flex flex-col justify-center px-6 py-16 md:px-12 md:py-24 desktop:px-24";

// Mobile and tablet only. Desktop uses DesktopFlow.
// Sections are found by data-anchor (see AnchorScroll), so there are no ids here.
export function Flow({ t, lang, images }: Props) {
  const fmt = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-US");
  const roll = t.menu.items[1];

  // "01", "02"... in the right digits for the language
  const num = (i: number) => `${fmt.format(0)}${fmt.format(i)}`;

  return (
    // bg-sand shows through the 4px gaps, so sand draws the lines between blocks
    <div className="my-1 flex flex-col gap-1 bg-sand desktop:hidden">
      {/* 1. Statement: one big sentence on cream */}
      <section className="bg-cream px-6 py-24 text-center text-espresso md:py-32">
        <Reveal className="mx-auto max-w-[980px]">
          <Eyebrow className="text-moss">{t.craft.eyebrow}</Eyebrow>
          <p className="mt-8 font-display text-[40px] font-light leading-[1.08] md:text-[64px] rtl:leading-[1.5]">
            {t.craft.title}
          </p>
          <span aria-hidden className="mx-auto mt-12 block h-px w-16 bg-copper" />
        </Reveal>
      </section>

      {/* 2. Atmosphere: two clear photos, stacked on mobile, side by side on tablet */}
      <section data-anchor="atmosphere" className="grid gap-1 md:grid-cols-2">
        <Photo
          src={images.room4.src}
          alt={images.room4.alt[lang]}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[4/5]"
        />
        <Photo
          src="/images/cro.jpg"
          alt={images.dish2.alt[lang]}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[4/5]"
        />
      </section>

      {/* 3. Menu: two entries. Text first on mobile; photo and text swap sides on tablet */}
      <section data-anchor="menu" className="flex flex-col gap-1">
        <div className="grid gap-1 text-cream md:grid-cols-2">
          <div className={`${PANEL} bg-moss md:order-2`}>
            <MenuLine
              n={num(1)}
              eyebrow={t.signature.eyebrow}
              name={t.signature.name}
              price={fmt.format(t.signature.price)}
              description={t.signature.description}
            />
          </div>
          <Photo
            src={images.salmon.src}
            alt={images.salmon.alt[lang]}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-square md:order-1 md:aspect-auto md:min-h-[640px]"
          />
        </div>

        <div className="grid gap-1 text-cream md:grid-cols-2">
          <div className={`${PANEL} bg-espresso md:order-1`}>
            <MenuLine
              n={num(2)}
              eyebrow={t.menu.eyebrow}
              name={roll.name}
              price={fmt.format(roll.price)}
              description={roll.description}
            />
          </div>
          <Photo
            src="/images/pineapple.jpg"
            alt={images.roll.alt[lang]}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/5] md:order-2 md:aspect-auto md:min-h-[640px]"
          />
        </div>
      </section>

      {/* 4. About: photo, then a big title on cream */}
      <section data-anchor="about" className="grid gap-1 md:grid-cols-2">
        <Photo
          src={images.room3.src}
          alt={images.room3.alt[lang]}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[4/5] md:aspect-auto md:min-h-[640px]"
        />
        <div className="flex flex-col justify-center bg-cream px-6 py-24 text-espresso md:px-12">
          <Reveal>
            <Eyebrow className="text-moss">{t.about.eyebrow}</Eyebrow>
            <h3 className="mt-8 font-display !text-[40px] font-light leading-[1.08] md:!text-[52px] rtl:leading-[1.5]">
              {t.about.title}
            </h3>
            <span aria-hidden className="mt-12 block h-px w-16 bg-copper" />
          </Reveal>
        </div>
      </section>

      {/* 5. Reserve */}
      <section data-anchor="reserve" className="bg-espresso px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-[560px] flex-col gap-4 md:flex-row md:justify-center">
          <ButtonLink href="#menu" variant="light">
            {t.hero.viewMenu}
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline-light">
            {t.hero.reserve}
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
