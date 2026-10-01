import { PLATFORM_META } from "@/constants/platforms.constants";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { Avatar } from "@/presentation/components/ui/avatar";
import type { SearchItemThumbProps } from "@/types/global-search.types";

/** Lado de la miniatura de cada resultado, en px. */
const THUMB_SIZE = 32;

/**
 * Miniatura de un resultado: la foto o las iniciales del cliente, la portada del
 * trabajo, o el monograma de la plataforma de la campaña.
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

  const { mono, chartColor } = PLATFORM_META[visual.platform];

  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-[10px] text-[10px] font-medium"
      style={{
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        color: chartColor,
        backgroundColor: `${chartColor}29`,
      }}
    >
      {mono}
    </span>
  );
}
