import { Music } from "lucide-react";
import type { JobCoverProps } from "@/types/job.types";

/**
 * Portada del trabajo. Con imagen subida la muestra; sin ella cae al gradiente
 * derivado del identificador con la nota musical del diseño.
 */
export function JobCover({ cover, imageUrl, title }: JobCoverProps) {
  if (imageUrl) {
    return (
      // Imagen servida desde Storage con URL pública; `next/image` no aporta aquí.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={title ? `Portada de ${title}` : ""}
        className="size-11 shrink-0 rounded-sm object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="grid size-11 shrink-0 place-items-center rounded-sm"
      style={{
        backgroundImage: `linear-gradient(135deg, ${cover.from} 0%, ${cover.to} 100%)`,
      }}
    >
      <Music size={18} className="text-white/80" />
    </span>
  );
}
