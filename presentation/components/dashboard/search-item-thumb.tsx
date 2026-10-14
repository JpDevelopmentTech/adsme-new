import { PlatformLogo } from "@/presentation/components/brand/platform-logo";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { Avatar } from "@/presentation/components/ui/avatar";
import type { SearchItemThumbProps } from "@/types/global-search.types";

/** Lado de la miniatura de cada resultado, en px. */
const THUMB_SIZE = 32;

/**
 * Miniatura de un resultado: la foto o las iniciales del cliente, la portada del
 * trabajo, o el logo de la plataforma de la campaña.
 */
export function SearchItemThumb({ visual }: SearchItemThumbProps) {
  if (visual.type === "client") {
    return (
      <Avatar
        initials={visual.initials}
        gradient={visual.gradient}
        imageUrl={visual.avatarUrl ?? undefined}
        size={THUMB_SIZE}
        fontSize={11}
      />
    );
  }

  if (visual.type === "job") {
    return <JobCover imageUrl={visual.coverUrl} size={THUMB_SIZE} />;
  }

  return <PlatformLogo platform={visual.platform} size={THUMB_SIZE} />;
}
