import { Logo } from "../logo";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { Eyebrow } from "@/app/components/ui/typography";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer({
  t,
  lang,
  switchLabel,
}: {
  t: Dictionary["footer"];
  lang: Locale;
  switchLabel: string;
}) {
  return (
    <footer className="bg-espresso px-6 pb-10 pt-20 text-cream md:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <Logo className="w-[180px]" />

          <div>
            <Eyebrow className="text-sand">{t.visit}</Eyebrow>
            <p className="mt-4 text-cream/85">{t.address}</p>
          </div>

          <div>
            <Eyebrow className="text-sand">{t.hoursTitle}</Eyebrow>
            <div className="mt-4 space-y-1 text-cream/85">
              {t.hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow className="text-sand">{t.followTitle}</Eyebrow>
            <div className="mt-4 flex flex-col gap-1 text-cream/85">
              <a href={site.instagram} className="hover:text-sand">
                Instagram
              </a>
              <a href={`mailto:${site.email}`} className="hover:text-sand">
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-sand/30 pt-8 text-sm text-cream/70 md:flex-row md:items-center md:justify-between">
          <p>© Ambienza. {t.rights}</p>
          <LanguageSwitcher current={lang} label={switchLabel} className="text-sand" />
        </div>
      </div>
    </footer>
  );
}