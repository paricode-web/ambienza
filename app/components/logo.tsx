import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "cream" | "espresso";
  className?: string;
};

export function Logo({ variant = "cream", className }: Props) {
  return (
    <Image
      src={`/logo/ambienza-logo-${variant}.svg`}
      alt="Ambienza"
      width={500}
      height={200}
      priority
      className={cn("h-auto w-36", className)}
    />
  );
}