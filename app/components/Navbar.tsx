"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  lang: Locale;
  links: { label: string; href: string }[];
  switchLabel: string;
  openLabel: string;
  closeLabel: string;
};

export function Navbar({ lang, links, switchLabel, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Glass → cream glass after a little scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scrolls to the visible version of a section (mobile and desktop
  // have different sections with the same anchor name)
  const goTo = (href: string) => (e: React.MouseEvent) => {
    const key = href.slice(1);
    const el = Array.from(
      document.querySelectorAll<HTMLElement>(`#${key}, [data-anchor="${key}"]`)
    ).find((n) => n.offsetParent !== null);
    setOpen(false);
    if (!el) return;
    e.preventDefault();
    setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
  };

  const line = scrolled ? "bg-espresso" : "bg-cream";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled ? "text-espresso" : "text-cream"
      )}
    >
      {/* Glass layer. It is a separate element, because backdrop-filter on the
          header itself would trap the fixed mobile menu inside the header. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 border-b backdrop-blur-md transition-colors duration-500",
          scrolled
            ? "border-sand/60 bg-cream/80 backdrop-blur-xl"
            : "border-cream/10 bg-espresso/25"
        )}
      />

      <div
        className={cn(
          "mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-[height] duration-300 desktop:max-w-none desktop:px-12",
          scrolled ? "h-20" : "h-24"
        )}
      >
        {/* Logo: cream on glass, espresso on cream glass (cross-fade).
            On desktop it only appears after scrolling, because the hero already shows it. */}
        <Link
          href={`/${lang}`}
          onClick={() => setOpen(false)}
          className={cn(
            "relative block w-36 transition-opacity duration-300",
            !scrolled && "desktop:pointer-events-none desktop:opacity-0"
          )}
        >
          <Logo
            variant="cream"
            className={cn("transition-opacity duration-500", scrolled && "opacity-0")}
          />
          <Logo
            variant="espresso"
            className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-500",
              scrolled && "opacity-100"
            )}
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-10 desktop:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={`/${lang}${l.href}`}
              onClick={goTo(l.href)}
              className={cn(
                "transition-colors",
                scrolled ? "hover:text-copper" : "hover:text-sand"
              )}
            >
              {l.label}
            </a>
          ))}
          <LanguageSwitcher
            current={lang}
            label={switchLabel}
            className={cn("text-sm", scrolled ? "text-espresso" : "text-cream")}
          />
        </nav>

        {/* Mobile and tablet button */}
        <button
          type="button"
          aria-label={openLabel}
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-12 w-12 flex-col items-center justify-center gap-[7px] desktop:hidden"
        >
          <span className={cn("h-px w-7 transition-colors", line)} />
          <span className={cn("h-px w-7 transition-colors", line)} />
          <span className={cn("h-px w-7 transition-colors", line)} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-espresso px-6 text-cream desktop:hidden">
          <div className="flex h-24 items-center justify-between">
            <Logo className="w-36" />
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
              className="relative h-12 w-12"
            >
              <span className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 rotate-45 bg-cream" />
              <span className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -rotate-45 bg-cream" />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={`/${lang}${l.href}`}
                onClick={goTo(l.href)}
                className="font-display text-4xl"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pb-10">
            <LanguageSwitcher
              current={lang}
              label={switchLabel}
              className="text-base text-sand"
            />
          </div>
        </div>
      )}
    </header>
  );
}