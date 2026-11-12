import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  ratio?: "portrait" | "free";
  overlay?: boolean | string; // true = 50% espresso
  zoom?: boolean; // slow zoom when a parent has "group" and is hovered
  className?: string;
  imageClassName?: string; // e.g. "object-top" to keep the top of the photo visible
};

export function Photo({
  src,
  alt = "",
  sizes,
  priority,
  ratio = "portrait",
  overlay,
  zoom,
  className,
  imageClassName,
}: Props) {
  const overlayClass = typeof overlay === "string" ? overlay : "bg-espresso/50";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-espresso",
        ratio === "portrait" && "aspect-[2/3]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover",
          imageClassName,
          zoom &&
            "transition-transform duration-700 ease-out group-hover:scale-105"
        )}
      />
      {overlay && (
        <div className={cn("absolute inset-0", overlayClass)} aria-hidden />
      )}
    </div>
  );
}