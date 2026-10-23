import { SEMAPHORE_DOT_CLASSES, SEMAPHORE_LABELS } from "@/constants/nomina-semaphore.constants";
import type { ArtistAvatarProps } from "@/types/nomina-shell.types";
import { getInitials } from "@/utils/get-initials";
import { cn } from "@/utils/cn";

/** Foto circular del artista con el punto del semáforo del mes en la esquina. */
export function ArtistAvatar({ name, photoUrl, size, semaphore }: ArtistAvatarProps) {
  const dot = Math.round(size * 0.32);

  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      {photoUrl ? (
        // Foto del cliente en Storage (URL remota), igual que el `Avatar` de Clientes: `next/image` no aporta aquí.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt="" width={size} height={size} className="size-full rounded-pill object-cover" />
      ) : (
        <span className="grid size-full place-items-center rounded-pill bg-surface text-[11px] text-text-secondary">
          {getInitials(name, "")}
        </span>
      )}
      {semaphore ? (
        <span
          role="img"
          aria-label={SEMAPHORE_LABELS[semaphore]}
          className={cn("absolute right-0 bottom-0 rounded-pill border-2 border-[#140b28]", SEMAPHORE_DOT_CLASSES[semaphore])}
          style={{ width: dot, height: dot }}
        />
      ) : null}
    </span>
  );
}
