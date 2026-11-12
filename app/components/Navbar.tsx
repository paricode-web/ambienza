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
  /** Optional reservation button. It only shows when a label is given. */
  reserveLabel?: string;
  reserveHref?: string;
};

// Finds the visible version of a section (mobile and desktop have
// different sections with the same anchor name)
function findVisible(key: string) {
  return Array.from(
    document.querySelectorAll<HTMLElement>(`#${key}, [data-anchor="${key}"]`)
  ).find((n) => n.offsetParent !== null);
}

export function Navbar({
  lang,
  links,
  switchLabel,
  openLabel,
  closeLabel,
  reserveLabel,
  reserveHref = "#reserve",
}: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // Glass → cream glass after a little scrolling
      setScrolled(y > 40);

      // Thin reading-progress line along the bottom edge of the bar
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);

      // Which section is crossing the middle of the screen
      let current: string | null = null;
      for (const l of links) {
        const el = findVisible(l.href.slice(1));
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5) {
          current = l.href;
          break;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [links]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Scrolls to the visible version of a section
  const goTo = (href: string) => (e: React.MouseEvent) => {
    const el = findVisible(href.slice(1));
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

      {/* Reading progress: one copper hairline on the bottom edge */}
      <span
        aria-hidden
        className={cn(
          "absolute bottom-0 start-0 h-px bg-copper transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
        style={{ width: `${progress * 100}%` }}
      />

      <div
        className={cn(
          "mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-[height] duration-300 desktop:max-w-none desktop:px-12",
          scrolled ? "h-20" : "h-24"
        )}
      >
        {/* Logo: cream on glass, espresso on cream glass (cross-fade).
            Always visible, on mobile and on desktop. */}
        <Link
          href={`/${lang}`}
          onClick={() => setOpen(false)}
          aria-label="Ambienza"
          className="relative block w-36 desktop:w-40"
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
        <nav className="hidden items-center gap-12 desktop:flex">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={`/${lang}${l.href}`}
                onClick={goTo(l.href)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "label relative pb-1.5 text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 rtl:tracking-normal",
                  "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 rtl:after:origin-right",
                  isActive
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100",
                  scrolled ? "hover:text-copper" : "hover:text-sand"
                )}
              >
                {l.label}
              </a>
            );
          })}

          {reserveLabel && (
            <a
              href={`/${lang}${reserveHref}`}
              onClick={goTo(reserveHref)}
              className={cn(
                "label inline-flex min-h-12 items-center justify-center rounded-button border px-8 text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 rtl:tracking-normal",
                scrolled
                  ? "border-espresso text-espresso hover:bg-espresso hover:text-cream"
                  : "border-cream/70 text-cream hover:bg-cream hover:text-espresso"
              )}
            >
              {reserveLabel}
            </a>
          )}

          {/* Thin divider before the language switch */}
          <span
            aria-hidden
            className={cn(
              "h-5 w-px transition-colors duration-500",
              scrolled ? "bg-espresso/25" : "bg-cream/30"
            )}
          />
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
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-espresso px-6 text-cream desktop:hidden"
        >
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

          <nav className="mt-16 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={`/${lang}${l.href}`}
                onClick={goTo(l.href)}
                className="border-b border-sand/20 py-6 font-display text-4xl font-light first:border-t"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-8 pb-10">
            {reserveLabel && (
              <a
                href={`/${lang}${reserveHref}`}
                onClick={goTo(reserveHref)}
                className="label inline-flex min-h-14 items-center justify-center rounded-button bg-cream px-10 text-center uppercase tracking-[0.2em] !text-espresso rtl:tracking-normal"
              >
                {reserveLabel}
              </a>
            )}
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
