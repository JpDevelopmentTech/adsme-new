import type { AmbientGlowProps } from "@/types/ui.types";

/**
 * Luz ambiental: la imagen del sujeto de la pantalla —la foto del artista o la
 * portada del lanzamiento— muy desenfocada detrás del contenido, para que cada
 * ficha quede teñida por su propio color. Sin imagen no pinta nada. Se oscurece
 * y satura porque una portada clara, desenfocada, lavaba el violeta del fondo
 * hasta dejarlo gris blanquecino.
 */
export function AmbientGlow({ imageUrl }: AmbientGlowProps) {
  if (!imageUrl) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-56 left-1/2 -z-10 size-[1000px] -translate-x-1/2 bg-cover bg-center opacity-40 blur-[160px] brightness-[.55] saturate-[1.4]"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    />
  );
}
