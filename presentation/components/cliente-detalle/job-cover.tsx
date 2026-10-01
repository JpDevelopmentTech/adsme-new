import { Music } from "lucide-react";
import type { JobCoverProps } from "@/types/job.types";

/** Lado por defecto de la portada, en px. */
const DEFAULT_COVER_SIZE = 36;

/**
 * Portada del trabajo. Con imagen subida la muestra; sin ella cae a un bloque
 * de vidrio con la nota musical. El radio crece con el tamaño, como en el diseño.
 */
export function JobCover({ imageUrl, title, size = DEFAULT_COVER_SIZE }: JobCoverProps) {
  const style = { width: size, height: size, borderRadius: Math.round(size * 0.23) };

  if (imageUrl) {
    return (
      // Imagen servida desde Storage con URL pública; `next/image` no aporta aquí.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={title ? `Portada de ${title}` : ""}
        className="shrink-0 object-cover"
        style={style}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center border border-border bg-surface"
      style={style}
    >
      <Music size={Math.round(size * 0.4)} strokeWidth={1.5} className="text-text-muted" />
    </span>
  );
}
