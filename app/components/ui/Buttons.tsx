import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "light" | "outline-light";

const base =
  "inline-flex h-14 items-center justify-center rounded-button px-8 font-sans text-base transition-colors duration-200";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-espresso text-cream hover:bg-moss",
  secondary:
    "border-[1.5px] border-espresso text-espresso hover:bg-espresso hover:text-cream",
  light: "bg-cream text-espresso hover:bg-sand",
  "outline-light":
    "border-[1.5px] border-cream text-cream hover:bg-cream hover:text-espresso",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}