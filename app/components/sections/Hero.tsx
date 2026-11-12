import { getImageProps } from "next/image";
import { Logo } from "../logo";

type Props = {
  title: string;
  subtitle: string;
  viewMenu: string;
  reserve: string;
  menuHref?: string;
  reserveHref?: string;
  photo?: string; // mobile (portrait)
  photoDesktop?: string; // tablet and desktop (16:9)
};

export function Hero({
  title,
  viewMenu,
  reserve,
  menuHref = "#menu",
  reserveHref = "#reserve",
  photo = "/images/hero.jpg",
  photoDesktop = "/images/hero-desktop.jpg",
}: Props) {
  const common = { alt: "", fill: true, sizes: "100vw", priority: true };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: photoDesktop, quality: 85 });

  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: photo, quality: 85 });

  return (
    <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-espresso px-6 text-center text-cream [text-shadow:0_1px_16px_rgb(65_33_24/0.5)]">
      {/* Mobile: portrait photo. Tablet and desktop (768+): wide photo. */}
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
        <img
          {...imgProps}
          alt=""
          className="-z-10 object-cover object-[50%_40%]"
        />
      </picture>

      <Logo className="w-[240px] md:w-[280px] desktop:w-[320px]" />

      <h1 className="mt-8 max-w-[560px] !text-[22px] font-light leading-[1.4] tracking-[0.02em] md:!text-[26px]">
        {title}
      </h1>

      {/* Buttons: stacked on mobile, side by side from tablet up */}
      <div className="absolute inset-x-6 bottom-12 mx-auto flex max-w-[560px] flex-col gap-3 [text-shadow:none] md:bottom-16 md:max-w-[520px] md:flex-row desktop:bottom-20">
        <a
          href={menuHref}
          className="label inline-flex min-h-14 flex-1 items-center justify-center rounded-button bg-cream px-10 text-center uppercase tracking-[0.2em] !text-espresso transition-colors duration-300 hover:bg-sand rtl:tracking-normal"
        >
          {viewMenu}
        </a>
        <a
          href={reserveHref}
          className="label inline-flex min-h-14 flex-1 items-center justify-center rounded-button border border-cream/70 bg-cream/10 px-10 text-center uppercase tracking-[0.2em] !text-cream backdrop-blur-md transition-colors duration-300 hover:border-cream hover:bg-cream hover:!text-espresso rtl:tracking-normal"
        >
          {reserve}
        </a>
      </div>
    </section>
  );
}