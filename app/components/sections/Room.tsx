import { Reveal } from "../ui/Reveal"; 
import { Photo } from "../ui/photo"
import { cn } from "@/lib/utils";

export function Room({ photos }: { photos: { src: string; alt: string }[] }) {
  return (
    <section className="bg-cream pb-24 pt-16 md:pb-40 md:pt-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-12 [&::-webkit-scrollbar]:hidden">
          {photos.map((p, i) => (
            <Reveal
              key={p.src}
              delay={i * 0.12}
              className={cn(
                "w-[78%] shrink-0 snap-center md:w-auto",
                i === 1 && "md:mt-24"
              )}
            >
              <Photo
                src={p.src}
                alt={p.alt}
                sizes="(min-width: 1200px) 360px, (min-width: 768px) 33vw, 78vw"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}