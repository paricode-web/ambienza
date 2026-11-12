"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  current,
  label,
  className,
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const target: Locale = current === "en" ? "fa" : "en";
  const href = pathname.replace(`/${current}`, `/${target}`) || `/${target}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      className={cn("label transition-colors hover:text-copper", className)}
    >
      {label}
    </Link>
  );
}