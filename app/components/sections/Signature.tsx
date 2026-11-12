import { Reveal } from "../ui/Reveal"; 
import { Photo } from "../ui/photo"
import { ButtonLink } from "../ui/Buttons";
import { Eyebrow, Heading } from "@/app/components/ui/typography";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

export function Signature({
  t,
  lang,
  photo,
}: {
  t: Dictionary["signature"];
  lang: Locale;
  photo: string;
}) {
  const price = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-US").format(
    t.price
  );

  return (
    <section
      id="signature"
      className="flex flex-col bg-espresso text-cream desktop:h-svh desktop:flex-row"
    >
      <Photo
        src={photo}
        alt={t.name}
        sizes="(min-width: 1200px) 720px, 100vw"
        className="aspect-[4/5] desktop:aspect-[2/3] desktop:h-svh desktop:shrink-0"
      />

      <div className="flex flex-1 items-center justify-center px-6 py-20 desktop:px-16 desktop:py-0">
        <Reveal className="w-full max-w-[520px]">
          <Eyebrow className="text-sand">{t.eyebrow}</Eyebrow>
          <Heading className="mt-6 md:text-6xl desktop:text-6xl">{t.title}</Heading>

          <article className="mt-10 border border-sand bg-cream p-card text-espresso">
            <div className="border border-dashed border-copper p-6 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <h3 className="font-display text-[32px] font-bold leading-tight">
                  {t.name}
                </h3>
                <span className="price text-4xl">{price}</span>
              </div>
              <p className="mt-4 leading-[1.8]">{t.description}</p>
              <p className="label mt-4">{t.tag}</p>
              <ButtonLink href="#reserve" className="mt-8 w-full sm:w-auto">
                {t.cta}
              </ButtonLink>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}