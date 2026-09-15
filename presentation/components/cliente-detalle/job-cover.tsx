import { Music } from "lucide-react";
import type { JobCoverProps } from "@/types/job.types";

/**
 * Portada del trabajo. Con imagen subida la muestra; sin ella cae a un bloque
 * neutro con la nota musical, para no meter color en un sistema monocromo.
 */
export function JobCover({ imageUrl, title }: JobCoverProps) {
  if (imageUrl) {
    return (
      // Imagen servida desde Storage con URL pública; `next/image` no aporta aquí.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={title ? `Portada de ${title}` : ""}
        className="size-9 shrink-0 rounded-md object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-md bg-g-400"
    >
      <Music size={15} strokeWidth={1.5} className="text-g-50" />
    </span>
  );
}
