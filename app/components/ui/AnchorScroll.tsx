"use client";

import { useEffect } from "react";

// The page has a mobile flow and a desktop flow. Each section carries
// data-anchor="menu" (and so on), and only one of the two is visible.
// This scrolls to the visible one when a link like #menu is clicked.
function findTarget(key: string) {
  const nodes = document.querySelectorAll<HTMLElement>(
    `[data-anchor="${CSS.escape(key)}"]`
  );
  return Array.from(nodes).find((n) => n.getClientRects().length > 0) ?? null;
}

export function AnchorScroll() {
  useEffect(() => {
    const scrollTo = (el: HTMLElement) => {
      // Small delay so the mobile menu can unlock page scrolling first
      window.setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        60
      );
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;

      const url = new URL(a.href, window.location.href);
      if (!url.hash || url.pathname !== window.location.pathname) return;

      const el = findTarget(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      e.preventDefault();
      window.history.replaceState(null, "", url.hash);
      scrollTo(el);
    };

    document.addEventListener("click", onClick);

    if (window.location.hash) {
      const el = findTarget(decodeURIComponent(window.location.hash.slice(1)));
      if (el) scrollTo(el);
    }

    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
