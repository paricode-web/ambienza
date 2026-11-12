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

const copy: Record<
  Locale,
  {
    welcome: string;
    statement: string;
    tasteEyebrow: string;
    tasteTitle: string;
    tasteText: string;
    designEyebrow: string;
    designTitle: string;
    designText: string;
  }
> = {
  en: {
    welcome: "Welcome to Ambienza",
    statement: "Where Taste Meets Atmosphere",
    tasteEyebrow: "The Space",
    tasteTitle: "Where design, comfort and character come together",
    tasteText:
      "Warm light, natural materials and quiet corners. A room made for long dinners and slow conversations.",
    designEyebrow: "The Kitchen",
    designTitle: "Dishes made with care",
    designText:
      "Fresh ingredients, balanced flavors and a menu that changes with the season. Every plate is made to be shared and remembered.",
  },
  fa: {
    welcome: "به آمبینزا خوش آمدید",
    statement: "جایی که طعم به فضا می‌رسد",
    tasteEyebrow: "فضا",
    tasteTitle: "جایی که طراحی، آسایش و شخصیت کنار هم می‌آیند",
    tasteText:
      "نور گرم، متریال طبیعی و گوشه‌های آرام. فضایی برای شام‌های طولانی و گفت‌وگوهای بی‌عجله.",
    designEyebrow: "آشپزخانه",
    designTitle: "غذاهایی که با دقت ساخته می‌شوند",
    designText:
      "مواد اولیهٔ تازه، طعم‌های متعادل و منویی که با فصل تغییر می‌کند. هر بشقاب برای تقسیم شدن و به یاد ماندن ساخته شده است.",
  },
};

// Each section's color runs the full width of the screen.
// Inside it, one centered column on phones and tablets (560 wide),
// and a two-column row on desktop (1200 and up).
// On phones the 4px gap shows sand between the photo and the text.
const INNER =
  "mx-auto grid w-full max-w-[560px] grid-cols-1 gap-1 bg-sand " +
  "desktop:max-w-[1440px] desktop:grid-cols-2 desktop:items-center desktop:gap-24 desktop:bg-transparent desktop:px-16 desktop:py-28";

// Text block: its own color on phones, transparent on desktop (the section carries the color)
const PANEL =
  "flex flex-col justify-center px-6 py-16 desktop:px-0 desktop:py-0";

// Photo shapes: square on phones, a calm portrait on desktop (never stretched wide)
const PHOTO_SIZES = "(min-width: 1200px) 608px, (min-width: 560px) 560px, 100vw";

export function Flow({ t, lang, images }: Props) {
  const c = copy[lang];

  return (
    // bg-sand shows through the 4px gaps, so sand draws the lines between sections
    <div className="my-1 flex w-full flex-col gap-1 bg-sand">
      {/* TEXT 1: statement (cream, one big line) */}
      <section className="bg-cream px-6 py-24 text-center text-espresso desktop:py-48">
        <Reveal className="mx-auto max-w-[1100px]">
          <Eyebrow className="text-moss">{c.welcome}</Eyebrow>
          <p className="mt-8 font-display text-[40px] font-light leading-[1.08] desktop:mt-10 desktop:text-[96px] rtl:leading-[1.5]">
            {c.statement}
          </p>
          <span aria-hidden className="mx-auto mt-12 block h-px w-16 bg-copper" />
        </Reveal>
      </section>

      {/* PHOTO 1 + TEXT 2: kitchen (moss). Desktop: photo on the start side, text on the end side */}
      <section data-anchor="menu" className="bg-moss text-cream">
        <div className={INNER}>
          <Photo
           src="/images/red.jpg"
            alt={images.salmon.alt[lang]}
            sizes={PHOTO_SIZES}
            className="aspect-square desktop:aspect-[4/5]"
          />
          <div className={`${PANEL} bg-moss`}>
            <Reveal className="desktop:max-w-[520px]">
              <Eyebrow className="text-sand">{c.tasteEyebrow}</Eyebrow>
              <h3 className="mt-8 font-display !text-[34px] font-light leading-[1.1] desktop:!text-[56px] rtl:leading-[1.5]">
                {c.tasteTitle}
              </h3>
              <span aria-hidden className="mt-10 block h-px w-16 bg-sand" />
              <p className="mt-8 max-w-[44ch] text-[15px] leading-[1.9] text-cream/80 desktop:text-lg">
                {c.tasteText}
              </p>
              <div className="mt-10">
                <ButtonLink href="#menu" variant="light">
                  {t.hero.viewMenu}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PHOTO 2 + TEXT 3: space (espresso). Desktop: text on the start side, photo on the end side */}
   <section data-anchor="atmosphere" className="bg-espresso text-cream">
  {/* موبایل و تبلت: عکس چپ | خط کرم | متن راست */}
  <div className="flex items-stretch px-6 py-16 desktop:hidden" dir="ltr">
    <Photo
      src="/images/fork.jpg"
      alt={images.room3.alt[lang]}
      sizes="45vw"
      className="aspect-[4/5] w-[45%] shrink-0 self-center bg-espresso"
      imageClassName="object-contain"
    />

    {/* خط جداکننده ساده کرم */}
    <span aria-hidden className="mx-5 w-px shrink-0 self-stretch bg-cream/70 sm:mx-8" />

    <div
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="flex min-w-0 flex-1 flex-col justify-center"
    >
      <Reveal>
        <Eyebrow className="text-sand">{c.designEyebrow}</Eyebrow>
        <h3 className="mt-5 font-display !text-[26px] font-light leading-[1.15] sm:!text-[34px] rtl:leading-[1.5]">
          {c.designTitle}
        </h3>
        <span aria-hidden className="mt-6 block h-px w-12 bg-sand" />
        <p className="mt-5 text-[14px] leading-[1.8] text-cream/80 sm:text-[15px]">
          {c.designText}
        </p>
      </Reveal>
    </div>
  </div>

  {/* دسکتاپ: دقیقاً همان قبلی */}
  <div className={`${INNER} hidden desktop:grid`}>
    <Photo
      src="/images/fork.jpg"
      alt={images.room3.alt[lang]}
      sizes={PHOTO_SIZES}
      className="aspect-square bg-espresso desktop:order-2 desktop:aspect-[4/5]"
      imageClassName="object-contain"
    />
    <div className={`${PANEL} bg-espresso desktop:order-1`}>
      <Reveal className="desktop:max-w-[520px]">
        <Eyebrow className="text-sand">{c.designEyebrow}</Eyebrow>
        <h3 className="mt-8 font-display !text-[34px] font-light leading-[1.1] desktop:!text-[56px] rtl:leading-[1.5]">
          {c.designTitle}
        </h3>
        <span aria-hidden className="mt-10 block h-px w-16 bg-sand" />
        <p className="mt-8 max-w-[44ch] text-[15px] leading-[1.9] text-cream/80 desktop:text-lg">
          {c.designText}
        </p>
      </Reveal>
    </div>
  </div>
</section>

      {/* PHOTO 3 + TEXT 4: about (cream). Desktop: photo on the start side, text on the end side */}
      <section data-anchor="about" className="bg-cream text-espresso">
        <div className={INNER}>
          <Photo
            src="/images/room-3.jpg"
            alt={images.room4.alt[lang]}
            sizes={PHOTO_SIZES}
            className="aspect-[4/5]"
          />
          <div
            className={`${PANEL} bg-cream !py-24 desktop:!py-0`}
          >
            <Reveal className="desktop:max-w-[520px]">
              <Eyebrow className="text-moss">{t.about.eyebrow}</Eyebrow>
              <h3 className="mt-8 font-display !text-[40px] font-light leading-[1.08] desktop:!text-[64px] rtl:leading-[1.5]">
                {t.about.title}
              </h3>
              <span aria-hidden className="mt-12 block h-px w-16 bg-copper" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reserve (espresso, full width) */}
      <section
        data-anchor="reserve"
        className="bg-espresso px-6 py-20 desktop:py-32"
      >
        <div className="mx-auto flex max-w-[560px] flex-col gap-4 desktop:max-w-[720px] desktop:flex-row desktop:justify-center desktop:gap-5">
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
