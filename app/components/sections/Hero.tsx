import Image from "next/image";
import { Logo } from "../logo";

type Props = {
  title: string;
  subtitle: string;
  viewMenu: string;
  reserve: string;
  menuHref?: string;
  reserveHref?: string;
  photo?: string;
};

export function Hero({
  title,
  viewMenu,
  reserve,
  menuHref = "#menu",
  reserveHref = "#reserve",
  photo = "/images/hero.jpg",
}: Props) {
  return (
    <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-espresso px-6 text-center text-cream [text-shadow:0_1px_16px_rgb(65_33_24/0.5)]">
      {/* One clear photo on every screen size, no overlay */}
      <Image
        src={photo}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <Logo className="w-[240px]" />

      <h1 className="mt-8 max-w-[560px] !text-[22px] font-light leading-[1.4] tracking-[0.02em]">
        {title}
      </h1>

      {/* Buttons sit on the photo, stacked, 56 high, 12 radius */}
      <div className="absolute inset-x-6 bottom-12 mx-auto flex max-w-[560px] flex-col gap-3 [text-shadow:none]">
        <a
          href={menuHref}
          className="label inline-flex min-h-14 items-center justify-center rounded-button bg-cream px-10 text-center uppercase tracking-[0.2em] !text-espresso transition-colors duration-300 hover:bg-sand rtl:tracking-normal"
        >
          {viewMenu}
        </a>
        <a
          href={reserveHref}
          className="label inline-flex min-h-14 items-center justify-center rounded-button border border-cream/70 bg-cream/10 px-10 text-center uppercase tracking-[0.2em] !text-cream backdrop-blur-md transition-colors duration-300 hover:border-cream hover:bg-cream hover:!text-espresso rtl:tracking-normal"
        >
          {reserve}
        </a>
      </div>
    </section>
  );
}