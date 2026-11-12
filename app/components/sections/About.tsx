import { Reveal } from "../ui/Reveal"; 
import { Eyebrow, Heading } from "@/app/components/ui/typography";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section
      id="about"
      className="bg-cream px-6 pt-24 text-center text-espresso md:px-12 md:pt-40"
    >
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center">
        <Eyebrow className="text-moss">{t.eyebrow}</Eyebrow>
        <Heading className="mt-8 md:text-7xl desktop:text-8xl">{t.title}</Heading>
        <div className="my-10 h-px w-16 bg-sand" />
        <p className="max-w-lg text-base leading-[1.9] text-espresso/75 md:text-lg">
          {t.text}
        </p>
      </Reveal>
    </section>
  );
}