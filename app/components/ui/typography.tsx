import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-xs font-medium uppercase tracking-[0.24em] rtl:tracking-normal",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Heading({
  as: Tag = "h2",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "text-[44px] leading-[1.08] rtl:leading-[1.45] md:text-6xl desktop:text-7xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}