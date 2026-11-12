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
    tasteEyebrow: "The Kitchen",
    tasteTitle: "Dishes made with care",
    tasteText:
      "Fresh ingredients, balanced flavors and a menu that changes with the season. Every plate is made to be shared and remembered.",
    designEyebrow: "The Space",
    designTitle: "Where design, comfort and character come together",
    designText:
      "Warm light, natural materials and quiet corners. A room made for long dinners and slow conversations.",
  },
  fa: {
    welcome: "به آمبینزا خوش آمدید",
    statement: "جایی که طعم به فضا می‌رسد",
    tasteEyebrow: "آشپزخانه",
    tasteTitle: "غذاهایی که با دقت ساخته می‌شوند",
    tasteText:
      "مواد اولیهٔ تازه، طعم‌های متعادل و منویی که با فصل تغییر می‌کند. هر بشقاب برای تقسیم شدن و به یاد ماندن ساخته شده است.",
    designEyebrow: "فضا",
    designTitle: "جایی که طراحی، آسایش و شخصیت کنار هم می‌آیند",
    designText:
      "نور گرم، متریال طبیعی و گوشه‌های آرام. فضایی برای شام‌های طولانی و گفت‌وگوهای بی‌عجله.",
  },
};

// Text panel (same on every screen size)
const PANEL = "flex flex-col justify-center px-6 py-16";

// Order: text, photo, text, photo, text, photo, text.
// Mobile layout on every screen size.
export function Flow({ t, lang, images }: Props) {
  const c = copy[lang];

  return (
    <div className="mx-auto my-1 flex w-full max-w-[560px] flex-col gap-1 bg-sand">
      {/* TEXT 1: statement */}
      <section className="bg-cream px-6 py-24 text-center text-espresso">
        <Reveal className="mx-auto">
          <Eyebrow className="text-moss">{c.welcome}</Eyebrow>
          <p className="mt-8 font-display text-[40px] font-light leading-[1.08] rtl:leading-[1.5]">
            {c.statement}
          </p>
          <span aria-hidden className="mx-auto mt-12 block h-px w-16 bg-copper" />
        </Reveal>
      </section>

      {/* PHOTO 1 + TEXT 2: kitchen */}
      <section data-anchor="menu" className="flex flex-col gap-1">
        <Photo
          src={images.salmon.src}
          alt={images.salmon.alt[lang]}
          sizes="(min-width: 560px) 560px, 100vw"
          className="aspect-square"
        />
        <div className={`${PANEL} bg-moss text-cream`}>
          <Reveal>
            <Eyebrow className="text-sand">{c.tasteEyebrow}</Eyebrow>
            <h3 className="mt-8 font-display !text-[34px] font-light leading-[1.1] rtl:leading-[1.5]">
              {c.tasteTitle}
            </h3>
            <span aria-hidden className="mt-10 block h-px w-16 bg-sand" />
            <p className="mt-8 max-w-[44ch] text-[15px] leading-[1.9] text-cream/80">
              {c.tasteText}
            </p>
            <div className="mt-10">
              <ButtonLink href="#menu" variant="light">
                {t.hero.viewMenu}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PHOTO 2 + TEXT 3: space */}
      <section data-anchor="atmosphere" className="flex flex-col gap-1">
        <Photo
          src="/images/green.jpg"
          alt={images.room3.alt[lang]}
          sizes="(min-width: 560px) 560px, 100vw"
          className="aspect-square"
        />
        <div className={`${PANEL} bg-espresso text-cream`}>
          <Reveal>
            <Eyebrow className="text-sand">{c.designEyebrow}</Eyebrow>
            <h3 className="mt-8 font-display !text-[34px] font-light leading-[1.1] rtl:leading-[1.5]">
              {c.designTitle}
            </h3>
            <span aria-hidden className="mt-10 block h-px w-16 bg-sand" />
            <p className="mt-8 max-w-[44ch] text-[15px] leading-[1.9] text-cream/80">
              {c.designText}
            </p>
          </Reveal>
        </div>
      </section>

      {/* PHOTO 3 + TEXT 4: about */}
      <section data-anchor="about" className="flex flex-col gap-1">
        <Photo
          src="/images/room-3.jpg"
          alt={images.room4.alt[lang]}
          sizes="(min-width: 560px) 560px, 100vw"
          className="aspect-[4/5]"
        />
        <div className="flex flex-col justify-center bg-cream px-6 py-24 text-espresso">
          <Reveal>
            <Eyebrow className="text-moss">{t.about.eyebrow}</Eyebrow>
            <h3 className="mt-8 font-display !text-[40px] font-light leading-[1.08] rtl:leading-[1.5]">
              {t.about.title}
            </h3>
            <span aria-hidden className="mt-12 block h-px w-16 bg-copper" />
          </Reveal>
        </div>
      </section>

      {/* Reserve */}
      <section data-anchor="reserve" className="bg-espresso px-6 py-20">
        <div className="mx-auto flex max-w-[560px] flex-col gap-4">
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