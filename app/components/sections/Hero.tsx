import Image from "next/image";
import { Logo } from "../logo";

type Props = {
  title: string;
  subtitle: string;
  viewMenu: string;
  reserve: string;
  menuHref?: string;
  reserveHref?: string;
  /** Photo for mobile and tablet */
  photo?: string;
  /** Desktop: portrait photos (624x938 ratio) for the three columns. 9 looks best. */
  gallery?: string[];
};

const TILE = "relative mb-4 aspect-[624/938] w-full shrink-0";

function Column({
  images,
  reverse,
}: {
  images: string[];
  reverse?: boolean;
}) {
  // The list is rendered twice so the loop is seamless (translateY -50%).
  const loop = [...images, ...images];
  return (
    <div
      className={`flex flex-col will-change-transform ${
        reverse
          ? "motion-safe:[animation:drift-down_70s_linear_infinite]"
          : "motion-safe:[animation:drift-up_70s_linear_infinite]"
      }`}
    >
      {loop.map((src, i) => (
        <div key={`${src}-${i}`} className={TILE} aria-hidden={i >= images.length}>
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1200px) 18vw, 0px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export function Hero({
  title,
  subtitle,
  viewMenu,
  reserve,
  menuHref = "#menu",
  reserveHref = "#reserve",
  photo = "/images/hero.jpg",
  gallery = [],
}: Props) {
  const cols: string[][] = [[], [], []];
  gallery.forEach((src, i) => cols[i % 3].push(src));

  return (
    <section className="relative flex min-h-svh flex-col bg-espresso text-cream desktop:grid desktop:h-svh desktop:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
      {/* The drift animation lives here so no extra CSS file is needed */}
      <style>{`
        @keyframes drift-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes drift-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
      `}</style>

      {/* Mobile / tablet: full-screen photo, no overlay */}
      <div className="absolute inset-0 desktop:hidden">
        <Image
          src={photo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Content: centered logo + tagline on the photo (mobile), left panel (desktop) */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center [text-shadow:0_1px_14px_rgb(65_33_24/0.55)] desktop:items-start desktop:px-12 desktop:text-start desktop:[text-shadow:none]">
        {/* Mobile only: big centered logo (desktop has it in the Navbar) */}
        <Logo className="w-[240px] desktop:hidden" />

        <h1 className="mt-6 max-w-[640px] text-[26px] font-light leading-[1.3] text-cream desktop:mt-0 desktop:!text-[64px] desktop:leading-[1.08]">
          {title}
        </h1>

        {/* Subtitle shows on desktop only */}
        <p className="mt-8 hidden max-w-[460px] text-lg leading-relaxed text-sand desktop:block">
          {subtitle}
        </p>

        {/* Buttons: pinned to the bottom of the photo on mobile */}
        <div className="absolute inset-x-6 bottom-12 flex flex-col gap-3 sm:flex-row sm:justify-center desktop:static desktop:mt-12 desktop:justify-start desktop:gap-5">
          <a
            href={menuHref}
            className="label inline-flex min-h-14 items-center justify-center rounded-button bg-cream px-10 text-center uppercase tracking-[0.2em] !text-espresso transition-colors duration-300 hover:bg-sand rtl:tracking-normal"
          >
            {viewMenu}
          </a>
          <a
            href={reserveHref}
            className="label inline-flex min-h-14 items-center justify-center rounded-button border border-cream/70 bg-cream/10 px-10 text-center uppercase tracking-[0.2em] !text-cream backdrop-blur-md transition-colors duration-300 hover:border-cream hover:bg-cream hover:!text-espresso desktop:border-cream/60 desktop:bg-transparent desktop:backdrop-blur-none rtl:tracking-normal"
          >
            {reserve}
          </a>
        </div>
      </div>

      {/* Desktop: three drifting columns of portrait photos, square corners, no overlay */}
      <div
        aria-hidden
        className="relative hidden min-h-0 grid-cols-3 gap-4 overflow-hidden pe-12 desktop:grid"
      >
        <Column images={cols[0]} />
        <Column images={cols[1]} reverse />
        <Column images={cols[2]} />
      </div>
    </section>
  );
}
