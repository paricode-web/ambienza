"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps a group of sections. The background starts espresso and eases to moss
 * once the element marked data-tint-trigger has scrolled up into the viewport.
 * It eases back to espresso when you scroll up again.
 */
export function ScrollTint({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tinted, setTinted] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const trigger = root.querySelector<HTMLElement>("[data-tint-trigger]");
    if (!trigger) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = trigger.getBoundingClientRect().top;
      setTinted(top < window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        tinted ? "bg-moss" : "bg-espresso"
      } transition-colors duration-[1400ms] ease-in-out motion-reduce:transition-none`}
    >
      {children}
    </div>
  );
}
